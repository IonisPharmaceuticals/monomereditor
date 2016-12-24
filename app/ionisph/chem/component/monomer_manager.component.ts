/**
 * Created by jmilton on 6/1/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import { Inject } from '@angular/core';
import {OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild} from '@angular/core';
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Headers, Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {IMonomer} from "../imonomer";
import {MonomerManagerListener} from '../lib/monomer_manager_listener';
import {StructureClashListener} from '../lib/structure_clash_listener';
import {MonomerLoader} from '../services/monomerloader';
import {Hit} from "../lib/hit";
import {MolecularViewer} from "../molecular_viewer";
import {ActionObserver} from "../../../ui/action_observer"
import {MonomerSaver} from "../services/monomer_saver";
import {IAttachment} from "../iattachment";
import {URLs} from "../services/urls";


@Component({
    selector: 'monomer-manager',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
    template: `
           
    <div>
    {{ msg }}

                        <modal #modal>
                            <modal-header [show-close]="true">
                                <h4 class="modal-title"></h4>
                            </modal-header>
                            <modal-body>
                                {{msg}}
                            </modal-body>
                        </modal>
</div>


    `,
    providers: [ MonomerDB, MonomerLoader, MonomerSaver]
})
export class MonomerManager implements ActionObserver {

    selectedMonomer : IonisMonomer;
    listeners : Array<MonomerManagerListener> = new Array<MonomerManagerListener> ();
    structure_clash_listeners: Array<StructureClashListener> = new Array<StructureClashListener> ();
    substructure_set:Hit[];
    structure_viewer:MolecularViewer;
    @ViewChild('modal')
    modal:ModalComponent;
    msg = "";
     http:Http 

    constructor( private monomer_db : MonomerDB, private monomer_loader: MonomerLoader, private save_mon : MonomerSaver, @Inject (Http) http:Http ){
        this.http = http;
    }

    getViewerSmiles () : string {
        return this.structure_viewer.getSmiles();
    }
    getMolfileForCurrentStructure () : string {
        return this.structure_viewer.getMolfileForCurrentStructure();
    }

    public setSelectedMonomer ( mon : IonisMonomer ) : void {
        this.selectedMonomer = mon;
        this.notifyListeners ();
    }
    public addListener ( _listener   : MonomerManagerListener ) : void {
        this.listeners.push ( _listener );
    }
    public setMonomer_db ( monomer_db: MonomerDB ) : void {
        this.monomer_db = monomer_db;
    }
    public saveCurrentStructure () : void {

        this.msg = "Saving...";
        this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
        this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
        


        this.save_mon.updateMonomer(this.selectedMonomer, this);
    }
    public check_topology_uniqueness () : void {

        this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
        this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(this.selectedMonomer.monomer);
        this.http.post(URLs.generate_fingerprint, body, {headers:headers})
        // .do(data => console.log('All: ' + JSON.stringify(data)))
        .subscribe(response => this.response ( response,  body  ));



        // this.save_mon.updateMonomer(this.selectedMonomer, this);
    }
 public check_morgan_topology_uniqueness () : void {

        this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
        this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(this.selectedMonomer.monomer);
        this.http.post(URLs.generate_morgan_fingerprint, body, {headers:headers})
        .subscribe(response => this.morgan_response ( response,  body  ));
    }



    public check_canonical_smiles_uniqueness () : void {

        this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
        this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(this.selectedMonomer.monomer);
        this.http.post(URLs.generate_canonical_smiles, body, {headers:headers})
        // .do(data => console.log('All: ' + JSON.stringify(data)))
        .subscribe(response => this.search_with_smiles ( response  ));
    }








    unique_check_response ( response ) : void {
        let msg = response['_body'];
        var hits:Hit[] = JSON.parse( msg );
        // this is just an array of json objects 



        this.structure_clash_listeners.forEach ((l) => {
            l.structures_found( hits );
        });

    }

    addStructureClashListener (scl:StructureClashListener) : void {
        this.structure_clash_listeners.push ( scl );
    }

    search_with_smiles ( res ) : void {
        let msg = res['_body'];
        var msgv = JSON.parse( msg );
        // alert ( msgv['msg'] );
        if ( 'canonical_smiles' in msgv ){
            //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                let fpo = {};
                fpo['canonical_smiles']=msgv['canonical_smiles'];
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                this.http.post(URLs.search_by_canonical_smiles, fpo, {headers:headers})
                .subscribe(response => this.unique_check_response( response  ));

        }
        else{
            this.msg = 'Failed to run uniqueness algorithm';
        }
        
    }


    morgan_response ( res, _t ){
            let msg = res['_body'];
            var msgv = JSON.parse( msg );
            // alert ( msgv['msg'] );
            if ( 'fp' in msgv ){
                //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                    let fpo = {};
                    fpo['morgan_fingerprint']=msgv['fp'];
                    var headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    this.http.post(URLs.search_by_morgan_fingerprint, fpo, {headers:headers})
                    .subscribe(response => this.unique_check_response( response  ));

            }
            else{
                this.msg = 'Failed to run uniqueness algorithm';
            }
        }


    response ( res, _t ){
        let msg = res['_body'];
        var msgv = JSON.parse( msg );
        // alert ( msgv['msg'] );
        if ( 'fp' in msgv ){
            //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                let fpo = {};
                fpo['fingerprint']=msgv['fp'];
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                this.http.post(URLs.search_by_fingerprint, fpo, {headers:headers})
                .subscribe(response => this.unique_check_response( response  ));

        }
        else{
            this.msg = 'Failed to run uniqueness algorithm';
        }
    }




    public saveLegacyStructure () : void {
        this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
        this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
        this.save_mon.save_legacy_monomer(this.selectedMonomer, this)
    }



    public reload ( monomer: IonisMonomer ) : void {
        this.monomer_loader.getMonomer(monomer.monomerid).subscribe(nmon => this.selectedMonomer);
    }

    setStructureViewer ( ketc:MolecularViewer): void{
        this.structure_viewer = ketc;
    }

    notifyListeners () : void {
        this.listeners.forEach ((l) => {
            l.updateSelectedStructure( this.selectedMonomer, this.msg );
            l.updateSelectedSubstructureList(this.substructure_set )
        });
    }


    createNewMonomer(): IonisMonomer {
        var m:IonisMonomer = new IonisMonomer();
        m.endcapID = '';
        m.het_id = '';
        m.ispublic = false;
        m.sugarId = '';
        m.monomer = this.getDefaultMonomer();
        return m;
    }

    getDefaultMonomer():IMonomer {
        var nm:IMonomer = new IMonomer();
        //molfile: string;
        //id: number;
        //canSMILES: string;
        //naturalAnalog: string;
        //alternateId: string;
        //name: string;
        //monomerType: string;
        //polymerType: string;
        nm.name = '';
        nm.id = 0;
        nm.canSMILES = '';
        nm.molfile = '';
        nm.monomerType = '';
        nm.alternateId = '';
        nm.naturalAnalog = '';
        return nm;
    }

    getNextID():number {
        var mx:number = 0;
        console.log ( "loading...");
        for (var i in this.monomer_db) {
            // console.log ( ' i :' + this.monomer_db[i]);
            var currentid:number = this.monomer_db[i].monomerid;
            if (currentid > mx) {
                mx = currentid + 1;
            }
        }
        return mx;
    }

    action_successful (m:IonisMonomer, msg:string): void{

        this.msg = msg;
        this.setSelectedMonomer(m);

    }
    action_failed (m:IonisMonomer): void{
        this.setSelectedMonomer(m);

    }


}


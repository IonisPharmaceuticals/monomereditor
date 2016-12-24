import {Inject, OnInit, Input, Output, Component, ViewChild, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
import {SearchBox} from "../../../ui/search.component";
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {IonisMonomer} from '../ionismonomer';
import {MonomerList} from "../component/monomer_list.component";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerSaver} from "../services/monomer_saver";
import {MonomerDB} from "../lib/monomer_db";
import {Ketcher2Component} from "../component/ketcher.2.component";
import {MonomerManager} from "../component/monomer_manager.component";
import {MonomerEditor} from "../component/monomer_editor.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "./app_listener";
import {Hit} from "./hit";

@Component({
    selector: 'monomer-library',
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app/ionisph/chem/lib/search_monomer.2.html',
    providers: [MonomerLoader, ApplicationControls]
    , 
    inputs: ['enable_editing']
})
export class SearchMonomers2Component implements OnInit, AppListener {
    monomer_db:MonomerDB = new MonomerDB();
    currentMonomer:IonisMonomer;
    monomer_manager:MonomerManager;
    appman:ApplicationControls;
    mode:string = "library";
    enable_editing:boolean = true;

    constructor(private monomer_loader:MonomerLoader, private monomer_saver: MonomerSaver, private ref:ChangeDetectorRef, @Inject(Http) http:Http) {
        this.appman = new ApplicationControls();
        this.monomer_manager = new MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
        // var intervalId = setInterval(() => {
        //     if (this.monomer_db) {
        //         clearInterval(intervalId);
        //     }
        //     this.ref.markForCheck();
        // }, 1000);
        this.monomer_loader.getMonomers().subscribe(monomers => this.setMonomerDatabase(monomers));
    }

    ngOnInit():any {
        if (this.appman != undefined) {
            this.appman.addListener(this);
        }

    }


    setMonomerDatabase(mdb:IonisMonomer[]):void {
        if ( !this.monomer_db ){
            this.monomer_db = new MonomerDB ();
        }
        this.monomer_db.monomers = mdb;
        this.monomer_manager.setMonomer_db(this.monomer_db);

        for (let l of this.monomer_db.monomers){
            console.log ( ' l ' + l.monomerid);
        }

        this.ref.markForCheck ();
    }

    showSubstructureHits(event:Hit[]):void {
        this.monomer_manager.substructure_set = event;
        this.monomer_manager.notifyListeners();
    }

    public newMonomer():void {
        var new_ionis_monomer: IonisMonomer = this.monomer_manager.createNewMonomer();
        this.monomer_manager.setSelectedMonomer(new_ionis_monomer);
    }

    public refreshList () : void {
        this.monomer_loader.getMonomers().subscribe(monomers => this.setMonomerDatabase(monomers));
    }

}
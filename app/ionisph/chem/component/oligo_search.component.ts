/**
 * Created by jmilton on 8/30/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit, SimpleChange, Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerFilter} from "../pipes/monomer_filter";
import {IsPublicFilter} from "../pipes/ispublic";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {ISearchResults} from "../isearch_ results";
import {ApplicationControls} from "../lib/application_control_manager";
import {Hit} from "../lib/hit";
import {URLs} from "../services/urls";
import {OligoBuilder} from "./oligo_builder.component";
import {MyInhertLink} from "./util/href_catch";



@Component({
    selector: 'oligodb',
    styleUrls: ['app/ionisph/chem/component/component_styles/side_bar.css'],
    inputs: ['monomer_db', 'monomer_manager', 'monomer_type'],
    template: `

    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    Search Oligos
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('ion_number')" #input>Ion number</div>
                </li>
                <li>
                    <div class="btn btn-warning-outline btn-s" type="input" (click)="load('sequence_search')" #input>Sequence</div>
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('chemistry')" #input>Chemistry</div>
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('monomer')" #input>Monomer</div>
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('orders')" #input>Orders</div>
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('gene_symbol')" #input>Gene</div>
                </li>
                <li>
                    <div class="btn btn-secondary-outline btn-s" type="input" (click)="load('gene_locus')" #input>Genomic locus</div>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                    
                        <span [ngSwitch]="mode">
                            <span *ngSwitchCase="'ion_number'">        
                               <oligo-builder></oligo-builder>
                            </span>
                            <span *ngSwitchCase="'sequence_search'">
                            <!--Monomer library: -->
                            </span>
                            <span *ngSwitchCase="'monomer'">
                                <monomer-library-manager></monomer-library-manager>
                            </span>
                            <span *ngSwitchCase="'orders'">
                                <oligo-builder></oligo-builder>
                            </span>
                            <span *ngSwitchCase="'gene_symbol'">
                                <oligo-builder></oligo-builder>
                            </span>
                            <span *ngSwitchDefault>
                            </span>
                        </span>

                    
                    
                    
                    
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>

    `,
    providers: [MonomerDB, MonomerLoader, ApplicationControls],
})
export class OligoSearch implements OnInit, MonomerManagerListener {
    monomer_db:MonomerDB;
    monomer_manager:MonomerManager;
    hits:Hit[];
    mode:string;
    search_status:string = '';
    app_control:ApplicationControls;

    constructor(private monomer_loader:MonomerLoader, private ref:ChangeDetectorRef, private http:Http) {
    }

    load(mode:string) : void {
        this.mode = mode;
    }

    updateSelectedStructure(ionisMon:IonisMonomer, msg:string):void {

    }

    updateSelectedSubstructureList(substructureList:Hit[]):void {
        //this.monomers = this.listWithSubstructureFilter(substructureList);
        this.ref.markForCheck();
    }

    ngOnInit():any {
        if (this.monomer_db != null) {
            //this.monomers = this.list();
        }
        if (this.monomer_manager != undefined) {
            this.monomer_manager.addListener(this);
        }
    }

    validateCurrentStructure():void {
        var searchTerm = this.monomer_manager.getViewerSmiles();
        if (searchTerm && searchTerm.length > 1) {
            var encoded_smiles = encodeURIComponent(searchTerm);
            var uri:string = URLs.substructureurl + "smarts=" + encoded_smiles;
            //var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            //let options = new RequestOptions({headers: headers});
            this.search_status = "Searching..." + encoded_smiles;
            this.http.get(uri)
                .map((response:Response) => <ISearchResults> response.json())
                //.do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.handleError).subscribe(results => this.setResults(results));
        }
    }

    setResults(results:ISearchResults) {
        this.search_status = '';
        if (results) {
            this.hits = results.hits;
        }
        this.ref.detectChanges();
    }

    private  handleError(error:Response) {
        this.search_status = error.toString();
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    public loadstructure(input:Hit):void {
        this.monomer_loader.getMonomer(+input.monomer_id).subscribe(mon => this.monomer_manager.setSelectedMonomer(mon));
    }

    public  list():Array<IonisMonomer> {

        var ion:Array<IonisMonomer> = new Array<IonisMonomer>();
        var index = 0;

        var sub:Hit[] = this.monomer_manager.substructure_set;
        if (sub != undefined && sub.length > 0) {
            for (var propName in this.monomer_db) {
                var i:IonisMonomer = this.monomer_db[propName];
                for (var ss in sub) {

                    if (sub[ss].symbol == i.monomer.alternateId) {
                        ion.push(i);
                    }
                }
            }
        }
        return ion;

    }

    public  listWithSubstructureFilter(sub:Array<Hit>):Array<IonisMonomer> {
        var ion:Array<IonisMonomer> = new Array<IonisMonomer>();
        var index = 0;
        if (sub != undefined && sub.length > 0) {
            for (var propName in this.monomer_db) {
                var i:IonisMonomer = this.monomer_db[propName];
                for (var ss in sub) {
                    var h:Hit = sub[ss];
                    console.log(h.symbol);
                    if (sub[ss].symbol == i.monomer.alternateId) {
                        ion.push(i);
                    }
                }
            }
        }
        return ion;
    }


    public getids(m:IonisMonomer, type:string):Array<number> {
        var vals:Array<number> = new Array<number>();
        var idstr:string;
        if (type == 'Endcaps') {
            if (!m.endcapID) {
                return vals;
            }
            if (m.endcapID == '-') {
                return vals;
            }
            idstr = m.endcapID;
        } else if (type == 'Linkers') {
            if (!m.linkerId) {
                return vals;
            }
            if (m.linkerId == '-') {
                return vals;
            }
            idstr = m.linkerId;
        } else if (type == 'Bases') {
            if (!m.het_id) {
                return vals;
            }
            if (m.het_id == '-') {
                return vals;
            }
            idstr = m.het_id;
        } else if (type == 'Sugars') {
            if (!m.sugarId) {
                return vals;
            }
            if (m.sugarId == '-') {
                return vals;
            }
            idstr = m.sugarId;
        }
        var sp:string[] = idstr.split(',');
        for (var s in sp) {
            var i:number = Number.parseInt(s);
            vals.push(i);
        }
        return vals;
    }

}

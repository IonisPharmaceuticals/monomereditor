/**
 * Created by jmilton on 5/31/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {Inject, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from '../component/monomer_manager.component';
import {MonomerGroup} from "./monomer_group.component";
import {SubstructureGroup} from "./substructure_group.component";
import {LegacyMonomerGroup} from "./legacy_monomer_group.component";
import {OnInit} from "@angular/core";
import {UnitStringManager} from './unit_string_builder.component';
import {LegacySearchMonomers} from "./util/legacy_search_monomer.component";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Hit} from "../lib/hit";
import {NewMonomer} from "./newmonomer.component";
import {MonomerList} from "../component/monomer_list.component";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerSaver} from "../services/monomer_saver";
import {UnitDisplay} from "./unit_display.component";

@Component({
    selector: 'unit-builder',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    inputs: ['monomer_db', 'monomer_manager', 'app_control', 'selectedGroup'],
    // outputs: ['monomers'],
    template: `

            <div  class="table-responsive" style="padding: 15px;">
            <!--<div class="col-xs-12 col-sm-6 col-md-8">-->
            <tr>
            <!--<td>-->
                    <!--<select class="form-control" type="input" (change)="updatevalue(selectedvalue)" #selectedvalue>-->
                          <!--<option value="Any">All Monomers</option>-->
                          <!--<option value="Sugars" >Sugars</option>-->
                          <!--<option value="Bases">Bases</option>-->
                          <!--<option value="Linkers">Linkers</option>-->
                    <!--</select>-->
                    <!--<unit-textbox [substructureList]="substructureList" [monomer_db]="monomer_db" (unit_text)="unit_text = $event" (update)="term = $event" ></unit-textbox>-->
        <!---->
                     <!--<div class="row">-->
                     <!--</div>-->
                     <!---->
                    <!--<div class="row">-->
                          <!--<monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [monomer_type]="selectedGroup" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
                     <!---->
                     <!--&lt;!&ndash;&ndash;&gt;-->
                     <!--&lt;!&ndash;&ndash;&gt;-->
                     <!--&lt;!&ndash;&ndash;&gt;-->
                    <!--<div *ngIf='selectedGroup=="Any"' class="row">-->
                          <!--<monomer-group  [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" monomer_type="any" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
                    <!--<div *ngIf='selectedGroup=="Endcaps"' class="row">-->
                          <!--<monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" monomer_type="Endcaps" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
                    <!--<div *ngIf='selectedGroup=="Sugars"' class="row">-->
                          <!--<monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" monomer_type="Sugars" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
                    <!--<div *ngIf='selectedGroup=="Bases"' class="row">-->
                          <!--<monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" monomer_type="Bases" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
                    <!--<div *ngIf='selectedGroup=="Linkers"' class="row">-->
                          <!--<monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" monomer_type="Linkers" [searchTerm]="term"></monomer-group>-->
                    <!--</div>-->
            <!--</td>-->
            <td>
                <unit-display [monomer_db]="monomer_db"></unit-display>
            </td>
            
            </tr>
            </div>
    `,
    // directives: [MonomerGroup, LegacyMonomerGroup, SubstructureGroup, UnitStringManager, UnitDisplay],
    providers: [ ApplicationControls, MonomerLoader, MonomerSaver]

})
export class UnitBuilder implements OnInit, MonomerManagerListener, AppListener {
    monomer_db:MonomerDB;
    monomer_manager:MonomerManager;
    selectedGroup:string = "Any";
    substructureList:Hit[];
    app_control:ApplicationControls;
    monomer_type:string = "any";
    monomers:IonisMonomer[];
    unit_text:string;


    constructor(private monomer_loader:MonomerLoader, private monomer_saver:MonomerSaver, private ref:ChangeDetectorRef, @Inject(Http)http:Http ) {
        this.app_control = new ApplicationControls();
        this.monomer_manager = new MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
        var intervalId = setInterval(() => {
            if (this.monomer_db) {
                clearInterval(intervalId);
                this.ref.markForCheck();
            }
        }, 1000);
        this.monomer_loader.getMonomers().subscribe(monomers => this.setMonomerDatabase(monomers));
    }

    setMonomerDatabase(mdb:IonisMonomer[]):void {
        if ( !this.monomer_db ){
            this.monomer_db = new MonomerDB ();
        }
        this.monomer_db.monomers = mdb;
        this.monomer_manager.setMonomer_db(this.monomer_db);
        this.ref.markForCheck();

    }

    newMonomer():void {

    }


    ngOnInit():any {
        if (this.monomer_manager) {
            this.monomer_manager.addListener(this)
        }
        if (this.app_control != undefined) {
            this.app_control.addListener(this);
            this.app_control.notifyOfNewMonomerState();
        }


    }

    updatevalue(elem:HTMLSelectElement):void {
        var selectedval = elem.value;
        this.selectedGroup = selectedval;
        // console.log(this.selectedGroup + " ___selected " + selectedval);
    }

    updateGroup(ngroup:string):void {
        this.selectedGroup = ngroup;
    }

    select(vl:HTMLSelectElement, $event):void {
        var val = vl.value;
        // console.log( ' value : '+ val );
    }

    updateSelectedStructure(ionisMon:IonisMonomer, msg:string):void {
        // we have the selected ionis monomer


    }

    updateSelectedSubstructureList(substructureList:Hit[]) {
        if ((substructureList != undefined) && substructureList.length > 1) {
            this.substructureList = substructureList;
            this.selectedGroup = 'Substructure';

        }
    }

}

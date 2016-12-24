/**
 * Created by jmilton on 5/31/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from '../component/monomer_manager.component';
import {MonomerGroup} from "./monomer_group.component";
import {SubstructureGroup} from "./substructure_group.component";
import {LegacyMonomerGroup} from "./legacy_monomer_group.component";
import {OnInit} from "@angular/core";
import {SearchMonomers} from './util/search_monomer.component';
import {LegacySearchMonomers} from "./util/legacy_search_monomer.component";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Hit} from "../lib/hit";
import {NewMonomer} from "./newmonomer.component";


@Component({
    selector: 'monomer-list',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    inputs: ['monomer_db','monomer_manager', 'app_control', 'selectedGroup'],
    template: `

            <div  class="table-responsive" style="padding: 15px;">
            <!--<div class="col-xs-12 col-sm-6 col-md-8">-->
            <select class="form-control" type="input" (change)="updatevalue(selectedvalue)" #selectedvalue>
                  <option value="All">All</option>
                  <option value="Chem">Chem (e.g. conjugate structures) </option>
                  <option value="RNA_BACKBONE" >Sugars and linkers (backbone structures)</option>
                  <option value="Bases">Bases (branch structures) </option>
                  <option value="Peptides">Peptides </option>
                  <option value="LegacySearch">Legacy Search</option>
                  <option value="Substructure">Substructure</option>
                  <option value="NewMonomer">New Monomer</option>
            </select>



             <div class="row">
             </div>
            <div *ngIf='selectedGroup=="All"' class="row">
                  <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)" (update)="setTerm($event)" (ispublic)="setPub($event)" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" 
                  [searchTerm]="term" 
                  [nameSearchTerm]="name_term" 
                  [ispublic]="ispub"></monomer-group>
            </div>




            <div *ngIf='selectedGroup=="LegacySearch"' class="row">
                  <legacy-monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [id_value]="id_value"></legacy-monomer-group>
            </div>



            <div *ngIf='selectedGroup=="Substructure"' class="row">
                  <substructure-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager"></substructure-group>
            </div>
            <div *ngIf='selectedGroup=="Chem"' class="row">
               <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)"  
               (update)="term = $event" (ispublic)="ispub = $event" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [polymer_type]="'CHEM'" [searchTerm]="term" 
                    [nameSearchTerm]="name_term" 
                  [ispublic]="ispub"></monomer-group>
            </div>
            <div *ngIf='selectedGroup=="RNA"' class="row">
               <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)"  (update)="term = $event" (ispublic)="ispub = $event" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [polymer_type]="'RNA'" [searchTerm]="term"
                    [nameSearchTerm]="name_term"                   
                   [ispublic]="ispub"></monomer-group>
            </div>
            <div *ngIf='selectedGroup=="RNA_BACKBONE"' class="row">
               <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)"  (update)="term = $event" (ispublic)="ispub = $event" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [polymer_type]="'RNA'" [monomer_type]="'backbone'" [searchTerm]="term" 
                    [nameSearchTerm]="name_term" 
                  [ispublic]="ispub"></monomer-group>
            </div>
            
            <div *ngIf='selectedGroup=="Peptides"' class="row">
               <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)"  (update)="term = $event" (ispublic)="ispub = $event" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [polymer_type]="'PEPTIDE'" [monomer_type]="'backbone'" [searchTerm]="term"
                    [nameSearchTerm]="name_term" 
                   [ispublic]="ispub"></monomer-group>
            </div>
            <div *ngIf='selectedGroup=="Bases"' class="row">
               <filter-monomers [substructureList]="substructureList" (update_name)="setNameTerm($event)"  (update)="term = $event" (ispublic)="ispub = $event" ></filter-monomers>
                  <monomer-group [monomer_db]="monomer_db" [monomer_manager]="monomer_manager" [polymer_type]="'RNA'" [monomer_type]="'branch'" [searchTerm]="term" 
                    [nameSearchTerm]="name_term" 
                  [ispublic]="ispub"></monomer-group>
            </div>
            <div *ngIf='selectedGroup=="NewMonomer"' class="row">
                  <new-monomer [monomer_db]="monomer_db" [monomer_manager]="monomer_manager"
                  monomer_type="any" [app_control]="app_control"></new-monomer>
            </div>
            </div>
    `,
    // directives: [MonomerGroup, LegacyMonomerGroup,  SubstructureGroup, SearchMonomers, LegacySearchMonomers, NewMonomer],
    providers: [ApplicationControls]

})
export class MonomerList implements OnInit, MonomerManagerListener, AppListener {
    monomer_db:MonomerDB;
    monomer_manager:MonomerManager;
    selectedGroup : string = "All";
    substructureList:Hit[];
    app_control:ApplicationControls;
    ispub:string;
    term:string;
    name_term:string;


    constructor(private ref:ChangeDetectorRef) {

    }
    newMonomer():void
    {

    }
    setTerm(event){
        this.term = event;
        // this.ref.markForCheck();

    }
    setNameTerm(event){
        this.name_term = event;
        // this.ref.markForCheck();

    }
    setPub(event){
        this.ispub = event;
        // console.log ( ' is public ' + this.ispub );
        this.ref.markForCheck();

    }


    ngOnInit():any {
        if( this.monomer_manager ){
            this.monomer_manager.addListener(this)
        }
        if ( this.app_control != undefined )
        {
            this.app_control.addListener ( this );
        }

        this.app_control.notifyOfNewMonomerState();
        this.ref.detectChanges();

    }

    updatevalue ( elem:HTMLSelectElement) : void {
        var selectedval = elem.value;
        this.selectedGroup = selectedval;
        // console.log ( this.selectedGroup + " ___selected " + selectedval);
        if ( selectedval == 'NewMonomer'){
            this.app_control.notifyOfNewMonomerState();
        }
        this.ref.detectChanges();
    }

    updateGroup ( ngroup : string ) : void {
        this.selectedGroup = ngroup;
        this.ref.detectChanges();
    }

    select(vl : HTMLSelectElement, $event) : void {
        var val = vl.value;
        // console.log( ' value : '+ val );
    }

    updateSelectedStructure ( ionisMon : IonisMonomer, msg:string ) : void
    {}
    updateSelectedSubstructureList ( substructureList:Hit[] ){
        if ( (substructureList!=undefined) && substructureList.length > 1 ){
            this.substructureList=substructureList;
            this.selectedGroup='Substructure';
            this.ref.markForCheck();

        }
    }

}

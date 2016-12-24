import {
    OnInit,
    Component,
    ViewChild,
} from "@angular/core";
import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import {MonomerDB} from '../lib/monomer_db';
import {MonomerSaver} from '../services/monomer_saver';
import {MonomerManager} from "../component/monomer_manager.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ActionObserver} from "../../../ui/action_observer";
import {SearchMonomers2Component} from "../lib/search_monomers.2.component";
import {MonomerRegistration2Component} from "./monomer_registration.2.component";
import {MonomerLibraryManager} from "./monomer_library_manager.component";
import {UnitBuilder} from "./unit_builder.component";
import {OligoBuilder} from "./oligo_builder.component";
import {OligoDatabaseManager} from "./oligo_database_manager.component";
import {OligoDatabaseSearch} from "./oligo_database_search.component";

@Component({
    selector: 'monomer-app2',
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
    template: `
    
        <div class='panel panel-heading' >
            <div style="padding: 3px" class="btn-group">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Monomer Database
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                    <button type="button" class="btn btn-link" (click)="loadRegistration()">Substructure Search</button>
                </li>
                <li class="divider"></li>
                <li>               
                    <button type="button" class="btn btn-link" (click)="loadRegistration()">Monomer viewer</button>
                </li>
                </ul>
            </div>

            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Oligo Database
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                     <button type="button" class="btn btn-link" (click)="setMode('oligodb.search.ion')">Search Ions</button>
                </li>
                <li>               
                     <button type="button" class="btn btn-link" (click)="setMode('oligo_database.search_sequence')">Sequence</button>
                </li>
                </ul>
            </div>

            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Tools
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                     <button type="button" class="btn btn-link"(click)="buildOligo()">HELM structure viewer</button>
                </li>
                </ul>
            </div>

            </div>
        <span [ngSwitch]="mode">
          <span *ngSwitchCase="'registration'">        
                <monomer2-lib></monomer2-lib>
           </span>
          <span *ngSwitchCase="'lib'">
              <!--Monomer library: -->
                  <monomer2-lib></monomer2-lib>
           </span>
          <span *ngSwitchCase="'monomer_manager'">
                <monomer-library-manager></monomer-library-manager>
           </span>
          <span *ngSwitchCase="'unit_builder'">
                <unit-builder></unit-builder>
           </span>
          <span *ngSwitchCase="'oligo_builder'">
                <oligo-builder></oligo-builder>
           </span>
          <span *ngSwitchCase="'oligodb.search.ion'">
             <oligo-search [monomer_db]="monomer_db" [mode]="'ion'"></oligo-search>
           </span>
          <span *ngSwitchDefault>
            </span>
        </span>

    < #modal>
        <modal-header [show-close]="true">
            <h4 class="modal-title"></h4>
        </modal-header>
        <modal-body>
            Saved.
        </modal-body>
    </modal>
</div>

    `,
    // directives: [MonomerManager, MODAL_DIRECTIVES, MonomerRegistration2Component,
    //     SearchMonomers2Component, MonomerLibraryManager, UnitBuilder, OligoBuilder, OligoDatabaseManager, OligoDatabaseSearch],
    providers: [ MonomerSaver]

})
export class MonomerApp2 implements OnInit, AppListener, ActionObserver {
    monomer_manager:MonomerManager;
    monomer_db:MonomerDB;
    app_control:ApplicationControls;
    @ViewChild('modal')
    modal:ModalComponent;
    mode:string = "lib";


    constructor(private save_mon:MonomerSaver) {
    }

    hide():void {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    loadRegistration():void {
        this.mode = "registration";
    }

    loadSearch():void {
        this.mode = "lib";
    }

    myFunction():void {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    ngOnInit():any {
        if (this.app_control != null) {
            this.app_control.addListener(this);
        }
    }

    saveSelectedMonomer(model:any):void {

        this.modal.open();
        // this.save_mon.saveMonomer(this.monomer_manager.selectedMonomer, this);
        this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
    }

    action_successful():void {
        if (this.modal) {
            this.modal.close();
            this.modal.visible = false;
        }
    }

    action_failed():void {
        this.modal.close();
    }

    setMode ( mode:string ){
        this.mode = mode;
    }


    buildunit() : void {
        this.mode = "unit_builder";
    }
    buildOligo () : void {
        this.mode = "oligo_builder";
    }


    deleteMonomer():void {


    }

    librarymanager():void {
        this.mode = "monomer_manager";
    }

    newMonomer():void {

        console.log(" reset this panel ");


    }
}

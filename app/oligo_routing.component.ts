import {
    OnInit,
    Component,
    ViewChild,
    HostBinding,
    trigger, transition, animate, style, state
} from "@angular/core";
import {Http, Response} from '@angular/http';
import {MonomerDB} from './ionisph/chem/lib/monomer_db';
import {MonomerSaver} from './ionisph/chem/services/monomer_saver';
import {MonomerManager} from "./ionisph/chem/component/monomer_manager.component";
import {ApplicationControls} from "./ionisph/chem/lib/application_control_manager";
import {AppListener} from "./ionisph/chem/lib/app_listener";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ActionObserver} from "./ui/action_observer";
import {SearchMonomers2Component} from "./ionisph/chem/lib/search_monomers.2.component";
import {MonomerRegistration2Component} from "./ionisph/chem/component/monomer_registration.2.component";
import {MonomerLibraryManager} from "./ionisph/chem/component/monomer_library_manager.component";
import {UnitBuilder} from "./ionisph/chem/component/unit_builder.component";
import {OligoBuilder} from "./ionisph/chem/component/oligo_builder.component";
import {OligoDatabaseManager} from "./ionisph/chem/component/oligo_database_manager.component";
import {OligoDatabaseSearch} from "./ionisph/chem/component/oligo_database_search.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {URLs} from './ionisph/chem/services/urls';



@Component({
    selector: 'oligo-nav',
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
    template: `

        <div class='panel panel-heading' >
            <div style="padding: 3px" class="btn-group">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"> Create IONs... 
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                    <button type="button" class="btn btn-link" (click)="buildOligo()">Simple Builder</button>
                </li>
                <li>
                    <button type="button" class="btn btn-link" (click)="setMode('helm_editor')">MedCHEM Builder</button>
                </li>
                <li class="divider"></li>
                <li>               
                    <button type="button" class="btn btn-link" (click)="loadRegistration()">SAR Editor</button>
                </li>
                </ul>
            </div>

            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">ION Database
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                     <button type="button" class="btn btn-link" (click)="setMode('oligodb.search.ion')">Search IONs</button>
                </li>
                <li>               
                     <button type="button" class="btn btn-link" (click)="setMode('oligo_database.search_sequence')"> Search IONs by target </button>
                </li>
                </ul>
            </div>

            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Monomers
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                     <button type="button" class="btn btn-link" (click)="show('monomerdb.search')"> Search </button>
                </li>
                </ul>
            </div>



            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">ION Rule Database
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                <li>
                     <button type="button" class="btn btn-link" (click)="setMode('oligoruledb.search.rules')">Search Rules</button>
                </li>
                <li>               
                     <button type="button" class="btn btn-link" (click)="setMode('oligoruledb.create.rule')">Create Rule</button>
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
                    <span *ngSwitchCase="'lib'">
                        <oligo-search [monomer_db]="monomer_db" [mode]="'Ions'"></oligo-search>
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
                        <oligo-search [monomer_db]="monomer_db" [mode]="'Ions'"></oligo-search>
                    </span>
                    <span *ngSwitchCase="'helm_editor'">
                        <helm-editor></helm-editor>
                    </span>
                    <span *ngSwitchCase="'oligoruledb.search.rules'">
                        <search-helm-rules [data_source]="helm_rules_data_source"></search-helm-rules>
                    </span>
                   
                    <span *ngSwitchDefault>
                    </span>
                </span>
                




<modal #monomer_display item-width="'400px'">
	  <modal-header [show-close]="true">
	  </modal-header>
	  <modal-body>
        <monomer-library [enable_editing]='false'></monomer-library>
	  </modal-body>
</modal>




</div>

    `,
    providers: [ MonomerSaver], 
})
export class OlgioRoutingComponent implements OnInit, AppListener, ActionObserver {

    monomer_manager:MonomerManager;
    monomer_db:MonomerDB;
    app_control:ApplicationControls;



    // {{ NEED TO IMPLEMENT THIS }}
    @ViewChild('modal')
    modal:ModalComponent;
    @ViewChild('monomer_display')
    monomers_display:ModalComponent;
    mode:string = "lib";
    helm_rules_data_source:string = URLs.helm_rules_datasource;


 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private save_mon:MonomerSaver) {

    }

    hide():void {

        this.route.params.forEach((params:Params)=>{
            this.mode = params['mode'];

        });


        document.getElementById("myDropdown").classList.toggle("show");
    }

    show ( object:string ) : void {

        this.monomers_display.open ( 'lg');


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

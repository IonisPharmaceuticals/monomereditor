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
import {OligoLoader} from "./ionisph/chem/services/oligo_loader";
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
import {URLs} from './ionisph/chem/services/urls';
import {HELMListener} from './helm/lib/helmlistener';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
    selector: 'oligo-edit',
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
    template: `
        <div class='panel panel-heading' >
            <div style="padding: 3px" class="btn-group">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Monomer Database
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

            <helm-editor [helm]='helm'></helm-editor>
            {{ isisno }}
            {{ helm }}


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
export class OligoEditRoutingComponent implements OnInit, AppListener, ActionObserver, HELMListener {

    monomer_manager:MonomerManager;
    monomer_db:MonomerDB;
    app_control:ApplicationControls;
    isisno:number;
    helm:string; 


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
    private save_mon:MonomerSaver, private oligo_loader:OligoLoader) {

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


    updateHELM ( helms:string ) : void {
        this.helm = helms;
    }
    public updateError(er:any) : void {

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

        this.route.params.forEach((params: Params) => {
             let id = +params['id']; // (+) converts string 'id' to a number
             this.isisno = id;

        });

        if ( this.isisno != null )
        {
            this.oligo_loader.loadOligo ( this.isisno, this );
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

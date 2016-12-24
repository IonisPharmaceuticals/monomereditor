import {
    OnInit,
    Component,
    ViewChild,
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

@Component({
    selector: 'chem-manager',
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
    template: `
      <router-outlet></router-outlet>

    `,
    providers: [ MonomerSaver]

})
export class AppComponent implements OnInit, AppListener, ActionObserver {
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

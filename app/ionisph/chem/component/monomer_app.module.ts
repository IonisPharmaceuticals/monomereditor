import { NgModule,
    OnInit,
    Component,
    ViewChild,Input,
} from "@angular/core";

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import {MonomerSaver} from '../services/monomer_saver';
import {MonomerManager} from "../component/monomer_manager.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ActionObserver} from "../../../ui/action_observer";
import {SearchMonomers2Component} from "../lib/search_monomers.2.component";
import {MonomerRegistration2Component} from "./monomer_registration.2.component";
import {UnitBuilder} from "./unit_builder.component";
import {OligoBuilder} from "./oligo_builder.component";
import {OligoDatabaseManager} from "./oligo_database_manager.component";
import {OligoDatabaseSearch} from "./oligo_database_search.component";
import {Ketcher2Component} from "./ketcher.2.component";
import {NewMonomer} from "./newmonomer.component";
import {MonomerLoader} from '../services/monomerloader';
import {RegisterMonomerEditor} from './register_monomer_editor.component';
import {MonomerList} from './monomer_list.component';
import {MonomerEditor} from './monomer_editor.component';
import {MonomerGroup} from './monomer_group.component';
import {SearchMonomers} from './util/search_monomer.component';
import {LegacyMonomerGroup} from './legacy_monomer_group.component';
import {LegacyIDFilter} from "../pipes/legacy_id_filter";
import {IsPublicFilter} from "../pipes/ispublic";
import {SubstructureGroup} from './substructure_group.component';
import {MonomerFilter} from '../pipes/monomer_filter';
import {MonomerNameFilter} from '../pipes/monomer_name_filter';
import {LegacySearchMonomers} from './util/legacy_search_monomer.component';
import {MonomerSummary} from './monomer/monomer_summary.component';
import {MonomerLibraryManager} from './monomer_library_manager.component';

@NgModule({
imports: [
    Ng2Bs3ModalModule,
    BrowserModule,
    FormsModule
  ], 
      declarations: [
                SearchMonomers2Component, 
                MonomerRegistration2Component, 
                Ketcher2Component,
                NewMonomer, 
                RegisterMonomerEditor, 
                MonomerList,
                MonomerEditor,
                MonomerGroup, 
                MonomerLibraryManager,
                SearchMonomers, 
                LegacyMonomerGroup, 
                LegacySearchMonomers, 
                SubstructureGroup, 
                MonomerFilter,
                MonomerNameFilter,
                IsPublicFilter, 
                LegacyIDFilter, 
                MonomerSummary, 
                MonomerManager
      ],
      exports: [SearchMonomers2Component, MonomerLibraryManager],
        // pipes: [MonomerFilter, IsPublicFilter],

    providers: [MonomerDB, MonomerLoader, ApplicationControls, LegacyIDFilter]

    // directives: [ROUTER_DIRECTIVES, SearchBox, Ketcher2Component, MonomerList, MonomerEditor],


})
export class MonomerAppModule {



}
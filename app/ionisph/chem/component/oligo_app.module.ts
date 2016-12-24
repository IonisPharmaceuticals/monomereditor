import { NgModule,
    OnInit,
    Component,
    ViewChild,Input,
} from "@angular/core";

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import {UnitBuilder} from "./unit_builder.component";
import {OligoBuilder} from "./oligo_builder.component";
import {OligoDatabaseManager} from "./oligo_database_manager.component";
import {OligoDatabaseSearch} from "./oligo_database_search.component";
import {Ketcher2Component} from "./ketcher.2.component";
import {NewMonomer} from "./newmonomer.component";
import {MonomerLoader} from '../services/monomerloader';
import {MonomerAppModule} from './monomer_app.module';
import {HELMModule} from '../../../helm/helm.module';
import {PistoiaHELMEditor} from './pistoia_helm_editor.component';
import {ChemModule} from '../chem.module';
import {OligoChemistrySummary} from './oligo_chemistry_summary';
import {oligosRouting} from './oligo_app.routing';
import {OligoLoader} from '../services/oligo_loader';
import {IUnit} from '../iunit';
import {OligoUnitChemistry} from './oligo_unit_chem';
import {OligoChainChemistry} from './oligo_chain_chem';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {RulesModule} from './../../../helm/rules/rules.module';
import {OligoRegistrationForm} from './oligo_registration_form.component';

@NgModule({
imports: [
        ChemModule,
        MonomerAppModule,
        BrowserModule,
        FormsModule, 
        HELMModule,
        oligosRouting,
        Ng2Bs3ModalModule, 
        RulesModule, 
  ], 
      declarations: [
                OligoBuilder, OligoDatabaseSearch, OligoDatabaseManager, PistoiaHELMEditor, OligoChemistrySummary, OligoRegistrationForm],
    exports: [OligoDatabaseSearch, OligoBuilder],
    providers: [MonomerDB, MonomerLoader, OligoLoader]
})
export class OligoAppModule {
}
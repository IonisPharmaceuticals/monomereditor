import { FormsModule } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridModule} from '../../ui/grid.module';
import {HELMModule} from '../helm.module';
import {HELMRulesSearch} from './helm_rules_search.component';
import {HELMRulesGrid} from './helm_rule_grid.component';
import {HELMRulesSelctorGrid} from './helm_rule_selectorgrid.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ResultsTableModule} from './../util/results_table.module';

@NgModule({
  imports:[
    BrowserModule,
     GridModule,
      AgGridModule,
        HELMModule,
          Ng2Bs3ModalModule,
          FormsModule,
          ResultsTableModule, 
          
  ],
  declarations:[HELMRulesSearch,HELMRulesGrid, HELMRulesSelctorGrid], 
  exports:[HELMRulesSearch, HELMRulesSelctorGrid], 
})
export class RulesModule {



}
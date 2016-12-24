import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SequenceGrid} from './sequence_grid.component';
import {HelmGrid} from './helm_grid.component';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-ng2/main';
import {GridModule} from '../ui/grid.module';
import {HELMParser} from './lib/helm_parser';
import { FormsModule } from '@angular/forms';
import {Http, Response} from '@angular/http';

// import {ResultsTable} from './util/results_table.component';
import {HELMEditorComponent} from './editor/helm_editor.component';
import {HELMNotationGrid} from './helm_notation_grid.component';
import {RegistrationComponent} from './editor/registration.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {HELMListener} from './lib/helmlistener';
import {Register} from './lib/register';

@NgModule({
  imports:[FormsModule, BrowserModule, GridModule, AgGridModule, CommonModule, Ng2Bs3ModalModule],
  declarations:[HelmGrid, SequenceGrid, HELMEditorComponent, HELMNotationGrid,  RegistrationComponent], 
  exports:[HelmGrid, SequenceGrid, HELMEditorComponent, HELMNotationGrid], 
  providers: [HELMParser, Register]
})
export class HELMModule {



}
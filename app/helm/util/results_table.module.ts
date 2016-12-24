import { FormsModule } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-ng2/main';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ResultsTable} from './results_table.component';

@NgModule({
  imports:[
    BrowserModule,
      AgGridModule,
          Ng2Bs3ModalModule,
          FormsModule,
  ],
  declarations:[ResultsTable], 
  exports:[ResultsTable], 
})
export class ResultsTableModule {



}
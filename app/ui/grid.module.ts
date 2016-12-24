import {NgModule} from '@angular/core';
import {LivingGrid} from './living_grid.component';
import {RawGrid} from './raw_grid.component';
import {CellDisplay} from './cell_display.component';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-ng2/main';
import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  imports:      [ HttpModule, BrowserModule,  AgGridModule.forRoot(),
 ],
  declarations: [ CellDisplay, RawGrid, LivingGrid], 
  exports: [RawGrid, LivingGrid], 
})
export class GridModule {
}
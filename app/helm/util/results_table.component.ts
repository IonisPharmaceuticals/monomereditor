import {
    OnInit,
    OnChanges,
    SimpleChanges, 
    Component,
    ViewContainerRef,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Output
} from "@angular/core";
import {AgGridNg2} from 'ag-grid-ng2/main';
import {TableCellDisplay} from './table_cell_display.component';
import {Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AgRendererComponent} from 'ag-grid-ng2/main';
import {ResultTableManager} from './result_table_manager';


@Component({
    selector: 'linkout-cell',
    template: `linkout cell-->`
})
class LinkoutRenderComponent implements AgRendererComponent {
    private params:any;

    agInit(params:any):void {
        this.params = params;
    }
}


@Component({
    selector: 'uri-result-table',
    inputs: ['data', 'fields', 'headers', 'field_widths', 'table_manager', 'notify_selection_on_field'],
    template: `
            <span [ngSwitch]="display_status">
                  <span *ngSwitchCase="'show_grid'">
                        <ag-grid-ng2 id="helm_grid" #agGrid style="height:100%;width:100%;font-size:small" class="ag-material" [gridOptions]="grid" 
                        [enableFilter]="true" (modelUpdated)="onModelUpdated($event)" 
                        rowSelection="multiple" (cellClicked)="click($event)" [rowData]="data" rowHeight="40" [showToolPanel]="'true'">
                        </ag-grid-ng2>
                    </span>
                     <span *ngSwitchCase="'show_no_results'" style="font-color:lightGray" padding="20">
                                <h4>No Results found.</h4>
                     </span>
            </span>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsTable implements OnInit, OnChanges  {
    table_manager:ResultTableManager;
    display_status:string = "show_grid";


    grid:{};
    data:{};
    start:number=0;
    length:number=1000;
    errorMessage:string;
    fields:string[] = ["isisno","helm"];
    headers:string[] = ["ION","HELM"];
    field_widths:number[] = [100,1000];
    notify_selection_on_field='helm';
    columns = [
        ];



    constructor(
                private _http:Http, 
                private ref:ChangeDetectorRef, 
                private _viewContainerRef:ViewContainerRef
                )
                    {
                    }


  ngOnChanges(changes: SimpleChanges) {
  if ( this.data == null || Object.keys ( this.data ).length <= 0){
            this.display_status = "show_no_results";
        }else
        {
                this.display_status = "show_grid";
        }

    }


    ngOnInit():any {

        if ( this.data == null || Object.keys ( this.data ).length <= 0){
            this.display_status = "show_no_results";
        }else
        {
                this.display_status = "show_grid";
        }


        this.columns = [];
        var ind = 0;
        for ( var i in this.fields ){
            var field = this.fields[i]
            var header = this.headers[i];
            var field_width = this.field_widths[i];
            this.columns.push ( {headerName: header, field: field, 
                    width: field_width, 
                    editable: false,
                 } );
            ind++;
        }
            this.columns.push ( {
                    headerName: '', 
                    cellRenderer: render_cell, pinned: true,
                    field: 'linkout',
                    width: 100
                 } 
                 
                 
                 );


       this.grid = {
            columnDefs: this.columns,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
        };   

    }
    set_data ( data:any) : void {
        this.data = data;
        if ( this.data == null || Object.keys ( this.data ).length <= 0 )
        {
            this.display_status = "show_no_results";
        }else
        {
            this.display_status = "show_grid";
        }


        this.ref.markForCheck()
    }
    extract_data (res: Response) : any{
        let body = res.json();
        return body;
    }
    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    public click ( event ) : void 
    { 
        

        var srows  = event.api.getSelectedRows();

        var row = {};
        if ( this.table_manager != null ){
            this.table_manager.notifyInteractionListeners ( event.data );                
        }
    }
    onModelUpdated(event ): void {

    }
}

function render_cell(params) {
    //    if ( params != null && params.data != null ){
    //     // let hr = "<a href='http://birdbeta.isisph.com/ri/#/oligos/"  + params.data.isisno + "' class='btn btn-secondary btn-small' role='button'>Detail</a>"
    //     return hr;
    //    }else
    //    {
           return "";
    //    }
    }

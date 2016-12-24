import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from "@angular/core";
import {AgGridNg2} from 'ag-grid-ng2/main';
import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {GridManager} from './gridmanager';
import {GridManagerListener} from './gridmanager_listener';
@Component({
    selector: 'Living-grid',
    inputs: ['uri_ref','grid_manager'],
    template: `
    
    
                    <ag-grid-ng2 id="helm_grid" #agGrid style="height:400px;width:100%;font-size:x-small" class="ag-material" [gridOptions]="grid" 
                    [enableFilter]="true" (modelUpdated)="onModelUpdated($event)" 
                    rowSelection="multiple" (cellClicked)="click($event)" [rowData]="data" rowHeight="40" [showToolPanel]="'true'">
                    </ag-grid-ng2>
    
                
    
    
    
    
    
    `,
    // directives: [NgModel, AgGridNg2],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GridManager]
})
export class LivingGrid implements OnInit, GridManagerListener  {
    grid_manager:GridManager;
    uri_ref:string = 'http://127.0.0.1:8000/oligo_library/list_oligos?start=0&length=1000';
    grid:{};
    data:{};
    start:number=0;
    length:number=1000;
    errorMessage:string;
    columns = [
            {headerName: 'ION', field: "isisno", width: 100 },
            {headerName: 'helm', field: "helm" ,width: 1000},
        ];



    constructor(private _http:Http, private ref:ChangeDetectorRef) {
       this.grid = {
            columnDefs: this.columns,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true
        };   
   }

    update ( mode:string, url:string ): void {

        this.uri_ref = url;
         this._http.get(this.uri_ref)
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data(json),
                     error =>  this.errorMessage = <any>error);



    }


    ngOnInit():any {
        this.grid_manager.addDataListener ( this )

         this._http.get(this.uri_ref)
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data(json),
                     error =>  this.errorMessage = <any>error);


    }

    set_data ( data:any) : void {

        // let d = [
        //         {
        //             "helm": "RNA1{[moe](G)[sp].[moe](G)p.[moe](A)p.[moe](A)p.[moe](A)p.d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].[moe]([m5C])p.[moe](A)p.[moe]([m5C])[sp].[moe](A)[sp].[moe]([m5C])}$$$$",
        //             "isisno": "619169"
        //         },
        //         {
        //             "helm": "RNA1{[cet](A)[sp].[cet](A)p.[moe](T)p.[moe](T)p.[moe](A)[sp].[cet](T)[sp].d([m5C])[sp].d([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(T)[sp].d(G)[sp].d([m5C])[sp].[cet](T)p.[moe]([m5C])p.[moe]([m5C])[sp].[cet](T)[sp].[cet](T)}$$$$",
        //             "isisno": "615678"
        //         },
        //         {
        //             "helm": "RNA1{[moe](T)[sp].[moe](T)p.[moe](T)p.[moe]([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d([m5C])[sp].[moe]([m5C])p.[moe](T)p.[moe](T)p.[moe]([m5C])[sp].[moe](A)[sp].[moe](T)}$$$$",
        //             "isisno": "625448"
        //         }];

        this.data = data;
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
    }
    onModelUpdated(event ): void {
            console.log ( ' module is updated ');

    }
}
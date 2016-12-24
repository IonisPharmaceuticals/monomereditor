import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Output
} from "@angular/core";
import {AgGridNg2} from 'ag-grid-ng2/main';
import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {GridManager} from './../ui/gridmanager';
import {GridManagerListener} from './../ui/gridmanager_listener';

import {AgRendererComponent} from 'ag-grid-ng2/main';
import {GridOptions,RowNode} from 'ag-grid/main';
import {GridListener} from './../ui/grid_listener';
import {HELMNotationGrid} from './helm_notation_grid.component';



@Component({
    selector: 'group-row-cell',
    template: `{{params}}`
})
class GroupInnerRowComponent implements AgRendererComponent {
    private params:any;

    agInit(params:any):void {
        this.params = params;
    }
}
@Component({
    selector: 'helm-grid',
    inputs: ['uri_ref','grid_manager'],
    templateUrl: 'app/helm/helm_grid.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GridManager]
})
export class HelmGrid implements OnInit, GridManagerListener, GridListener  {
    grid_manager:GridManager;
    uri_ref:string = 'http://127.0.0.1:8000/oligo_library/list_oligos?start=0&length=1000';
    // uri_ref: string = 'http://127.0.0.1:8000/oligo_library/get_oligos/?isisno=301012,643311';
    grid:{};
    data:{};
    start:number=0;
    length:number=1000;
    errorMessage:string;
    @Output() selected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _http:Http, private ref:ChangeDetectorRef) {
    }

    update ( mode:string, url:string ): void {

        this.uri_ref = url;
         this._http.get(this.uri_ref)
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data(json),
                     error =>  this.errorMessage = <any>error);



    }

// deprecated 
    set_selected ( _seobject:string ) : void {
    }

    fieldDataSelected (field:string, values:string[] ) : void {
    }


    ngOnInit():any {
        this.grid_manager.addInteractionListener ( this )
        this.grid_manager.addDataListener ( this );

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
        this.set_selected ( srows );
    }
    onModelUpdated(event ): void {
            // console.log ( ' module is updated ');

    }
}
import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from "@angular/core";
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';


import {AgGridNg2, AgRendererComponent} from 'ag-grid-ng2/main';
import {GridOptions,RowNode} from 'ag-grid/main';
import {HELMParser} from './lib/helm_parser';

// this will in the component below 
// {{params.data.isisno}}


@Component({
    selector: 'sequence-options-cell',
    template: `



        <img src='app/img/right_arrow.png'> <img src='app/img/align.png'>


    `
})
class SequenceOptionsComponent implements AgRendererComponent {
    private params:any;

    agInit(params:any):void {
        this.params = params;
    }

    refresh(params:any):void {
        this.params = params;
    }
    blast ( exec ) : void {

   }
   new_oligo () : void {

   }

}


@Component ({

    template: `{{ sequence }}` 


})
class BackboneSequenceCellComponent implements AgRendererComponent {
   private params:any;
    private sequence: string;


    constructor (private hparser:HELMParser){



    }


    agInit(params:any):void {
        this.params = params;
        this.sequence = this.hparser.parse_backbone_sequence ( params.data.helm );
    }

    refresh(params:any):void {
        this.params = params;
    }
    blast ( exec ) : void {

   }
   new_oligo () : void {
       
   }
}




@Component({
    selector: 'sequence-cell',
    template: `
            {{ sequence }}

    `
})
class SequenceCellComponent implements AgRendererComponent {
    private params:any;
    private sequence: string;

    agInit(params:any):void {
        this.params = params;
        this.sequence = pull_sequence ( params.data.helm );
    }

    refresh(params:any):void {
        this.params = params;
    }
    blast ( exec ) : void {

   }
   new_oligo () : void {
       
   }

}

function pull_sequence ( helm ){

    var seq = "";
    var sp = helm.split ( ".");
    for (var s in sp){
        
        var t = sp[s];
        let vs = t.indexOf ( '(');
        let vf = t.indexOf ( ')');
        if ( vs >= 0 && vf > 0 ){
            let seq_val = t.substring ( vs+1, vf );
            seq += ' ' + seq_val + '  ';
        }else {
            seq += '  ' + t + ' __ ';
        }
    }
    return seq;
}













@Component({
    selector: 'sequence-grid',
    inputs: ['data', 'sequence_type'],
    template: `
    

                    <ag-grid-ng2 *ngIf="data" id="helm_grid" #agGrid style="height:100%;width:100%;font-size:small" class="ag-material" [gridOptions]="grid" 
                    [enableFilter]="true" (modelUpdated)="onModelUpdated($event)" 
                    rowSelection="multiple" (cellClicked)="click($event)" [rowData]="data" rowHeight="40" [showToolPanel]="'true'">
                    </ag-grid-ng2>
    
    
    
    
    
    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SequenceGrid implements OnInit  {
    grid:{};
    data:{};
    start:number=0;
    length:number=1000;
    errorMessage:string;
    sequence_type:string = "base";   // can be base|backbone|sugar|linker

    columns = [
            {headerName: '', field: 'links', width:100,  cellRendererFramework: {
                    component: SequenceOptionsComponent
                }, pinned:true},
            {headerName: 'ION', field: "isisno", width: 100 },
            {headerName: 'sequence', field: "helm" ,width: 1000, cellRendererFramework: {
                component: SequenceCellComponent
            }},
        ];



    constructor(private _http:Http, private ref:ChangeDetectorRef) {

   }

   build_columns ( type:any ) : any {
           let c  = [
            {headerName: '', field: 'links', width:100,  cellRendererFramework: {
                    component: SequenceOptionsComponent
                }, pinned:true},
            {headerName: 'ION', field: "isisno", width: 100 },
            {headerName: 'sequence', field: "helm" ,width: 1000, cellRendererFramework: {
                component: type
            }},
        ];
        return c;

   }

    ngOnInit():any {
   
        if ( this.sequence_type == 'base')
        {
            this.columns = this.build_columns (SequenceCellComponent);
        }else if ( this.sequence_type == "backbone"){
            this.columns = this.build_columns (BackboneSequenceCellComponent);            
        }



       this.grid = {
            columnDefs: this.columns,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true
        };   

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
        for ( var v in data ){

            console.log ( ' v ' + v );
            console.log ( ' v ' + v['helm'] );

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
    }
    onModelUpdated(event ): void {
            console.log ( ' module is updated ');

    }
}


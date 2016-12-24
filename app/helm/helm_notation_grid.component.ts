import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from "@angular/core";
import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import { Observable } from 'rxjs/Observable';


import {AgGridNg2, AgRendererComponent} from 'ag-grid-ng2/main';
import {GridOptions,RowNode} from 'ag-grid/main';
import {HELMParser} from './lib/helm_parser';

// this will in the component below 
// {{params.data.isisno}}
        // <img src='app/img/right_arrow.png'> <img src='app/img/align.png'>


@Component({
    selector: 'options-cell',
    template: `

       <button height="20px" type="button" (click)="new_oligo()" class="btn btn-danger">Edit...</button>

    `
})
class OptionsComponent implements AgRendererComponent {
    private params:any;
    // private options:string = "
    
    //   <div class="panel panel-default">
    //   <div class="panel panel-info" style="color: #0000CC; border: NONE">
    //     <iframe id="ketcher-frame" [src]="frame_component" (lang)="langchange()" (innerText)="smilesChange()" [name]="molfile"  width="100%" height="520px" scrolling="no" border="2px BLUE" #ketcher_frame>
    //     </iframe>
    //   </div>
    //   </div>


    
    
    // ";



    agInit(params:any):void {
        this.params = params;
    }

    refresh(params:any):void {
        this.params = params;
    }
    blast ( exec ) : void {

   }
   new_oligo () : void {
       
       // {{ THIS IS WHERE WE SUPPLY THE EDIT  }}



   }

}


@Component ({

    template: `
            <div [innerHTML]="sequence"></div>
    ` 


})
class HELMNotationsCellComponent implements AgRendererComponent {
   private params:any;
   private name :string = "";
    private sequence: string;


    constructor (private hparser:HELMParser){

        if (this.sequence != null ){
            this.sequence = this.modifyHTML ( this.sequence );
            
        }

    }


    agInit(params:any):void {
        if ( params != null && params.data != null  && params.data.helm != null ){
            let nucleotides = this.hparser.parse_nucleotides ( params.data.helm  );

            this.params = params;
            if (params.data){
                this.sequence = this.modifyHTML ( params.data.helm );
            }
        }
    }

    modifyHTML ( helm:string ) : string {
        if ( helm == null || helm.length <= 0 )
        {
            return "";
        }

        let n:string = "";
        let nucleotides = this.hparser.parse_nucleotides ( helm );
        for ( var nucleotide of nucleotides )
        {
            n += '<b>' + this.hparser.parse_base_from_nucleotide ( nucleotide ) + '</b>' + 
            '' + 
            '<sup>'+this.hparser.parse_sugar_from_nucleotide ( nucleotide ) + '</sup>' + 
            
            '<sub>'+this.hparser.parse_linker_from_nucleotide ( nucleotide ) + '</sub>' + 
            '  ';
        }
        return n;

    }


    refresh(params:any):void {
        this.params = params;
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
    selector: 'helm-notation-grid',
    inputs: ['data'],
    template: `
    

                    <ag-grid-ng2 *ngIf="data" id="helm_grid" #agGrid style="height:100%;width:100%;font-size:small" class="ag-material" [gridOptions]="grid" 
                    [enableFilter]="true" (modelUpdated)="onModelUpdated($event)" 
                    rowSelection="multiple" (cellClicked)="click($event)" [rowData]="data" rowHeight="50" [showToolPanel]="'true'">
                    </ag-grid-ng2>
    
    
    
    
    
    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HELMNotationGrid implements OnInit  {
    grid:{};
    data:{};
    start:number=0;
    length:number=1000;
    errorMessage:string;

    columns = [];



    constructor(private _http:Http, private ref:ChangeDetectorRef) {
        this.columns = this.build_columns (HELMNotationsCellComponent);            

       this.grid = {
            columnDefs: this.columns,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true
        };   

   }

   build_columns ( type:any ) : any {
           let c  = [
            {headerName: '', field: 'links', width:100,  cellRendererFramework: {
                    component: OptionsComponent
                }, pinned:true},
            {headerName: 'ION', field: "isisno", width: 100 },
            {headerName: 'HELM', field: "helm" ,width: 1000, cellRendererFramework: {
                component: type
            }},
        ];
        return c;

   }

    ngOnInit():any {

        this.ref.markForCheck();
    }

    set_data ( data:any) : void {
        this.data = data;
        for ( var v in data ){

            console.log ( ' v ' + v );
            console.log ( ' v ' + v['helm'] );

        }
        this.ref.markForCheck();
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


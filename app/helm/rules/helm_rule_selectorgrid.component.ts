import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Output, NgModule
} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {AgRendererComponent} from 'ag-grid-ng2/main';
import {GridOptions,RowNode} from 'ag-grid/main';
import {ResultsTable} from '../util/results_table.component';
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ResultTableManager} from './../util/result_table_manager';
import {ResultTableListener} from './../util/result_table_listener';
// import {HELMRuleEngine} from './helm_rule_engine';
import {HELMViewer} from './../helm_viewer';


@Component({
    selector: 'helm-rules-selector',
    templateUrl : './app/helm/rules/helm_rule_selectorgrid.html',
    inputs: ['helm_rules_resource', 'helm_viewer']
})
export class HELMRulesSelctorGrid implements OnInit, ResultTableListener {

    helm_rules_resource:string = "";
    error_message:string = "";
    data:{}
    @ViewChild('modal')
    modal:ModalComponent;
    function_name:string = "";
    function_author:string = "";
    function_description:string = "";
    function_text:string = "function (helm, callback){\n\n\n\n                                               }";
    table_manager:ResultTableManager = new ResultTableManager();
    // helm_rule_engine:HELMRuleEngine; 
    helm_viewer: HELMViewer;



    constructor(private _http:Http, private ref:ChangeDetectorRef) {
    }


    ngOnInit():any {
        this.table_manager.addListener ( this );

         this._http.get(this.helm_rules_resource+"/list")
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data(json),
                     error =>  this.error_message = <any>error);


    }



    set_data ( data:any) : void {
        this.data = data;
        this.ref.markForCheck()
    }



    setSelectedRow ( data:{} ) : void {



        if ( 'helm_function' in data )
        {
            this.function_text = data['helm_function'];
        }
        if ( 'id' in data )
        {
            this.function_name = data['id'];
        }
        if ( 'author' in data ){
            this.function_author  = data['author'];
        }
        if ( 'description' in data){
            this.function_description = data['description'];
        }
        this.show_helm_rule_editor ();
    }

    show_helm_rule_editor ( ) : void {

        if (this.modal) {

         this._http.get(this.helm_rules_resource+"/list")
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data_show(json),
                     error =>  this.error_message = <any>error);
        }
    }


    set_data_show ( js ) : void {
        this.set_data ( js );
        if (this.modal) {
            this.modal.open("lg")
            this.modal.visible = true;
        }
    }


    closehelm_rule_editor ( ) : void {
        if (this.modal) {
            this.modal.close();
            this.modal.visible = false;
        }
    }

apply_function () : void {

    if ( this.function_name == null || this.function_name.length <= 0
    
        || this.function_author.length <= 0 
        || this.function_text.length <= 0 ){
        return;
        }

      var m = {
                "id": this.function_name,
                "author": this.function_author,
                "description": this.function_description,
                "helm_function": this.function_text,
            }
            var helm_function = { "helm_rule" : m };


            let current_helm = this.helm_viewer.getHELM ();
            if ( current_helm == undefined || current_helm == null){
                current_helm = "";
            }



            // this works!!! 
            let function_string = "let helm = '" + current_helm + "';\n"
            + this.function_text + 
            "this.helm_viewer.setHELM(helm)";

            console.log ( function_string );


            var F:Function = new Function ( function_string );
            
            F.call(this);

            this.closehelm_rule_editor();

    }


    handleResponse ( response:Response ) : void {

        console.log ( ' item is saved ' + JSON.stringify(response.json()));
        let j = response.json ();

        if ( 'complete' in j )
        {
            if ( j['complete'] == "successful")
            {
                this.modal.close ();
                this.refresh ();
            }
        }
    }


    refresh () : void {

        
         this._http.get(this.helm_rules_resource+"/list")
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => this.set_data(json),
                     error =>  this.error_message = <any>error);



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
    }


}


// function callfunction ( fun_ , exect){

//     fun_(exect);
    
// }

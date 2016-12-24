import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Output, NgModule
} from "@angular/core";
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {AgRendererComponent} from 'ag-grid-ng2/main';
import {GridOptions,RowNode} from 'ag-grid/main';
import {GridListener} from './../../ui/grid_listener';
import {HELMRulesGrid} from  './helm_rule_grid.component';
import {ResultTableManager} from './../util/result_table_manager';
import {ResultTableListener} from './../util/result_table_listener';

@Component({
    selector: 'search-helm-rules',
    templateUrl : './app/helm/rules/helm_rules_search.html',
    inputs:["data_source"],
})
export class HELMRulesSearch implements OnInit {
    search_text:string = "";
    search_description="rule id or rule function name";
    data_source:string = "";
    helm_rules_resource:string = "";

    constructor(private _http:Http, private ref:ChangeDetectorRef) {
    }


    ngOnInit():any {
        if ( this.data_source != null && this.data_source.length > 0 ){
            this.helm_rules_resource = this.data_source;
        }
    }


    onSubmit ( event ) : any {
        let value = this.search_text.trim().replace(' ', '');

    }



}
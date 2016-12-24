import {
    OnInit,
    Component,
    ViewChild,
     EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from "@angular/core";
import {AgGridNg2} from 'ag-grid-ng2/main';
import {Http,  Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'unitview',
    inputs: ['mol'],
    template: `
        <div style="padding: 4px;" class="toolbar">
        </div>
    `,
    // directives: [AlertComponent, DATEPICKER_DIRECTIVES, NgModel],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // providers: [HTTP_PROVIDERS]
})
export class UnitView implements OnInit  {

    @ViewChild('modal')
    mol:string;
    errorMessage:string;



    constructor(private _http:Http, private ref:ChangeDetectorRef) {
    }

    hide():void {
        // document.getElementById("myDropdown").classList.toggle("show");
    }

    ngOnInit():any {
        //  this._http.get(this.uri_ref)
        //     .map(this.extract_data)
        //     .catch(this.handleError).subscribe(
        //              json => this.set_data(json),
        //              error =>  this.errorMessage = <any>error);
    }

}
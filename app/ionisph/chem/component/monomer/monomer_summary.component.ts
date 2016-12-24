import {OnInit, Input, Output, Component, ViewChild, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {IonisMonomer} from '../../ionismonomer';
import {MonomerList} from "../../component/monomer_list.component";
import {MonomerLoader} from "../../services/monomerloader";
// import {MonomerSaver} from "../../services/monomer_saver";
import {MonomerDB} from "../../lib/monomer_db";
// import {Ketcher2Component} from "../component/ketcher.2.component";
// import {MonomerManager} from "../../component/monomer_manager.component";
// import {ApplicationControls} from "../../lib/application_control_manager";
// import {AppListener} from "../../lib/app_listener";
import {Hit} from "../../lib/hit";

@Component({
    selector: 'monomer-summary',
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `---`,
    providers: [MonomerLoader]
    , 
    inputs: ['currentMonomer']
})
export class MonomerSummary implements OnInit {
    monomer_db:MonomerDB;
    currentMonomer:IonisMonomer;

    constructor(private monomer_loader:MonomerLoader, private ref:ChangeDetectorRef) {
    }

    ngOnInit():any {
    }


    setMonomerDatabase(mdb:MonomerDB):void {
        this.monomer_db = mdb;
        }


}
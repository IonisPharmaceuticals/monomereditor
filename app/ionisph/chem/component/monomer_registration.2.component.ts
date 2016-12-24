import {Inject, OnInit, Input, Output, Component, ViewChild, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
import {NgIf, NgFor} from '@angular/common';

import {SearchBox} from "../../../ui/search.component";
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {IonisMonomer} from '../ionismonomer';
import {JSDrawDirective} from "../directives/jsdraw.directive";
import {MonomerList} from "../component/monomer_list.component";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerSaver} from "../services/monomer_saver";
import {MonomerDB} from "../lib/monomer_db";
import {Ketcher2Component} from "./ketcher.2.component";
import {IMonomer} from "../imonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {MonomerEditor} from "../component/monomer_editor.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {NewMonomer} from "./newmonomer.component";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {Hit} from "../lib/hit";
import {RegisterMonomerEditor} from "./register_monomer_editor.component";

@Component({
    selector: 'monomer2-registration',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app/ionisph/chem/component/templates/monomer_registration2.html',
    // directives: [SearchBox, Ketcher2Component, MonomerList, MonomerEditor, NewMonomer, RegisterMonomerEditor],
    providers: [MonomerLoader, ApplicationControls]
})
export class MonomerRegistration2Component implements OnInit, AppListener, MonomerManagerListener {
    monomer_db:MonomerDB;
    currentMonomer:IonisMonomer;
    monomer_manager:MonomerManager;
    appman:ApplicationControls;

    constructor(private monomer_loader:MonomerLoader, private monomer_saver:MonomerSaver, private ref:ChangeDetectorRef,  @Inject(Http) http:Http ) {
        this.appman = new ApplicationControls();
        this.monomer_manager = new MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
        this.currentMonomer = this.monomer_manager.createNewMonomer();
        this.monomer_manager.setSelectedMonomer(this.currentMonomer);
        var intervalId = setInterval(() => {
            if (this.monomer_db) {
                clearInterval(intervalId);
            }
            //if (this.update_data) {
            this.ref.markForCheck();
            //this.update_data = false;
            //}
        }, 1000);
        this.monomer_loader.getMonomers().subscribe(monomers => this.setMonomerDatabase(monomers));

    }

    ngOnInit():any {
        if (this.appman != undefined) {
            this.appman.addListener(this);
        }

    }


    setMonomerDatabase(mdb:IonisMonomer[]):void {
        this.monomer_db.monomers = mdb;
        this.monomer_manager.setMonomer_db(this.monomer_db);
        this.ref.markForCheck();

    }


    public newMonomer():void {

        this.currentMonomer = this.monomer_manager.createNewMonomer();
        this.monomer_manager.setSelectedMonomer(this.currentMonomer);

        console.log(" we have  a new monomer ");
    }


    updateSelectedStructure ( ionisMon : IonisMonomer, msg:string ) : void{
        this.currentMonomer=ionisMon;

    }
    updateSelectedSubstructureList ( substructureList:Hit[] ) : void{}


}
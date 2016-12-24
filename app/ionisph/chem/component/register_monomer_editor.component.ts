/**
 * Created by jmilton on 6/2/2016.
 */

import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import { OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {MonomerDB} from '../lib/monomer_db';
import {MonomerSaver} from '../services/monomer_saver';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ActionObserver} from "../../../ui/action_observer";
import {RegisterMonomer} from "../services/register_monomer";
import {IAttachment} from "../iattachment";


@Component({
    selector: 'register-monomer-editor',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
    inputs: ['monomer_db', 'monomer_manager', 'app_control'],
    template: `
  <div *ngIf="monomer_manager.selectedMonomer" class='panel panel-heading' style="color: darkblue; padding: 2px;">
                        <form class="form-inline" role="form">
                              <div class="form-group">
                                        <label for="m_id">ID</label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.alternateId" class="form-control" id="m_id" type="text">
                                        <label for="m_name"> Name </label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.name" class="form-control" id="m_name" type="text">
                                        <!--<label for="m_smiles"> SMILES </label>-->
                                        <!--<input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.canSMILES" class="form-control" id="m_smiles" type="text">-->
                                        <br>
                                        
                                        <label for="m_monomer_type"> Monomer Type</label>
                                        <select class="form-control" type="input" [(ngModel)]="monomer_manager.selectedMonomer.monomer.monomerType"  #mid>
                                              <option value="backbone">Backbone </option>
                                              <option value="branch" >Branch</option>
                                        </select>
                                        
                                        <label for="m_polymer_type"> Polymer Type</label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.polymerType" class="form-control" id="m_polymer_type" type="text">
                                        <br>
                                        <label for="m_natural_analog"> Natural Analog </label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.naturalAnalog" class="form-control" id="m_natural_analog" type="text">
                                        <label for="focusedInput">Public status</label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.ispublic" class="form-control" id="focusedInput" type="text">
                                        <br>
                                        <b> Default Monomer Attachment Chemistry </b>
                                        
                                        <label for="focusedInput">R1</label>
                                        <input #mid [(ngModel)]="attachement1" class="form-control" id="focusedInput" type="text">
                                        <label for="focusedInput">R2</label>
                                        <input #mid [(ngModel)]="attachment2" class="form-control" id="focusedInput" type="text">
                                        <label for="focusedInput">R3</label>
                                        <input #mid [(ngModel)]="attachment3" class="form-control" id="focusedInput" type="text">
                                        
                              </div>
                        </form>
                        <!--<button type="button" (click)="newMonomer()" class="btn btn-secondary">New</button>-->
                        <button type="button" (click)="saveSelectedMonomer(modal)" class="btn btn-secondary">Register</button>
                        <button type="button" (click)="registerLegacy(legacy_modal)" class="btn btn-secondary">Register (legacy db)</button>


                        <modal #modal>
                            <modal-header [show-close]="true">
                                <h4 class="modal-title"></h4>
                            </modal-header>
                            <modal-body>
                                Saved.
                            </modal-body>
                            <!--<modal-footer [show-default-buttons]="true"></modal-footer>-->
                        </modal>
                        <modal #legacy_modal>
                            <modal-header [show-close]="true">
                                <h4 class="modal-title"></h4>
                            </modal-header>
                            <modal-body>
                            
                            
                                <form class="form-inline" role="form">
                                  <div class="form-group">
                                            <label for="m_name"> Name </label>
                                            <input #mid [(ngModel)]="legacy_name" class="form-control" id="m_name" type="text">
                                            <label for="m_monomer_type"> Monomer Type</label>
                                            <select class="form-control" type="input" [(ngModel)]="legacy_type"  #mid>
                                                  <option value="backbone">Endcap </option>
                                                  <option value="branch" > Sugar </option>
                                                  <option value="branch" > Linker </option>
                                            </select>
                        <button type="button" (click)="commitLegacy(legacy_modal)" class="btn btn-secondary">Commit </button>
                        <button type="button" (click)="cancelLegacy(legacy_modal)" class="btn btn-secondary"> Cancel </button>
                                  </div>
                                </form>

                            
                            
                            
                            
                            </modal-body>
                            <!--<modal-footer [show-default-buttons]="true"></modal-footer>-->
                        </modal>


</div>

    `,
    // directives: [MonomerManager, MODAL_DIRECTIVES],
    providers: [ MonomerSaver, RegisterMonomer]

})
export class RegisterMonomerEditor implements OnInit, AppListener, ActionObserver {
    monomer_manager:MonomerManager;
    monomer_db:MonomerDB;
    app_control:ApplicationControls;
    @ViewChild('modal')
    modal:ModalComponent;
    @ViewChild('legacy_modal')
    legacy_modal:ModalComponent;

    attachment1:string;
    attachment2:string;
    attachment3:string;

    legacy_type:string;
    legacy_name:string;
    molfile:string;
    molecular_weight:number;
    molecular_formula:string;
    conjugation_id:number;



    constructor(private register_monomer:RegisterMonomer) {
    }

    ngOnInit():any {
        if (this.app_control != null) {
            this.app_control.addListener(this);
        }

    }


    registerLegacy (model:any) : void {
        this.legacy_modal.open();
        this.molfile=this.monomer_manager.getMolfileForCurrentStructure();
        
        

    }

    commitLegacy(model:any) : void {
        this.legacy_modal.close();

        this.register_monomer.submitToLegacyDB(this.legacy_type, this.molfile, "jmilton", this.legacy_name, this.molecular_weight, this.molecular_formula, this.conjugation_id);


    }
    cancelLegacy(model:any) : void {
        this.legacy_modal.close();


    }

    buildAttachmentList() : IAttachment[]{

        var ab : IAttachment[] = [];
        ab.push( new IAttachment ( "R1-"+this.attachment1) );
        ab.push( new IAttachment( "R2-"+this.attachment2 ));
        ab.push( new IAttachment( "R3-"+this.attachment3 ));
        return ab;
    }

    saveSelectedMonomer(model:any):void {
        this.monomer_manager.selectedMonomer.monomer.attachmentList=this.buildAttachmentList ( );
        this.monomer_manager.selectedMonomer.monomer.molfile=this.monomer_manager.getMolfileForCurrentStructure();

        if ( this.monomer_manager.selectedMonomer.monomer.molfile == null || this.monomer_manager.selectedMonomer.monomer.molfile.length <= 0 ) {
            alert("Structure was not found ");
            return;
        }

        this.modal.open();
        this.monomer_manager.selectedMonomer.monomer.canSMILES=this.monomer_manager.getViewerSmiles();
        this.register_monomer.submitAsFORM(this.monomer_manager.selectedMonomer, this);
        this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
    }

    action_successful():void {
        if (this.modal) {
            this.modal.close();
            this.modal.visible = false;
        }
    }

    action_failed():void {
        this.modal.close();
    }


    deleteMonomer():void {


    }

    newMonomer():void {

        console.log(" reset this panel ");


    }
}

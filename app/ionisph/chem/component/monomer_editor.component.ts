/**
 * Created by jmilton on 6/2/2016.
 */

import {Http, Response} from '@angular/http';
import {NgIf, NgFor} from '@angular/common';
import {OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild} from '@angular/core';
import {MonomerDB} from '../lib/monomer_db';
import {MonomerSaver} from '../services/monomer_saver';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ActionObserver} from "../../../ui/action_observer";
import {IAttachment } from "../../chem/iattachment";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {StructureClashListener} from "../lib/structure_clash_listener";
import {Hit} from "../lib/hit";

@Component({
    selector: 'monomer-editor',
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-editor.css'],
    inputs: ['monomer_db', 'monomer_manager', 'app_control'],
    
    template: `

  <div *ngIf="monomer_manager.selectedMonomer" class='panel panel-heading' style="color: darkblue; padding: 2px;">


                        <form class="form-inline" role="form">
                              <div class="form-group form-group-sm">

                                        <label *ngIf='monomer_manager.selectedMonomer.monomerid'> ( {{monomer_manager?.selectedMonomer?.monomerid}} ) </label> > 
                                        <label for="m_id">HELM ID </label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.alternateId" name="monomer_alternateid" class="form-control" id="m_id" type="text">
                                        <label for="m_name"> Name </label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.name" name="monomer_name" class="form-control" id="m_name" type="text" style="width=300px">
                                        <hr>
                                        <label class="radio-inline"><input type="radio" name="optradio" [checked]="is_monomer_type('Backbone')" (click)="set_monomer_type('Backbone')">Backbone (e.g. sugar, linker)</label>
                                        <label class="radio-inline"><input type="radio" name="optradio" [checked]="is_monomer_type('Branch')" (click)="set_monomer_type('Branch')" > Branch (e.g. base)</label>
                                        <label class="radio-inline"><input type="radio" name="optradio" [checked]="is_monomer_type('Undefined')" (click)="set_monomer_type('Undefined')" > Undefined (e.g. CHEM polymers, endcaps)</label>
                                        <hr>                                        
                                        <label class="radio-inline"><input type="radio" name="POLYradio"  [checked]="is_polymer_type('RNA')" (click)="set_polymer_type('RNA')">RNA (e.g. sugar, linker)</label>
                                        <label class="radio-inline"><input type="radio" name="POLYradio"  [checked]="is_polymer_type('CHEM')"  (click)="set_polymer_type('CHEM')" > CHEM (e.g. endcap, other chemical conjugates)</label>
                                        <label class="radio-inline"><input type="radio" name="POLYradio"  [checked]="is_polymer_type('PEPTIDE')"  
                                        (click)="set_polymer_type('CHEM')" > PEPTIDE </label>
                                        <hr>
                                        <label for="m_natural_analog"> Natural Analog </label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.monomer.naturalAnalog" name="monomer_natural_analog" class="form-control" id="m_natural_analog" type="text">
                                        <hr>
                                        
                                        <label for="focusedInput">Public status</label>
                                        <input #mid [(ngModel)]="monomer_manager.selectedMonomer.ispublic" name="is_public" class="form-control" id="focusedInput" type="text">
                                        <br>
                                        
                                        
                                        
                                         <hr>
                                         
                                         <p>
                                            <b>R-group default attachments:</b>
                                         </p>
                                         <br>

                                        <label for="het_id">R1 attachment</label>
                                        <input #mid [(ngModel)]="attachment1" class="form-control" name="attachment_id_1" id="attachement_point_id1" type="text">
                                        <br>
                                        <label for="het_id">R2 attachment</label>
                                        <input #mid [(ngModel)]="attachment2" class="form-control" name="attachment_id_2" id="attachement_point_id2" type="text">
                                        <br>
                                        <label for="het_id">R3 attachment</label>
                                        <input #mid [(ngModel)]="attachment3" class="form-control" name="attachment_id_3" id="attachement_point_id3" type="text">
                                        <hr>
                                        <label for="primary_citation_label">Primary Citation</label>
                                        <br>
                                        <textarea #mid class="form-control" name="citation_text" rows="5"  cols="100" [(ngModel)]="monomer_manager.selectedMonomer.monomer.primary_citation" type="textarea">
                                        </textarea>
                                        <hr>

                              </div>
                        </form>

                    <div class="btn-toolbar" role="toolbar" aria-label="...">
                        <button type="button" (click)="verify_is_unique()" class="btn btn-secondary">Test structure uniqueness</button>
                        <button type="button" (click)="saveSelectedMonomer(modal)" class="btn btn-secondary">Save</button>
                        <button type="button" class="btn btn-default btn-sm" (click)="save_as_prompt()">
                            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true" ></span>
                             Save as new monomer
                        </button>
                    </div>

                        
                        {{ msg }}
                        <br>
                        {{ canonical_smiles_hits }}
                        <br>
                        {{ morgan_fp_hits }}



<modal #modal item-width="'250px'">
      <modal-body>

        Are you sure you want to save this as a <b>new</b> monomer?

                        <button type="button" class="btn btn-default btn-sm" (click)="save_as()">
                            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true" ></span>
                            Yes
                        </button>
                        <button type="button" class="btn btn-default btn-sm" (click)="cancel_save()">
                            Cancel
                        </button>


      </modal-body>
</modal>
      
      





                        

</div>

    `,
    providers: [MonomerSaver],
    encapsulation: ViewEncapsulation.None

})
export class MonomerEditor implements OnInit, AppListener, ActionObserver, MonomerManagerListener, StructureClashListener{
    monomer_manager:MonomerManager;
    monomer_db:MonomerDB;
    app_control:ApplicationControls;
    msg:string = "";
    attachment1:string;
    attachment2:string;
    attachment3:string;
    @ViewChild('modal')
    modal:ModalComponent;
    smiles_hits:Array<Hit> = new Array<Hit> ();
    canonical_smiles_hits:string = "";
    morgan_fp_hits:string = "";




    constructor(private save_mon:MonomerSaver) {
    }

    structures_found  (hits:Hit[]) : void {
        this.smiles_hits = new Array<Hit> ();
        if ( hits.length > 0 ){
            for ( let h of hits ){
                if ( h.hit_type == 'canonical_smiles'){
                    this.canonical_smiles_hits += " " + h.symbol + " ";
                }else if ( h.hit_type == 'topology'){
                        this.msg += " " + h.symbol + " ";
                }else if ( h.hit_type == 'morgan_fingerprint'){
                        this.morgan_fp_hits += " " + h.symbol + " ";
                }
            }
        }
        else{
            this.msg = "This is a unique structure.";
        }


    }



    ngOnInit():any {
        if (this.app_control != null) {
            this.app_control.addListener(this);
        }

        if ( this.monomer_manager != null )
        {
            this.monomer_manager.addListener(this)
            this.monomer_manager.addStructureClashListener ( this );
        }


        // this sucks nned to change but time is kickin my butt right now 
        if ( this.monomer_manager.selectedMonomer != null && this.monomer_manager.selectedMonomer.monomer != null )
        {
            let alist = this.monomer_manager.selectedMonomer.monomer.attachmentList;
            for (let a=0; a<alist.length; a++){
                if ( a == 0 ){
                    this.attachment1 = alist[0].capGroupName;
                }
                if ( a == 1 ){
                    this.attachment2 = alist[1].capGroupName;
                }
                if ( a == 2 ){
                    this.attachment3= alist[2].capGroupName;
                }

            }
        }
    }
    
    is_monomer_type ( v:string ) : boolean {

        if ( v == this.monomer_manager.selectedMonomer.monomer.monomerType )
            {
                return true;
            }
            else{
                return false;
            }

    }
    
    is_polymer_type ( v:string ) : boolean {

        if ( v == this.monomer_manager.selectedMonomer.monomer.polymerType )
            {
                return true;
            }
            else{
                return false;
            }

    }

    updateSelectedStructure ( ionisMon : IonisMonomer, msg:string ) : void {
        this.msg = msg;
        this.canonical_smiles_hits="";
        this.morgan_fp_hits = "";
        this.update_attachment_text();

    }
    updateSelectedSubstructureList ( substructureList:Hit[] ): void {
    }


    /**
     *  not proud of this method. but time is not on my side. 
     */
    update_attachment_text(){
        this.attachment1 = '';
        this.attachment2 = '';
        this.attachment3 = '';
        



         if (this.monomer_manager.selectedMonomer==null || this.monomer_manager.selectedMonomer.monomer.attachmentList == undefined)
             return;
        var i:number = 0;
        for (let i=0; i<this.monomer_manager.selectedMonomer.monomer.attachmentList.length; i++){
            var val:IAttachment = this.monomer_manager.selectedMonomer.monomer.attachmentList[i];
            if (i==0){
                this.attachment1 = val.capGroupName;
            }
            else if ( i == 1 ){
                this.attachment2 = val.capGroupName;
            }else if ( i == 2 ){
                this.attachment3 = val.capGroupName;
            }

        }
    }



    set_polymer_type (type:string):void {
        this.monomer_manager.selectedMonomer.monomer.polymerType=type
    }

    set_monomer_type(type:string):void {
        this.monomer_manager.selectedMonomer.monomer.monomerType=type
        // this.saveSelectedMonomer( this.modal );
    }


    saveSelectedMonomer(model:any):void {
        this.msg = "Saving...";
        this.canonical_smiles_hits="";
        this.morgan_fp_hits = "";
        let at1 = new IAttachment ("R1-"+this.attachment1)

        let at2 = new IAttachment ("R2-"+this.attachment2)
        let at3 = new IAttachment ("R3-"+this.attachment3)
        this.monomer_manager.selectedMonomer.monomer.attachmentList = [];

        if ( this.attachment1 != null && this.attachment1.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R1-" + this.attachment1 ) ) );
        }
        if ( this.attachment2 != null && this.attachment2.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R2-" + this.attachment2 ) ) );
        }
        if ( this.attachment3 != null && this.attachment3.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R3-" + this.attachment3 ) ) );
        }


        this.monomer_manager.saveCurrentStructure();
    }

    action_successful(monomer:IonisMonomer, msg:string):void {
        this.monomer_manager.setSelectedMonomer(monomer);
        this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
     

         if (this.monomer_manager.selectedMonomer==null || this.monomer_manager.selectedMonomer.monomer.attachmentList == undefined)
             return;
        var i:number = 0;
        for (let i=0; i<this.monomer_manager.selectedMonomer.monomer.attachmentList.length; i++){
            var val:IAttachment = this.monomer_manager.selectedMonomer.monomer.attachmentList[i];
            if (i==0){
                this.attachment1 = val.capGroupName;
            }
            else if ( i == 1 ){
                this.attachment2 = val.capGroupName;
            }else if ( i == 2 ){
                this.attachment3 = val.capGroupName;
            }

        }
    }

    action_failed(monomer:IonisMonomer):void {
        // this.modal.close();
    }


    deleteMonomer():void {


    }

    newMonomer():void {

        console.log(" reset this panel ");


    }

    save_as():void {
        this.modal.close ();
        this.canonical_smiles_hits="";
        this.morgan_fp_hits = "";
        this.msg = "Saving new monomer...";
        let at1 = new IAttachment ("R1-"+this.attachment1)
        let at2 = new IAttachment ("R2-"+this.attachment2)
        let at3 = new IAttachment ("R3-"+this.attachment3)
        this.monomer_manager.selectedMonomer.monomer.attachmentList = [];
        this.monomer_manager.selectedMonomer.monomerid=null;
        if ( this.attachment1 != null && this.attachment1.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R1-" + this.attachment1 ) ) );
        }
        if ( this.attachment2 != null && this.attachment2.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R2-" + this.attachment2 ) ) );
        }
        if ( this.attachment3 != null && this.attachment3.length > 0) {
            this.monomer_manager.selectedMonomer.monomer.attachmentList.push ( new IAttachment ( ("R3-" + this.attachment3 ) ) );
        }
        this.monomer_manager.saveCurrentStructure();
    
}
    verify_is_unique () : void {
        this.msg = "Hits based on topology: ";
        this.canonical_smiles_hits = "Hits based on canonical smiles:  ";
        this.morgan_fp_hits = "Hits based on Morgan Fingerprint: ";
        this.monomer_manager.check_topology_uniqueness ();
        this.monomer_manager.check_morgan_topology_uniqueness ();
        this.monomer_manager.check_canonical_smiles_uniqueness ();

    }


    register_in_legacy_bird( modal:any):void{
        // this.modal.open('lg');
        this.monomer_manager.saveLegacyStructure();

    }

    cancel_save () : void {
        this.modal.close ();
    }
    save_as_prompt( ) : void {
        this.modal.animation = false;
        this.modal.open ( 'lg');


    }


    create_new_monomer ( ) : void {
        this.monomer_manager.setSelectedMonomer ( this.monomer_manager.createNewMonomer() );   
    }
}

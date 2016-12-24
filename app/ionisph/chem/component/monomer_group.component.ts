/**
 * Created by jmilton on 5/31/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerFilter} from "../pipes/monomer_filter";
import {MonomerNameFilter} from "../pipes/monomer_name_filter";
import {IsPublicFilter} from "../pipes/ispublic";
import {MonomerSaver} from "../services/monomer_saver";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
import {Hit} from "../lib/hit";
import {Subscription, Observable} from "rxjs/Rx";

@Component({
    selector: 'monomer-group',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'polymer_type', 'searchTerm', 'ispublic', 'canDelete', 'display', 'nameSearchTerm'],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `

         <div *ngIf="display=='symbol'"class='tabContainer' style="width: 90%;">
                      <ul>  
                       <li *ngFor='let monomer of monomer_db?.getMonomers(polymer_type, monomer_type) | ispublic_filter : ispublic | monomer_filter : searchTerm ; let i=index'>
                            <div class="btn btn-secondary-outline btn-xs" id={{i}} type="input" (click)="loadAndSelect(monomer)" #inputfield> ({{ monomer.monomerid }})
                            {{monomer.monomer.alternateId }}
                                <img *ngIf="monomer.ispublic" src="app/img/check.png" (click)='togglePublic(monomer)'/>
                                <img *ngIf="monomer.ispublic == false" src="app/img/locked.png" (click)='togglePublic(monomer)'/>
                                <img *ngIf="canDelete" src="app/img/delete.png" (click)='removeMonomer(monomer)'/> 
                                
                            </div>

                       </li>
                      </ul>
          </div>
         <div *ngIf="display=='name'" class='tabContainer' style="width: 90%;">
                      <ul>  
                       <li *ngFor='let monomer of monomer_db?.getMonomers(polymer_type, monomer_type) | ispublic_filter : ispublic | monomer_filter : searchTerm | monomer_name_filter : nameSearchTerm ; let i=index'>
                            <div class="btn btn-secondary-outline btn-xs" id={{i}} type="input" (click)="loadAndSelect(monomer)" #inputfield> ({{ monomer.monomerid }})
                            {{monomer.monomer.name }}, (<font color="BLUE">{{monomer.monomer.alternateId }}</font> )
                                <img *ngIf="monomer.ispublic" src="app/img/check.png" (click)='togglePublic(monomer)'/>
                                <img *ngIf="monomer.ispublic == false" src="app/img/locked.png" (click)='togglePublic(monomer)'/>
                                <img *ngIf="canDelete" src="app/img/delete.png" (click)='removeMonomer(monomer)'/> 
                            </div>

                       </li>
                      </ul>
          </div>
          
          <div>
        <modal #modal>
        <modal-header [show-close]="true">
        <h4 class="modal-title"></h4>
        </modal-header>
        <modal-body>
            <button type="button" (click)="delete(modal)" class="btn btn-secondary">Delete?</button>
            <button type="button" (click)="cancelModal(modal)" class="btn btn-secondary">Cancel</button>
        </modal-body>
        <!--<modal-footer [show-default-buttons]="true"></modal-footer>-->
        </modal>


        <modal #make_public>
        <modal-header [show-close]="true">
        <h4 class="modal-title"></h4>
        </modal-header>
        <modal-body>
            <button type="button" (click)="makeMonomerPublic(make_public)" class="btn btn-secondary">Make this structure public?</button>
            <button type="button" (click)="cancelPubToggle(make_public)" class="btn btn-secondary">Cancel</button>
        </modal-body>
        <!--<modal-footer [show-default-buttons]="true"></modal-footer>-->
        </modal>

        </div>

          
          
    `,
    // directives: [MODAL_DIRECTIVES],
    // pipes: [MonomerFilter, IsPublicFilter],
    providers: [ MonomerDB, MonomerLoader, MonomerSaver]
})
export class MonomerGroup implements OnInit, MonomerManagerListener {
    monomer_db:MonomerDB;
    monomer_manager:MonomerManager;
    monomer_type:string;
    polymer_type:string;
    searchTerm:string = "";
    nameSearchTerm:string = "";
    ispublic:string = "*";
    canDelete:boolean = false;
    @Input('name')
    display:string = "name";

    @ViewChild('modal')
    modal:ModalComponent;
    @ViewChild('make_public')
    public_modal:ModalComponent;


    selectedMonomer:IonisMonomer;

    constructor(private monomer_loader:MonomerLoader, private monomer_writer:MonomerSaver, private ref:ChangeDetectorRef) {
    }

    ngOnInit():any {
        if (this.monomer_manager != null) {
            this.monomer_manager.addListener(this);
        }

    }


    updateSelectedStructure(ionisMon:IonisMonomer, msg:string):void {
    }

    updateSelectedSubstructureList(substructureList:Hit[]):void {
    }


    public togglePublic(monomer:IonisMonomer):void {
        if ( monomer.ispublic==false) {
            this.selectedMonomer = monomer;
            this.public_modal.open();
        }else {
            monomer.ispublic = (!monomer.ispublic);
            this.loadstructure(monomer).subscribe(mon => this.saveMonomer(this.togglePublicOnMonomer(mon)));
        }
    }

    public makeMonomerPublic (modal:ModalComponent):void {
        this.public_modal.close();
        this.selectedMonomer.ispublic=true;
        this.loadstructure(this.selectedMonomer).subscribe(mon => this.saveMonomer(this.togglePublicOnMonomer(mon)));
    }
    public cancelPubToggle() : void
    {
        this.public_modal.close ();

    }

    public togglePublicOnMonomer(monomer:IonisMonomer):IonisMonomer {
        this.selectedMonomer = monomer;
        this.selectedMonomer.ispublic = (!this.selectedMonomer.ispublic);
        return this.selectedMonomer;
    }

    public saveMonomer(monomer:IonisMonomer):IonisMonomer {
        console.log(' saving the monomer ' + monomer.ispublic);
        // this.monomer_writer.saveMonomer(monomer, this.monomer_manager);
        this.ref.markForCheck();
        return monomer;
    }

    public loadstructure(value:IonisMonomer):Observable<IonisMonomer> {
        return this.monomer_loader.getMonomer(+value.monomerid);
    }

    public loadAndSelect(value:IonisMonomer):void {
        this.monomer_loader.getMonomer(+value.monomerid).subscribe(mon => this.monomer_manager.setSelectedMonomer(mon));
    }

    public  listMonomers(mon, monomer_type):Array<IonisMonomer> {
        var ion:Array<IonisMonomer> = new Array<IonisMonomer>();
        var index = 0;
        for (var propName in mon) {
            var i:IonisMonomer = mon[propName]

            if (monomer_type == 'any') {
                ion.push(i);
            } else {
                var n:Array<number> = this.getids(i, monomer_type);
                if (n && n.length > 0) {
                    ion.push(i);
                }
            }
        }
        return ion;
    }

    public getids(m:IonisMonomer, type:string):Array<number> {
        var vals:Array<number> = new Array<number>();
        var idstr:string;
        if (type == 'Endcaps') {
            if (!m.endcapID) {
                return vals;
            }
            if (m.endcapID == '-') {
                return vals;
            }
            idstr = m.endcapID;
        } else if (type == 'Linkers') {
            if (!m.linkerId) {
                return vals;
            }
            if (m.linkerId == '-') {
                return vals;
            }
            idstr = m.linkerId;
        } else if (type == 'Bases') {
            if (!m.het_id) {
                return vals;
            }
            if (m.het_id == '-') {
                return vals;
            }
            idstr = m.het_id;
        } else if (type == 'Sugars') {
            if (!m.sugarId) {
                return vals;
            }
            if (m.sugarId == '-') {
                return vals;
            }
            idstr = m.sugarId;
        }
        var sp:string[] = idstr.split(',');
        for (var s in sp) {
            var i:number = Number.parseInt(s);
            vals.push(i);
        }
        return vals;
    }

    removeMonomer():void {
        this.modal.open();
        this.modal.visible = true;
    }


    cancelModal(model:any):void {
        this.modal.close();
    }


    delete(model:any):void {
        this.modal.visible = false;
        this.modal.close();

    }


}

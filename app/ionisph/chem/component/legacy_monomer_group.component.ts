/**
 * Created by jmilton on 5/31/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Http, Response} from '@angular/http';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {IonisMonomer} from "../ionismonomer";
import {MonomerManager} from "../component/monomer_manager.component";
import {MonomerLoader} from "../services/monomerloader";
import {LegacyIDFilter} from "../pipes/legacy_id_filter";
import {LegacySearchMonomers} from "../component/util/legacy_search_monomer.component";

@Component({
    selector: 'legacy-monomer-group',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'id_type', 'id_value'],
    template: `

         <legacy-search-monomers (id_type)="updateType($event)" (id_value)="updateValue($event)"> </legacy-search-monomers>
         <div *ngIf="monomers" class='tabContainer'>
                      <ul>
                       <li *ngFor='let monomer of monomers | legacy_id_filter: [id_type,id_value]; let i=index'>
                            <!--<input type="text" #input>-->
                            <div class="btn btn-secondary-outline btn-xs" id={{i}} type="input" (click)="loadstructure(input, $event)" #input> ({{ monomer.monomerid }})
                            {{monomer.monomer.alternateId }}
                                <img *ngIf="monomer.ispublic" src="app/img/check.png"/>
                            </div>
                       </li>
                      </ul>
          </div>
    `,
    // directives: [ROUTER_DIRECTIVES, LegacySearchMonomers],
    // pipes: [LegacyIDFilter],
    providers: [ MonomerDB, MonomerLoader]
})
export class LegacyMonomerGroup implements OnInit {
    monomer_db:MonomerDB;
    monomer_manager:MonomerManager;
    monomers:IonisMonomer[];
    monomer_type:string = "Endcaps";
    id_type:string = "Endcap";
    id_value:string;


    constructor ( private monomer_loader: MonomerLoader, private ref:ChangeDetectorRef) {

    }
    ngOnInit():any {
        if (this.monomer_db != null) {
            this.monomers = this.listMonomers(this.monomer_db, this.monomer_type);
        }
    }
    public loadstructure (input : HTMLDivElement, event) : void
    {
        var st : string = input.innerText;
        st = st.trim();
        st = st.substr(0, st.indexOf(')')+1);
        var sta = st.match(/\(([^)]+)\)/)[1];
        this.monomer_loader.getMonomer(+sta).subscribe(mon => this.monomer_manager.setSelectedMonomer(mon));
    }

    updateValue ( v:any) : void {

        this.id_type = v;
        console.log ( " value " + v);
        this.ref.markForCheck();
    }
    updateType (v:any) : void {

        this.id_value = v;
        console.log ( " value " + v);
        this.ref.markForCheck();



    }


    public  listMonomers(mon, monomer_type):Array<IonisMonomer> {
        var ion:Array<IonisMonomer> = new Array<IonisMonomer>();
        var index = 0;
        for (var propName in mon) {
            var i:IonisMonomer = mon[propName]

            if ( monomer_type == 'any' ){
                ion.push ( i );
            }else {
                var n:Array<number> = this.getids(i, monomer_type);
                if (n && n.length > 0) {
                    ion.push(i);
                }
            }
        }
        return ion;
    }

    public getids (m:IonisMonomer, type:string) : Array<number>
    {
        var vals :Array<number> = new Array<number>();
            var idstr: string;
            if ( type == 'Endcaps') {
                if (!m.endcapID) {
                    return vals;
                }
                if (m.endcapID == '-') {
                    return vals;
                }
                idstr = m.endcapID;
            }else if ( type == 'Linkers'){
                if (!m.linkerId) {
                    return vals;
                }
                if (m.linkerId == '-') {
                    return vals;
                }
                idstr = m.linkerId;
            }else if ( type == 'Bases'){
                if (!m.het_id) {
                    return vals;
                }
                if (m.het_id== '-') {
                    return vals;
                }
                idstr = m.het_id;
            }else if ( type == 'Sugars'){
                if (!m.sugarId) {
                    return vals;
                }
                if (m.sugarId== '-') {
                    return vals;
                }
                idstr = m.sugarId;
            }


        if ( idstr != undefined ) {
            var sp:string[] = idstr.split(',');
            for (var s in sp) {
                var i:number = Number.parseInt(s);
                vals.push(i);
            }
        }
        return vals;
    }

}

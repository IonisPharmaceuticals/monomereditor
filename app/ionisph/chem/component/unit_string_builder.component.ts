/**
 * Created by jmilton on 6/7/2016.
 */
import {Component, Output, Input, EventEmitter} from '@angular/core';
import {MonomerDB} from '../lib/monomer_db';
import {IonisMonomer} from "../ionismonomer";
//.tabContainer {
//    padding: 10px;
//    color: black;
//    font-size: x-small;
//    height: 400px;
//    width: 100%;
//    float: left;
//    overflow: auto;
//    overflow-x:hidden;
//}


@Component({
    selector: 'unit-textbox',
    template: `

            <div  style="padding: 5px; font-size: x-small">
            <input #input type="text" (input)="updateFilter(input.value)"> 
            <!--<img src="app/img/right_arrow.png" (click)="selectMonomer(input.value)"/>-->
            <br>
            </div>
            `,
    outputs: ['update', 'unit_text']
    // directives: [MonomerDB]
})
export class UnitStringManager {
    public update = new EventEmitter();
    public unit_text = new EventEmitter();
    @Input() substructureList:Array<string>;
    @Input() monomer_db:IonisMonomer[];
    

    ngOnInit() {
        this.update.emit('');
    }

    updateFilter(fv:string, v:any):void {
        this.update.emit(fv);
    }

    go(v:any):void {

    }

    selectMonomer(value:string):void {
        if ( this.monomer_db != null )
        {

            for ( var mon of this.monomer_db)
            {
                if ( mon.monomer.alternateId === value )
                {
                    this.unit_text.emit(mon);
                }
            }
        }

    }

}
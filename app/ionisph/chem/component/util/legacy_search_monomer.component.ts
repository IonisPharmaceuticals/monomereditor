/**
 * Created by jmilton on 6/7/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';



@Component ({
    selector: 'legacy-search-monomers',
    template: `
            <div style="padding-top: 5px">

            <select class="form-control" [(ngModel)]="id_type" (change)="updateID(input.value)" #input>
                  <option value="Endcaps">Endcaps </option>
                  <option value="Sugars" >Sugars</option>
                  <option value="Bases">Bases</option>
                  <option value="Linkers">Linkers</option>
            </select>
            ID :  <input #idvalue type="text" (input)="go(idvalue.value)">
            </div>
            `,
    outputs: ['id_type', 'id_value']
})
export class LegacySearchMonomers{
    public id_type = new EventEmitter();
    public id_value = new EventEmitter();

    constructor()
    {

    }

    ngOnInit ()
    {
        this.id_type.emit('');
        this.id_value.emit('');
    }
    updateID ( fv : string, v : any) : void {
        this.id_type.emit ( fv );
        //this.id_value.emit ( v );
    }
    go(v:any) : void {

        this.id_value.emit ( v );

    }


}
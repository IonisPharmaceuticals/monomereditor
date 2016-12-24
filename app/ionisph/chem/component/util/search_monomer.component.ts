/**
 * Created by jmilton on 6/7/2016.
 */
import {Component, Output, Input, EventEmitter} from '@angular/core';

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

            // <input #ispub type="checkbox" (change)="go(ispub.checked)"> Is public
            // removed the ispublic filter 10.21.2016

@Component ({
    selector: 'filter-monomers',
    inputs: ['substructureList', 'title'],
    template: `

            <div  style="padding: 5px; font-size: x-small">
             Symbol: <input #input type="text" (input)="updateFilter(input.value,  ispub.checked)">
             Name: <input #input_name type="text" (input)="updateNameFilter(input_name.value,  ispub.checked)">
            <input #ispub type="checkbox" (change)="go(ispub.checked)"> Is public
            <br>
            </div>
            `,
    outputs: ['update', 'ispublic', 'update_name']
})
export class SearchMonomers{
    public update = new EventEmitter();
    public update_name = new EventEmitter();
    public ispublic = new EventEmitter();
    substructureList:Array<string>;

    ngOnInit ()
    {
        this.update.emit('');
        this.update_name.emit('');
        this.ispublic.emit('');
    }
    updateFilter ( fv : string, v : any) : void {
        this.update.emit ( fv );
        this.ispublic.emit ( v );
    }
    updateNameFilter ( fv : string, v : any) : void {
        this.update_name.emit ( fv );
        this.ispublic.emit ( v );
    }
    go(v:any) : void {

        this.ispublic.emit ( v );

    }




}
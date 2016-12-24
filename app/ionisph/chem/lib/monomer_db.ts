import {IonisMonomer} from "../ionismonomer";
import {IMonomer} from "../imonomer";
import{MonomerLibraryItem} from "../monomerlibraryitem";
import { Injectable } from  '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';


/**
 * Created by jmilton on 5/24/2016.
 */
@Injectable()
export class MonomerDB {

    monomers:IonisMonomer[];





    saveMonomer(_monomer:IonisMonomer) {
        console.log(" saving monomer " + _monomer.monomer.name);
    }

    public getMonomers (polymer_type:string, monomer_type:string) : IonisMonomer[]
    {

        if( polymer_type && monomer_type )
        {
            let mlist = new Array<IonisMonomer> ();
            for ( let m of this.monomers )
            {
                if ( m.monomer.polymerType.toUpperCase() === polymer_type && m.monomer.monomerType.toUpperCase() === monomer_type.toUpperCase())
                {
                    mlist.push ( m );
                }
            }
            return mlist;

        }
       else if (polymer_type){
            let mlist = new Array<IonisMonomer> ();
            for ( let m of this.monomers )
            {
                if ( m.monomer.polymerType.toUpperCase() === polymer_type.toUpperCase())
                {
                    mlist.push ( m );
                }
            }
            return mlist;
        }else{
            return this.monomers;
        }
    }




    public getCount () : number {
        if (this.monomers )
        {
            return this.monomers.length;
        }
        else{
            return 0;
        }
    }


    public getMonomer ( helmid: string) : IonisMonomer {

        for ( var mon of this.monomers )
        {
            if ( mon.monomer.alternateId == helmid )
            {
                return mon;
            }
        }
        return null;

    }

}
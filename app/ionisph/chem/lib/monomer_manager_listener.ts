/**
 * Created by jmilton on 6/1/2016.
 */
import {IonisMonomer} from '../ionismonomer';
import {Hit} from "./hit";


export interface MonomerManagerListener{

    updateSelectedStructure ( ionisMon : IonisMonomer, msg:string ) : void;
    updateSelectedSubstructureList ( substructureList:Hit[] ) : void;
}
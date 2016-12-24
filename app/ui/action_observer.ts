
import {IonisMonomer} from "../ionisph/chem/ionismonomer"

/**
 * Created by jmilton on 6/21/2016.
 */


export interface ActionObserver {

    action_successful (monomer:IonisMonomer, msg:string): void;
    action_failed (monomer:IonisMonomer): void;


}
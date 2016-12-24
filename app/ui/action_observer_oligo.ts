
import {IonisOligo} from "../ionisph/chem/ionisoligo"
import {OligoRegistrationResponse} from "../ionisph/chem/oligoregistrationresponse";
/**
 * Created by jmilton on 6/21/2016.
 */




export interface ActionObserverOligo {

    action_successful (monomer:OligoRegistrationResponse): void;
    action_failed (monomer:IonisOligo): void;


}
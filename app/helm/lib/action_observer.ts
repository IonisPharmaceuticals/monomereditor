

import {RegistrationResponse} from "./registration_response";



export interface ActionObserver {
        action_successful (o:RegistrationResponse): void;

        action_update(msg:string): void;
        action_failed (o): void;


}
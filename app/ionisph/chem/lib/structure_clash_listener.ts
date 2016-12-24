import {Hit} from "./hit";


export interface StructureClashListener {

    structures_found ( hits:Hit[] ) : void
    
}
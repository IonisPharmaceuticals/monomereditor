import {HELMViewer} from '../helm_viewer';

export interface HELMRuleEngine {


    operate ( helm:string, callback:HELMViewer )

}
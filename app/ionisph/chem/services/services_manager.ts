/**
 * Created by jmilton on 6/8/2016.
 */

import { Injectable } from  '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServicesManager {
    //public static monomer_lib_url = 'http://lin107:8081/exp/v1/monomers/all';
    private monomer_lib_url = 'http://localhost:8180/v1/monomers/all';
    //public static  monomer_lib_url_id = 'http://lin107:8081/exp/v1/monomers';
    private monomer_lib_url_id = 'http://localhost:8180/v1/monomers';
    constructor(private _http:Http) {
    }
}

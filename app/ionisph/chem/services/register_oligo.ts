import { Injectable } from  '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonisOligo } from './../../chem/ionisoligo';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {OligoRegistrationResponse} from '../../chem/oligoregistrationresponse';
import {URLs} from "./urls";
import {ActionObserverOligo} from "../../../ui/action_observer_oligo"

@Injectable()
export class RegisterOligo {
    //private monomer_lib_save_url = 'http://localhost:8180/v1/monomers/save';
    ob:ActionObserverOligo;
    oligo:IonisOligo;
    constructor(private _http:Http) {
    }
    submitAsJSON ( oligo:IonisOligo, ob:ActionObserverOligo){
        this.ob = ob;
        this.oligo = oligo;
        var body = JSON.stringify(oligo);

         // .addHeader("content-type", "application/json")
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'Access-Control-Allow-Headers');
        let options = new RequestOptions({ headers: headers });            // headers.append("cache-control", "no-cache")
        console.log ( ' json body ' + body );
        this._http.post(URLs.oligo_registration_legacy, body, options).
         toPromise()
         .then(extract_data)
         .then(response => this.response ( response ))
         .then (response => this.register_in_oligo_library(response, oligo));
    }
 
    register_in_oligo_library ( res, oligo ) : void {
        let vres = <OligoRegistrationResponse>res;
        var jsy = {
            "isisno": +vres.isisno,
            "helm": oligo.helm
        };
        var body = JSON.stringify(jsy);
         // .addHeader("content-type", "application/json")
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'Access-Control-Allow-Headers');
        let options = new RequestOptions({ headers: headers });            // headers.append("cache-control", "no-cache")
        console.log ( ' oligo registra ---  ' + body );
        this._http.post(URLs.oligo_registration, body, options).
         toPromise()
         .then(extract_data)
         .then(response => alert ( ' Registration Complete ' ))
    }



    response ( res ){
        console.log ( res );
        this.ob.action_successful(<OligoRegistrationResponse>res);
        



    }
    logError ( error )
    {
        console.log ( error );
        this.ob.action_failed(this.oligo);
    }
    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        this.ob.action_failed(this.oligo);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


function extract_data (res: Response) : any{
    let body = res.json();
    return body;
}

import { Injectable } from  '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HELMStructure} from './helmstruct';
import {ActionObserver} from './action_observer';
import {RegistrationResponse} from './registration_response';
import {URLs} from '../../ionisph/chem/services/urls';


@Injectable()
export class Register  {
    ob:ActionObserver;
    oligo:HELMStructure;

    constructor(private _http:Http) {
    }
    submitAsJSON ( oligo:HELMStructure, ob:ActionObserver){
        this.ob = ob;
        this.oligo = oligo;
        var body = JSON.stringify(oligo);

         // .addHeader("content-type", "application/json")
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });          
        console.log ( ' json body ' + body );
        this._http.post(URLs.oligo_registration_legacy, body, options).
         toPromise()
         .then(extract_data)
         .then(response => this.response ( response ))
         .then(response => this.register_in_oligo_library ( response, oligo ));
    }
  register_in_oligo_library ( res, oligo:HELMStructure ) : void {
<<<<<<< HEAD



=======
>>>>>>> 010b343396e564df1738fbaf09d6bac3ff26549c
        var jsy = {
            "isisno": ""+res.id,
            "helm": oligo.helm,
            "registered_by":oligo.user
        };
        var body = JSON.stringify(jsy);
         // .addHeader("content-type", "application/json")
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'Access-Control-Allow-Headers');
        let options = new RequestOptions({ headers: headers });            // headers.append("cache-control", "no-cache")
        console.log ( 'Registering Oligo int Oligo_Library  ' + body );
        this._http.post(URLs.oligo_registration, body, options).
         toPromise()
         .then(extract_data)
         .then(response => response ( ' Registration Complete ' ))
    }

    response ( res ){
        console.log ( res );
        this.ob.action_successful(<RegistrationResponse>res);
        return res;
    }
    logError ( error )
    {
        console.log ( error );
        this.ob.action_failed(this.oligo);
    }
    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        this.ob.action_failed(this.oligo);
        return Observable.throw(error.json().error || 'Server error');
    }
}


function extract_data (res: Response) : any{
    let body = res.json();
    return body;
}

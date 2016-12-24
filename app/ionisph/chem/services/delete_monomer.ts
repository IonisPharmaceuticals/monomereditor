/**
 * Created by jmilton on 6/8/2016.
 */
import { Injectable } from  '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonisMonomer } from './../../chem/ionismonomer';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {URLs} from './urls'

@Injectable()
export class MonomerSaver {
    //private monomer_lib_save_url = 'http://localhost:8180/v1/monomers/save';
    constructor(private _http:Http) {
    }

    saveMonomer ( monomer:IonisMonomer){
        var username = 'test'; var password = 'password';
        var body = JSON.stringify(monomer);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //this._http.get(this.monomer_lib_save_url+"?"+body).subscribe(response => console.log ( response ));
        this._http.post(URLs.monomer_lib_save_url, body, {headers:headers}).subscribe(response => console.log ( response ));
        //.post(this.monomer_lib_save_url,
        //    body, {
        //        headers: headers
        //    })
        //.map(response => response.json())
        //.subscribe(
        //    response => this.response(response.id_token),
        //    this.logError,
        //    () => console.log('Authentication Complete')
        //);
        //console.log ( "saving the monomer " + monomer.monomer.alternateId );
    }

    response ( res ){
        console.log ( res );
    }
    logError ( error )
    {
        console.log ( error );
    }



    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
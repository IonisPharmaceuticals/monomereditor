import { Injectable } from  '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonisMonomer } from './../../chem/ionismonomer';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {URLs} from "./urls";
import {ActionObserver} from "../../../ui/action_observer"

@Injectable()
export class MonomerSaver {
    //private monomer_lib_save_url = 'http://localhost:8180/v1/monomers/save';
    ob:ActionObserver;
    currentMonomer:IonisMonomer;

    constructor(private _http:Http) {
    }

    // saveMonomer ( monomer:IonisMonomer, ob:ActionObserver){
    //     this.currentMonomer = monomer;
    //     this.ob = ob;
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     var body = JSON.stringify(monomer);
    //     this._http.post(URLs.monomer_lib_save_url, body, {headers:headers}).subscribe(response => this.response ( response ));
    // }

    updateMonomer (monomer:IonisMonomer, ob:ActionObserver){
        this.ob = ob;
        this.currentMonomer = monomer;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(monomer);
        this._http.post(URLs.monomer_lib_save_url, body, {headers:headers})
        // .do(data => console.log('All: ' + JSON.stringify(data)))
        .subscribe(response => this.response ( response ));
    }

    save_legacy_monomer (monomer:IonisMonomer, ob:ActionObserver){
        this.ob = ob;
        this.currentMonomer = monomer;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'Access-Control-Allow-Headers');
        var body = JSON.stringify(monomer);
        this._http.post(URLs.monomer_registration_legacy, body, {headers:headers}).
        // do(data => console.log('All: ' + JSON.stringify(data))).
        subscribe(response => this.response ( response ));
    }
    

    response ( res ){
        console.log ( res );
        let msg = res['_body'];
        var msgv = JSON.parse( msg );
        // alert ( msgv['msg'] );
        if ( 'msg' in msgv ){
            this.ob.action_successful(this.currentMonomer, msgv['msg']);
        }
        else{
            this.ob.action_successful(this.currentMonomer, msg);
        }
    }
    logError ( error )
    {
        console.log ( error );
        this.ob.action_failed(this.currentMonomer);
    }



    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        this.ob.action_failed(this.currentMonomer);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
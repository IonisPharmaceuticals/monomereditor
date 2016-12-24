import { Injectable } from  '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonisMonomer } from './../../chem/ionismonomer';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {URLs} from "./urls";
import {ActionObserver} from "../../../ui/action_observer"

@Injectable()
export class RegisterMonomer {
    //private monomer_lib_save_url = 'http://localhost:8180/v1/monomers/save';
    ob:ActionObserver;
    monomer:IonisMonomer;
    constructor(private _http:Http) {
    }
    submitAsJSON ( monomer:IonisMonomer, ob:ActionObserver){
        this.ob = ob;
        this.monomer = monomer;
        var username = 'test'; var password = 'password';
        var body = JSON.stringify(monomer);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post(URLs.monomer_registration, body, {headers:headers}).subscribe(response => this.response ( response ));
    }
    submitToLegacyDB( type:string, molfile:string, user:string, name:string, molecular_weight:number, molecular_formula:string, conjugate_id:number){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = "type="+type + "&molfile="+molfile + "&user=" + user + "&name="+name + "&molecular_formula="+ molecular_formula + "&conjugate_id="+conjugate_id + "&molecular_weight="+molecular_weight

        this._http.post(URLs.monomer_chemistry_info, body, {headers:headers}).subscribe(response => this.response ( response ));
    }


    submitAsFORM ( monomer:IonisMonomer, ob:ActionObserver){
        this.ob = ob;
        this.monomer = monomer;
        var username = 'test'; var password = 'password';
        // var body = JSON.stringify(monomer);

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(monomer);

        this._http.post(URLs.monomer_registration, body, {headers:headers}).subscribe(response => this.response ( response ));
    }



    response ( res ){
        console.log ( res );

        let msg = '';
        let body = res['_body'];
        if( body != null && body.length > 0 )
        {
            try {
                var msgv = JSON.parse ( body );
                if ( msgv != null )
                {
                    msg = msgv['msg'];
                }
                
            }catch ( ec ){}
        }
        this.ob.action_successful(this.monomer, msg);
    }
    logError ( error )
    {
        console.log ( error );
        this.ob.action_failed(this.monomer);
    }
    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        this.ob.action_failed(this.monomer);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
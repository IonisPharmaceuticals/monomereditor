import { Injectable } from  '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonisMonomer } from './../../chem/ionismonomer';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {URLs} from "./urls";

@Injectable()
export class MonomerLoader {

    constructor(private _http:Http) {
    }

    getMonomers():Observable<IonisMonomer[]> { 
        return this._http.get(URLs.monomer_lib_url)
            .map((response:Response) => <IonisMonomer[]> response.json())            
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getMonomer(id:number):Observable<IonisMonomer> {
        return this._http.get(URLs.monomer_lib_url_id+"/?id="+id)
            .map((response:Response) => <IonisMonomer> response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }






    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
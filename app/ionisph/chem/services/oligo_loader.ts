import { Injectable } from  '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {IMonomer} from "../imonomer";
import {IOligo} from "../ioligo";
import {IUnit} from "../iunit";
import {OligoUnit} from "../oligo_unit";
import {OligoChemistry} from "../oligo_chemistry";
import {OligoUnitChemistry} from "../component/oligo_unit_chem";
import {HELMListener} from '../../../helm/lib/helmlistener';
import {URLs} from "./urls";

@Injectable()
export class OligoLoader {

    constructor(private _http:Http) {
    }

    public  buildOligo(helm:string):Observable<IOligo> {
        var headers = new Headers();
        // in order for cors to work we have to set the content type to url-encoded.
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append("cache-control", "no-cache");
        if (helm != null) {
            let body = JSON.stringify({"helm":helm});
            return this._http.post(URLs.build_oligo, body, {headers: headers}).map((response:Response)=><IOligo>response.json());
        }
    }


    /**
     *  This will fetch the chemistry of an oligo nucleotide as a sercies of monomer chains and units 
     * deprecategf
     */
    public getOligoChemistry ( helm:string):Observable<OligoChemistry> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append("cache-control", "no-cache");
        if (helm != null) {
            let body = JSON.stringify({"helm":helm});
            return this._http.post(URLs.build_oligo, body, {headers: headers}).map((response:Response)=><OligoChemistry>response.json());
        }
    }


    /**
     *  This will fetch the chemistry of an oligo nucleotide as a sercies of monomer chains and units 
     * deprecategf
     */
    public loadOligo ( isisno:number, helm_listener:HELMListener):void{
         this._http.get(URLs.build_oligo_list_url(""+isisno))
            .map(this.extract_data)
            .catch(this.handleError).subscribe(
                     json => helm_listener.updateHELM ( this.set_data(json) ),
                     error =>  helm_listener.updateError (<any>error));
    }

    extract_data (res: Response) : any{
        let body = res.json();
        return body;
    }
    set_data ( data:any ) : string
    {
        if ( data.length > 0 ){
            return data[0]['helm']
        }
        // let helmstring = data['helm'];
        // return helmstring;

    }





    public getUnits ( helm:string):Observable<OligoUnitChemistry> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append("cache-control", "no-cache");
        if (helm != null) {
            let body = JSON.stringify({"helm":helm});
            return this._http.post(URLs.build_helm_units, body, {headers: headers}).map((response:Response)=><OligoUnitChemistry>response.json());
        }
    }




    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
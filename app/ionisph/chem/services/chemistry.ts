import { Injectable } from  '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {URLs} from "./urls";
import {IMonomer} from "../imonomer";
import {IOligo} from "../ioligo";

@Injectable()
export class Chemistry {


    constructor(private _http:Http) {
    }

    public  mergeMonomers(sugar:string, base:string, linker:string):Observable<Response> {
        var headers = new Headers();
        // in order for cors to work we have to set the content type to url-encoded.
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append("cache-control", "no-cache");
        if (linker == null || linker.length <=  0) {
            var molfiles = {
                "sugar": sugar,
                "base": base
            }
            let body = JSON.stringify(molfiles);
            return this._http.post(URLs.molfile_merge, body, {headers: headers});

        } else {

            var m = {
                "sugar": sugar,
                "base": base,
                "linker": linker
            }
            let body = JSON.stringify(m);
            return this._http.post(URLs.molfile_merge, body, {headers: headers});
        }
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



}
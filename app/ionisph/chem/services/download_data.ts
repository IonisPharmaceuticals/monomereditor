import {Injectable} from  '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IonisMonomer} from './../../chem/ionismonomer';
import {MonomerDB} from '../../chem/lib/monomer_db'
import {URLs} from "./urls";
import {ActionObserver} from "../../../ui/action_observer"
import {CustomBrowserXhr} from './../../chem/lib/custom_browser_xhr';


@Injectable()
export class DownloadData {
    ob:ActionObserver;
    currentMonomer:IonisMonomer;

    constructor(private _http:Http, private _browser:CustomBrowserXhr) {
    }

    saveMonomer(monomer:IonisMonomer, ob:ActionObserver) {
        this.currentMonomer = monomer;
        this.ob = ob;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(monomer);
        this._http.post(URLs.monomer_lib_save_url, body, {headers: headers}).subscribe(response => this.response(response));
    }

    updateMonomer(monomer:IonisMonomer, ob:ActionObserver) {
        this.ob = ob;
        this.currentMonomer = monomer;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = JSON.stringify(monomer);
        this._http.post(URLs.monomer_lib_save_url, body, {headers: headers}).do(data => console.log('All: ' + JSON.stringify(data))).subscribe(response => this.response(response));
    }

    downloadPub() {
        this._http.get(URLs.monomer_lib_download_public_monomers_url + 'type=public').subscribe((response) => this.descargarArchivo(response));
    }
    downloadPrivate() {
        this._http.get(URLs.monomer_lib_download_public_monomers_url + 'type=private').subscribe((response) => this.descargarArchivo(response));
    }
    downloadAll() {
        this._http.get(URLs.monomer_lib_download_public_monomers_url  + 'type=all').subscribe((response) => this.descargarArchivo(response));
    }
    descargarArchivo(response: Response){
        var blob = new Blob([response.text()], { type: 'text/sdf' });
        var url= window.URL.createObjectURL(blob);
        saveAs ( blob, 'monomer_library.sdf' );
    }

    response(res) {
        console.log(res);
        if (this.ob != null) {
            this.ob.action_successful(this.currentMonomer, "");
        }
    }

    logError(error) {
        console.log(error);
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
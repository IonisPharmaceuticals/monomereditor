/**
 * Created by jmilton on 8/25/2016.
 */
import {Injectable} from '@angular/core';
import {BrowserXhr} from '@angular/http';

//this is currently not used while it was originally created to provide clientside image support

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {


    build(): any {
        let xhr = super.build();
        xhr.responseType = "blob";
        return <any>(xhr);
    }
}
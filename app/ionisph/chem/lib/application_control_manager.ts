import {IonisMonomer} from "../ionismonomer";
import{MonomerLibraryItem} from "../monomerlibraryitem";
import { Injectable } from  '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppListener} from './app_listener';
/**
 * Created by jmilton on 5/24/2016.
 */
@Injectable()
export class ApplicationControls {
    listeners:AppListener[] = [];
    notifyOfNewMonomerState():void{
        for ( var l in this.listeners ){
            this.listeners[l].newMonomer();
        }
    }
    public addListener ( apl:AppListener ){
        this.listeners.push( apl );
    }
}
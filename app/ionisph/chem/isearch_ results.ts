/**
 * Created by jmilton on 6/14/2016.
 */
import { Injectable } from  '@angular/core';
import {Hit} from "./lib/hit";


@Injectable()
export class ISearchResults {

    hits: Hit[];
}
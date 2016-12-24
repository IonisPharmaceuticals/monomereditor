import {Component, Directive, Input } from '@angular/core';

@Directive({
    selector : '[href]',
    host : {
        '(click)' : 'preventDefault($event)'
    }
})
export class MyInhertLink {
    @Input() href;
    preventDefault(event) {
        if(this.href.length == 0) event.preventDefault();
    }
}
/**
 * Created by jmilton on 8/31/2016.
 */

import {Directive, ElementRef, OnInit,Input} from '@angular/core';

@Directive({
    selector: '[data]',
    inputs: ['molFile'],
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class KetcherDirective{
    private el:HTMLDivElement;
    index: number =1;
    @Input() molFile: string;

    constructor(el:ElementRef) {
        this.el = el.nativeElement;
    }
    onMouseEnter() {
    }
    onMouseLeave() {
    }
    updateData ()
    {
        console.log( " click... "  );
    }
    setMolFile(molfile : string){

        this.el.setAttribute('data', molfile);
    }



    set data(data :string) {
        this.setMolFile ( data );
    }

}
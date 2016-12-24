import {Directive, ElementRef, OnInit,} from '@angular/core';
@Directive({
    selector: '[data]',
    inputs: ['data'],
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class JSDrawDirective{
    private el:HTMLDivElement;
    index: number =1;

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
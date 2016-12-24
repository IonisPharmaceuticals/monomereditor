import {OnInit, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {OligoChemistry} from '../../oligo_chemistry';
import {OligoLoader} from '../../services/oligo_loader';
import {OligoUnit} from "../../oligo_unit";


@Component({
    selector: 'oligo-chemistry-viewer',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
    inputs: ['helm' ],
    template: `

    deprecated classs 

    Hello world 

        {{ helm }}

         <div *ngIf="units" class='tabContainer'>
                      <ul>
                       <li *ngFor='let unit of oligochemistry.chains; let i=index'>
                            <div class="btn btn-secondary-outline btn-xs" id={{i}} type="input" (click)="loadstructure(input, $event)" #input> 
                                                        {{unit.helm}}
                            
                            </div>
                       </li>
                      </ul>
          </div>
    `,
    // pipes: [LegacyIDFilter],
})
export class OligoChemistrViewer  implements OnInit {
    oligochemistry:OligoChemistry;
    helm:string;

    constructor (private loader:OligoLoader){

    }

    ngOnInit ():any {
        if ( this.helm != null && this.helm.length > 0 ){
        console.log ( ' loading the oligo chemistry ')
        this.loader.getOligoChemistry ( this.helm ).subscribe ( oligo => this.setOligoUnits ( oligo ) );
        }
    }


    setOligoUnits ( oligo:OligoChemistry ) : void {
        this.oligochemistry = oligo;

    }
}
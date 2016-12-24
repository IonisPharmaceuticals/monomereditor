
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit, OnChanges, SimpleChanges, ViewChild, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {OligoChemistry} from '../oligo_chemistry';
import {OligoUnitChemistry} from './oligo_unit_chem';
import {MonomerDB} from '../lib/monomer_db';
import {HELMParser} from '../../../helm/lib/helm_parser';
import {OligoLoader} from '../services/oligo_loader';
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";


@Component({
    selector: 'oligo-chemistry',
    styleUrls: ['app/ionisph/chem/component/component_styles/helm-panel.css'],
    inputs: ['monomer_db', 'helm'],
    templateUrl: 'app/ionisph/chem/component/templates/oligo_chemistry_summary.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OligoChemistrySummary implements OnInit, OnChanges  {
    oligochemistry:OligoUnitChemistry;
    monomer_db:MonomerDB;
    helm:string;
    status:string = "";
    @ViewChild('modal')
    modal:ModalComponent;
// <img src='data:image/png;base64, ra data here ' />


    constructor ( private hparser: HELMParser, private oloader:OligoLoader, private ref:ChangeDetectorRef ){
        this.ref=ref;
    }
    ngOnChanges(changes: SimpleChanges) : void{
        
     status = 'loading...';
      
        // BootstrapDialog.show({
        //     title: 'Add Description',
        //     message: 'The description is shown to screen readers.',
        //     description: 'This is a Bootstrap Dialog'
        // });
                this.modal.open();

     this.oloader.getUnits ( this.helm ).subscribe ( chemistry => this.set ( chemistry) );


    }
    hide():void {
    }

    is_active ( chain:string ) : boolean {
        if ( chain == 'RNA1'){
            return true;
        }
        else{        return false;
        }
    }


    set ( chemistry:OligoUnitChemistry ) : void {

        this.status = '';
        this.oligochemistry = chemistry;
        // this.ref.markFor

        for ( let c of this.oligochemistry.chains )
        {
            for (let u of c.units )
            {
                console.log ( ' unit ' + u.helm );
            }
        }



        this.ref.markForCheck();
        this.modal.close ();
    }


 ngOnInit():any {
     console.log ( ' helmn ' + this.helm );
          status = 'loading...';

     this.oloader.getUnits ( this.helm ).subscribe ( chemistry =>  this.set ( chemistry ) );

 }

}


/**
 * Created by jmilton on 5/31/2016.
 */
import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {OnInit} from "@angular/core";
import {ApplicationControls} from "../lib/application_control_manager";
import {Chemistry} from "../services/chemistry";
import { SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {IOligo} from "../ioligo";
import {URLs} from "../services/urls";
import {HELMViewer} from './../../../helm/helm_viewer';

@Component({
    selector: 'oligo-builder',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    template: `

 <div class="panel panel-default">
      <div class="panel-heading">HELM-based Structure Editor</div>
      <div class="panel-body">

            <div  class="table-responsive" style="padding: 15px;">
            <tr>
            <td>
                    <div class="container">
                        <form class="form-horizontal" role="form">
                            <div  class="form-group">
                                    <div class="col-sm-10">
                                        <textarea class="form-control input-lg global-search ng-pristine ng-untouched ng-valid ng-isolate-scope multi-paste" isis-multi-paste="" 
                                        [placeholder]="'helm syntax...'" name="search_text" [(ngModel)]="helm" rows="3" wrap="Off"></textarea>
                                    <button type="button" (click)="showRules()" class="btn btn-danger"> Apply Rule </button>
                                     <button type="button" (click)="register()" class="btn btn-info"> Register Oligo </button>
                                    </div>
                            </div>



                            <div class="form-group">
                              <!--<div class="col-sm-offset-2 col-sm-10">-->
                                <!--<button type="submit" class="btn btn-default">Build Chemistry</button>-->
                              <!--</div>-->
                            </div>
                          </form> 
                          
                          <span style="color:blue"> {{ oligo?.molecular_formula }} </span>
                        <div class="panel panel-default">
                        <button type="button" (click)="onSubmit()" class="btn btn-danger"> Build HELM structure </button>
                           <iframe id="ketcher-frame" [src]="frame_component" (lang)="langchange()" (innerText)="smilesChange()" [name]="molfile"  width="100%" height="520px" scrolling="no" border="2px BLUE" #ketcher_frame>
                            </iframe>                        
                         </div>
                     </div>
                    <!--<unit-viewer [linker_monomer]="linker_monomer" [sugar_monomer]="sugar_monomer" [base_monomer]="base_monomer"></unit-viewer>-->
            </td>
            </tr>
            </div>
         </div>

    </div>





<modal #modal item-width="'300px'">
      <modal-header [show-close]="true">
      <h4 class="modal-title"> HELM Rules </h4>
      </modal-header>
      <modal-body>
        <helm-rules-selector [helm_rules_resource]="helm_rules_datasource" [helm_viewer]="this"></helm-rules-selector>
      </modal-body>
</modal>
      

<modal #register_window item-width="'350px'">
      <modal-header [show-close]="true">
      </modal-header>
      <modal-body>
           <oligo-registration-form [helm]="helm"></oligo-registration-form>
      </modal-body>
</modal>
    `,
    providers: [ApplicationControls, Chemistry ]

})
export class OligoBuilder implements OnInit, HELMViewer{
    helm:string;
    comment:string = ' ';
    image:ArrayBuffer;
    frame_component:SafeResourceUrl;
    oligo:IOligo;
    helm_rules_datasource:string = URLs.helm_rules_datasource;


    


    @ViewChild('ketcher_frame') kecherFrame:ElementRef;

    @ViewChild('modal')modal:ModalComponent;

    @ViewChild ('register_window')register_window:ModalComponent;



    constructor( private ref:ChangeDetectorRef, private chemistry:Chemistry,  private sanitizer: DomSanitizer) {
        this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("app/ketcher2.0/ketcher.html");
    }
    ngOnInit():any {
    }

    updateOligo(event:any):void {
        this.comment = '';
    }

    
    setHELM ( helm:string ) : void {
        this.helm = helm;
    }

    getHELM (  ) : string {
        return this.helm;
    }


    register () : void {

        if ( this.register_window ){
            this.register_window.open ( 'lg');
        }



    }


    onSubmit() {
        this.chemistry.buildOligo(this.helm).subscribe(m=>this.updateStatus ( m ))
    }


    select(vl:HTMLSelectElement, $event):void {
        var val = vl.value;
        // console.log( ' value : '+ val );
    }
    updateStatus ( oligo:IOligo ){
        this.oligo = oligo;
        console.log ( ' we have the oligos ' + oligo.molecular_formula );
        this.updateMolFile();
        // this.image = m.arrayBuffer();
        // var arrayBufferView = new Uint8Array( m );
        // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        // var urlCreator = window.URL
        // var imageUrl = urlCreator.createObjectURL( blob );
        // var img = document.querySelector( "#photo" );
        // img.src = imageUrl;

    }


    updateMolFile():void {
        let molfile = this.oligo.molfile;
        if (molfile == null || (!molfile.trim().endsWith("END"))) {
            molfile = "";
        }
        var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
        var ketcher__:any = el.contentWindow;
        ketcher__.setMolecule(molfile);
    }

    showRules () : void {

        if ( this.modal )
        {
            this.modal.open ( "lg");
        }

    }




}

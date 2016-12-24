/**
 * Created by jmilton on 5/31/2016.
 */
import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {OnInit} from "@angular/core";
import {ApplicationControls} from "../lib/application_control_manager";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {IOligo} from "../ioligo";
@Component({
    selector: 'iframe_helm-editor',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    template: `

                        <button type="button" (click)="go()" class="btn btn-danger"> Register HELM structure </button>
                           <iframe id="helm-frame" src="http://elncloud.com/helm/helm/App.htm" width="100%" height="800px" scrolling="no" border="2px BLUE" #helm_frame>
                            </iframe>                        
    `,
    providers: [ApplicationControls ]

})
export class PistoiaHELMEditor implements OnInit{
    helm:string;
    comment:string = ' ';
    frame_component:SafeResourceUrl;
    @ViewChild('helm_frame') kecherFrame:ElementRef;


    constructor( private ref:ChangeDetectorRef,  private sanitizer: DomSanitizer) {
        this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("http://elncloud.com/helm/helm/App.htm");
    }
    ngOnInit():any {
    }
    go() : void {}


}

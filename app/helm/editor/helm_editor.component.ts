import {
    OnInit, OnChanges, Input, Output, EventEmitter,
    Component, ViewChild, ElementRef, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef
} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import {NgIf} from "@angular/common";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {RegistrationComponent} from "./registration.component";


@Component({
    selector: 'helm-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    template: `
        <button type="button" (click)="register()" class="btn btn-info"> {{button_text}} </button>
        <iframe id="helm_editor_iframe" [src]="url" width="100%" height="800px" scrolling="no" border="2px BLUE" #helm_frame>
        </iframe>


        <modal #register_window item-width="'350px'">
            <modal-header [show-close]="true">
            </modal-header>
            <modal-body>
                <helm-registration-form [helm]="helm"></helm-registration-form>
            </modal-body>
        </modal>


        <modal #load_window item-width="'200px'">
            <modal-header [show-close]="true">
                Enter ION number
            </modal-header>
            <modal-body>
                 <input #ion_input type="text" (input)="current_ion">
                <button type="button" (click)="load_current_ion()" class="btn btn-info"> Load ION </button>
            </modal-body>
        </modal>




     `,
    // directives: [NgIf],
    providers: []
})
export class HELMEditorComponent implements OnInit, OnChanges{

    title:string;
    currentSmiles:string;
    @Output() structure:EventEmitter<string> = new EventEmitter<string>();
    @Output() substructureof:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    @ViewChild('helm_frame') helmFrame:ElementRef;
    @ViewChild('register_window')register_window:ModalComponent;
    url:SafeResourceUrl;
    @Input()
    helm:string;
    button_text:string = "Register as new HELM Structure ";

    constructor(private http:Http, private ref:ChangeDetectorRef, private sanitizer:DomSanitizer) {
        
   }


    ngOnChanges(changes: SimpleChanges) : void
    {
        if ( this.helm != null && this.helm.length > 0 ){
            console.log ( ' helm string ' + this.helm );
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html?helm=\"" + this.helm + "\"");
        }else{
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html");            
        }
    }

    refreshHELM():void {
        if (this.helmFrame) {
            var el:HTMLIFrameElement = this.helmFrame.nativeElement;
            var app:any = el.contentWindow;
            console.log ( app.getHelmStr() );
            this.helm = app.getHelmStr();
            
        }
    }


    ngOnInit():any {
        if ( this.helm != null && this.helm.length > 0 ){
            console.log ( ' helm string ' + this.helm );
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html?helm=\"" + this.helm + "\"");
        }else{
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html");            
        }



        if ( this.register_window ){
            this.register_window.animation=false;
        }
       
    }

    ngOnChange

    public structureChanged():boolean {
        if (this.helmFrame) {
        }
        return false;
    }

    public getMolfileForCurrentStructure():string {
        var el:HTMLIFrameElement = this.helmFrame.nativeElement;
        if (el)
            return el.lang;
        else
            return "";
    }



    register () : void {
        this.refreshHELM();
        if ( this.register_window ){
            this.register_window.animation=false;
            this.register_window.open ( 'lg');
        }
    }

}

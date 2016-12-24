import {
    OnInit, Input, Output, EventEmitter,
    Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ApplicationControls} from "../lib/application_control_manager";
import {AppListener} from "../lib/app_listener";
import {Hit} from "../lib/hit";
import {MolecularViewer} from "../molecular_viewer";
import {DomSanitizer} from '@angular/platform-browser';
import {NgIf} from "@angular/common";
import {MonomerManager} from "./monomer_manager.component";
import {IonisMonomer} from "../ionismonomer";
import {MonomerManagerListener} from "../lib/monomer_manager_listener";
@Component({
    selector: 'ketcher-2',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    //templateUrl: 'app/ketcher/ketcher_template.html',
    // inputs: ['monomer_manager', 'app_control'],
    template: `

  <div class="panel panel-danger">
      <div class="panel panel-info" style="color: #0000CC; border: NONE">
        <iframe id="ketcher-frame" [src]="set_frame_component()" (lang)="langchange()" (innerText)="smilesChange()" width="100%" height="520px" scrolling="no" border="2px BLUE" #ketcher_frame>
        </iframe>
      </div>
      </div>
     `,
    // directives: [NgIf],
    providers: []
})
export class Ketcher2Component implements OnInit, MonomerManagerListener, AppListener, MolecularViewer {

    title:string;

    @Input()
    monomer_manager:MonomerManager;
    currentSmiles:string;
    @Output() structure:EventEmitter<string> = new EventEmitter<string>();
    @Output() substructureof:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    frame_component:string;
    @ViewChild('ketcher_frame') kecherFrame:ElementRef;
    @Input() app_control:ApplicationControls;


    constructor(private http:Http, private ref:ChangeDetectorRef, private sanitizer:DomSanitizer) {
    }

    set_frame_component():any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.frame_component);
    }


    getSmiles():string {
        if (this.kecherFrame) {
            var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
            // smiles is stored in the ketcherframe title
            return el.title.toString();
        }
    }


    ngOnInit():any {
        if (this.monomer_manager != null && this.monomer_manager != undefined) {
            this.monomer_manager.addListener(this);
            this.monomer_manager.setStructureViewer(this);
            this.frame_component = "app/ketcher2.0/ketcher.html";
        }
        if (this.app_control != undefined) {
            this.app_control.addListener(this);
        }
        // this.ref.detectChanges();
    }

    public structureChanged():boolean {
        if (this.kecherFrame) {
        }
        return false;
    }

    public getMolfileForCurrentStructure():string {
        var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
        if (el)
            return el.lang;
        else
            return "";
    }

    updateSelectedStructure(ionisMon:IonisMonomer,msg:string):void {
        if (ionisMon != null && ionisMon.monomer != null) {
            this.setMolFile(ionisMon);
        }else {
            this.frame_component = "app/ketcher2.0/ketcher.html";
        }
    }

    setMolFile(ion:IonisMonomer) {

        if ( ion == null || ion.monomer == null || ion.monomer.molfile == null || ion.monomer.molfile == "")
        {
            this.frame_component = "app/ketcher2.0/ketcher.html";
            return;
        }

        this.title = ion.monomer.alternateId;

        var molfile = ion.monomer.molfile
        if (molfile == null || (!molfile.trim().endsWith("END"))) {
            molfile = "";
        }
        var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
        var ketcher__:any = el.contentWindow;
        ketcher__.setMolecule(molfile);
    }


    updateSelectedSubstructureList(substructureList:Hit[]):void {
    }

    newMonomer():void {
    }

    private  handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

import {
    OnInit, Input, Output, EventEmitter,
    Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ApplicationControls} from "../ionisph/chem/lib/application_control_manager";
import {AppListener} from "../ionisph/chem/lib/app_listener";
import {Hit} from "../ionisph/chem/lib/hit";
import {MolecularViewer} from "../ionisph/chem/molecular_viewer";
import {DomSanitizer} from '@angular/platform-browser';
import {NgIf} from "@angular/common";
import {MonomerManager} from "../ionisph/chem/component/monomer_manager.component";
import {IonisMonomer} from "../ionisph/chem/ionismonomer";
import {MonomerManagerListener} from "../ionisph/chem/lib/monomer_manager_listener";

@Component({
    selector: 'molview',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    //templateUrl: 'app/ketcher/ketcher_template.html',
    inputs: ['monomer_manager', 'app_control'],
    template: `

  <div class="panel panel-danger">
      <div class="panel panel-info" style="color: #0000CC; border: NONE">
        <iframe id="ketcher-frame" [src]="set_frame_component()" (lang)="langchange()" (innerText)="smilesChange()" [name]="mol"  width="100%" height="520px" scrolling="no" border="2px BLUE" #ketcher_frame>
        </iframe>
      </div>
      </div>
     `,
    // directives: [NgIf],
    // providers: [HTTP_PROVIDERS]
})
export class KetcherMolview implements OnInit{

    title:string;

    @Input()
    mol:string;
    @Output() structure:EventEmitter<string> = new EventEmitter<string>();
    @Output() substructureof:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    frame_component:string;
    @ViewChild('ketcher_frame') kecherFrame:ElementRef;


    constructor(private http:Http, private ref:ChangeDetectorRef, private sanitizer:DomSanitizer) {
    }

    set_frame_component():any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.frame_component);
    }



    ngOnInit():any {
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

    updateSelectedStructure(ionisMon:IonisMonomer, msg:string):void {
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

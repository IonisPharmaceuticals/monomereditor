import {
    OnInit, Input, Output, EventEmitter,
    Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges
} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {IonisMonomer} from "../ionismonomer";
import {Hit} from "../lib/hit";
import {MolecularViewer} from "../molecular_viewer";
import {Chemistry} from '../services/chemistry';


@Component({
    selector: 'unit-viewer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    inputs: ['linker_monomer', 'base_monomer', 'sugar_monomer'],
    template: `

  <div class="panel panel-default">
       <button type="button" (click)="merge_molecules()" class="btn btn-danger">Generate structure</button>
      <div class="panel panel-info" style="color: #0000CC; border: NONE">
        <iframe id="ketcher-frame" [src]="frame_component" (lang)="langchange()" (innerText)="smilesChange()" [name]="molfile"  width="100%" height="520px" scrolling="no" border="2px BLUE" #ketcher_frame>
        </iframe>
      </div>
      </div>
     `,
    providers: [ Chemistry]
})
export class UnitViewerComponent implements OnInit, OnChanges, MolecularViewer {
    molfile:string;
    linker_monomer:IonisMonomer;
    base_monomer:IonisMonomer;
    sugar_monomer:IonisMonomer;
    @Output() structure:EventEmitter<string> = new EventEmitter<string>();
    @Output() substructureof:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    frame_component:SafeResourceUrl;
    @ViewChild('ketcher_frame') kecherFrame:ElementRef;

    constructor(private http:Http, private ref:ChangeDetectorRef, private chemistry:Chemistry,  private sanitizer: DomSanitizer) {
        this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("app/ketcher2.0/ketcher.html");
    }

    ngOnChanges(change:any):any {
        // this.ref.markForCheck();
        console.log(" update ");
    }

    merge_molecules():any {
        if (this.sugar_monomer != null && this.base_monomer != null && this.linker_monomer != null) {
            if (this.sugar_monomer.monomer.molfile != null && this.base_monomer.monomer.molfile != null && this.linker_monomer.monomer.molfile != null) {
                this.chemistry.mergeMonomers(this.sugar_monomer.monomer.molfile, this.base_monomer.monomer.molfile, this.linker_monomer.monomer.molfile).subscribe(m=>this.setMolFile(m));
            }
        }
        else if (this.sugar_monomer != null && this.base_monomer != null) {
            if (this.sugar_monomer.monomer.molfile != null && this.base_monomer.monomer.molfile != null) {
                this.chemistry.mergeMonomers(this.sugar_monomer.monomer.molfile, this.base_monomer.monomer.molfile, null).subscribe(m=>this.setMolFile(m));
            }
        }
        else if (this.sugar_monomer != null) {

            if (this.sugar_monomer.monomer.molfile != null) {
                this.molfile = this.sugar_monomer.monomer.molfile;
                var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
                var ketcher__:any = el.contentWindow;
                ketcher__.setMolecule(this.molfile);
            }
        } else {
            if (this.kecherFrame != null && this.kecherFrame.nativeElement != null) {
                var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
                var ketcher__:any = el.contentWindow;
                this.molfile = "";
                ketcher__.setMolecule(this.molfile);
            }
        }
    }

    setMolFile(molfile_response:Response) {
        this.molfile = molfile_response.text();
        if (this.molfile == null || (!this.molfile.trim().endsWith("END"))) {
            this.molfile = "";
        }

        var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
        var ketcher__:any = el.contentWindow;
        ketcher__.setMolecule(this.molfile);
    }


    getSmiles():string {
        if (this.kecherFrame) {
            var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
            return el.title.toString();
        }
    }

    ngOnInit():any {
    }

    public structureChanged():boolean {
        if (this.kecherFrame) {
            var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
            if (el) {
                if (el.lang != this.molfile)
                    return true;
            }
        }
        return false;
    }

    public emitStructure():void {
        var cm_mol = this.getMolfileForCurrentStructure();
        this.molfile = cm_mol;
    }

    public getMolfileForCurrentStructure():string {
        var el:HTMLIFrameElement = this.kecherFrame.nativeElement;
        //console.log ( " el : " + el.lang );
        if (el)
            return el.lang;
        else
            return "";
    }


    updateSelectedSubstructureList(substructureList:Hit[]):void {
    }


    smilesChange(ionisMon:IonisMonomer):void {
    }

    private  handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

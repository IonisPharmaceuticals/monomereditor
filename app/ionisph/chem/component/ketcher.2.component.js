System.register(["@angular/core", "@angular/http", "rxjs/Observable", "../lib/application_control_manager", "@angular/platform-browser", "./monomer_manager.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Observable_1, application_control_manager_1, platform_browser_1, monomer_manager_component_1, Ketcher2Component;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (monomer_manager_component_1_1) {
                monomer_manager_component_1 = monomer_manager_component_1_1;
            }
        ],
        execute: function () {
            Ketcher2Component = (function () {
                function Ketcher2Component(http, ref, sanitizer) {
                    this.http = http;
                    this.ref = ref;
                    this.sanitizer = sanitizer;
                    this.structure = new core_1.EventEmitter();
                    this.substructureof = new core_1.EventEmitter();
                }
                Ketcher2Component.prototype.set_frame_component = function () {
                    return this.sanitizer.bypassSecurityTrustResourceUrl(this.frame_component);
                };
                Ketcher2Component.prototype.getSmiles = function () {
                    if (this.kecherFrame) {
                        var el = this.kecherFrame.nativeElement;
                        // smiles is stored in the ketcherframe title
                        return el.title.toString();
                    }
                };
                Ketcher2Component.prototype.ngOnInit = function () {
                    if (this.monomer_manager != null && this.monomer_manager != undefined) {
                        this.monomer_manager.addListener(this);
                        this.monomer_manager.setStructureViewer(this);
                        this.frame_component = "app/ketcher2.0/ketcher.html";
                    }
                    if (this.app_control != undefined) {
                        this.app_control.addListener(this);
                    }
                    // this.ref.detectChanges();
                };
                Ketcher2Component.prototype.structureChanged = function () {
                    if (this.kecherFrame) {
                    }
                    return false;
                };
                Ketcher2Component.prototype.getMolfileForCurrentStructure = function () {
                    var el = this.kecherFrame.nativeElement;
                    if (el)
                        return el.lang;
                    else
                        return "";
                };
                Ketcher2Component.prototype.updateSelectedStructure = function (ionisMon, msg) {
                    if (ionisMon != null && ionisMon.monomer != null) {
                        this.setMolFile(ionisMon);
                    }
                    else {
                        this.frame_component = "app/ketcher2.0/ketcher.html";
                    }
                };
                Ketcher2Component.prototype.setMolFile = function (ion) {
                    if (ion == null || ion.monomer == null || ion.monomer.molfile == null || ion.monomer.molfile == "") {
                        this.frame_component = "app/ketcher2.0/ketcher.html";
                        return;
                    }
                    this.title = ion.monomer.alternateId;
                    var molfile = ion.monomer.molfile;
                    if (molfile == null || (!molfile.trim().endsWith("END"))) {
                        molfile = "";
                    }
                    var el = this.kecherFrame.nativeElement;
                    var ketcher__ = el.contentWindow;
                    ketcher__.setMolecule(molfile);
                };
                Ketcher2Component.prototype.updateSelectedSubstructureList = function (substructureList) {
                };
                Ketcher2Component.prototype.newMonomer = function () {
                };
                Ketcher2Component.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return Ketcher2Component;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", monomer_manager_component_1.MonomerManager)
            ], Ketcher2Component.prototype, "monomer_manager", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ketcher2Component.prototype, "structure", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ketcher2Component.prototype, "substructureof", void 0);
            __decorate([
                core_1.ViewChild('ketcher_frame'),
                __metadata("design:type", core_1.ElementRef)
            ], Ketcher2Component.prototype, "kecherFrame", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", application_control_manager_1.ApplicationControls)
            ], Ketcher2Component.prototype, "app_control", void 0);
            Ketcher2Component = __decorate([
                core_1.Component({
                    selector: 'ketcher-2',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
                    //templateUrl: 'app/ketcher/ketcher_template.html',
                    // inputs: ['monomer_manager', 'app_control'],
                    template: "\n\n  <div class=\"panel panel-danger\">\n      <div class=\"panel panel-info\" style=\"color: #0000CC; border: NONE\">\n        <iframe id=\"ketcher-frame\" [src]=\"set_frame_component()\" (lang)=\"langchange()\" (innerText)=\"smilesChange()\" width=\"100%\" height=\"520px\" scrolling=\"no\" border=\"2px BLUE\" #ketcher_frame>\n        </iframe>\n      </div>\n      </div>\n     ",
                    // directives: [NgIf],
                    providers: []
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef, platform_browser_1.DomSanitizer])
            ], Ketcher2Component);
            exports_1("Ketcher2Component", Ketcher2Component);
        }
    };
});
//# sourceMappingURL=ketcher.2.component.js.map
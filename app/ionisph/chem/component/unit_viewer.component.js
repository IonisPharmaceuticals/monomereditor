System.register(["@angular/core", "@angular/http", "rxjs/Observable", "@angular/platform-browser", "../services/chemistry"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, platform_browser_1, chemistry_1, UnitViewerComponent;
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
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (chemistry_1_1) {
                chemistry_1 = chemistry_1_1;
            }
        ],
        execute: function () {
            UnitViewerComponent = (function () {
                function UnitViewerComponent(http, ref, chemistry, sanitizer) {
                    this.http = http;
                    this.ref = ref;
                    this.chemistry = chemistry;
                    this.sanitizer = sanitizer;
                    this.structure = new core_1.EventEmitter();
                    this.substructureof = new core_1.EventEmitter();
                    this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("app/ketcher2.0/ketcher.html");
                }
                UnitViewerComponent.prototype.ngOnChanges = function (change) {
                    // this.ref.markForCheck();
                    console.log(" update ");
                };
                UnitViewerComponent.prototype.merge_molecules = function () {
                    var _this = this;
                    if (this.sugar_monomer != null && this.base_monomer != null && this.linker_monomer != null) {
                        if (this.sugar_monomer.monomer.molfile != null && this.base_monomer.monomer.molfile != null && this.linker_monomer.monomer.molfile != null) {
                            this.chemistry.mergeMonomers(this.sugar_monomer.monomer.molfile, this.base_monomer.monomer.molfile, this.linker_monomer.monomer.molfile).subscribe(function (m) { return _this.setMolFile(m); });
                        }
                    }
                    else if (this.sugar_monomer != null && this.base_monomer != null) {
                        if (this.sugar_monomer.monomer.molfile != null && this.base_monomer.monomer.molfile != null) {
                            this.chemistry.mergeMonomers(this.sugar_monomer.monomer.molfile, this.base_monomer.monomer.molfile, null).subscribe(function (m) { return _this.setMolFile(m); });
                        }
                    }
                    else if (this.sugar_monomer != null) {
                        if (this.sugar_monomer.monomer.molfile != null) {
                            this.molfile = this.sugar_monomer.monomer.molfile;
                            var el = this.kecherFrame.nativeElement;
                            var ketcher__ = el.contentWindow;
                            ketcher__.setMolecule(this.molfile);
                        }
                    }
                    else {
                        if (this.kecherFrame != null && this.kecherFrame.nativeElement != null) {
                            var el = this.kecherFrame.nativeElement;
                            var ketcher__ = el.contentWindow;
                            this.molfile = "";
                            ketcher__.setMolecule(this.molfile);
                        }
                    }
                };
                UnitViewerComponent.prototype.setMolFile = function (molfile_response) {
                    this.molfile = molfile_response.text();
                    if (this.molfile == null || (!this.molfile.trim().endsWith("END"))) {
                        this.molfile = "";
                    }
                    var el = this.kecherFrame.nativeElement;
                    var ketcher__ = el.contentWindow;
                    ketcher__.setMolecule(this.molfile);
                };
                UnitViewerComponent.prototype.getSmiles = function () {
                    if (this.kecherFrame) {
                        var el = this.kecherFrame.nativeElement;
                        return el.title.toString();
                    }
                };
                UnitViewerComponent.prototype.ngOnInit = function () {
                };
                UnitViewerComponent.prototype.structureChanged = function () {
                    if (this.kecherFrame) {
                        var el = this.kecherFrame.nativeElement;
                        if (el) {
                            if (el.lang != this.molfile)
                                return true;
                        }
                    }
                    return false;
                };
                UnitViewerComponent.prototype.emitStructure = function () {
                    var cm_mol = this.getMolfileForCurrentStructure();
                    this.molfile = cm_mol;
                };
                UnitViewerComponent.prototype.getMolfileForCurrentStructure = function () {
                    var el = this.kecherFrame.nativeElement;
                    //console.log ( " el : " + el.lang );
                    if (el)
                        return el.lang;
                    else
                        return "";
                };
                UnitViewerComponent.prototype.updateSelectedSubstructureList = function (substructureList) {
                };
                UnitViewerComponent.prototype.smilesChange = function (ionisMon) {
                };
                UnitViewerComponent.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return UnitViewerComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], UnitViewerComponent.prototype, "structure", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], UnitViewerComponent.prototype, "substructureof", void 0);
            __decorate([
                core_1.ViewChild('ketcher_frame'),
                __metadata("design:type", core_1.ElementRef)
            ], UnitViewerComponent.prototype, "kecherFrame", void 0);
            UnitViewerComponent = __decorate([
                core_1.Component({
                    selector: 'unit-viewer',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
                    inputs: ['linker_monomer', 'base_monomer', 'sugar_monomer'],
                    template: "\n\n  <div class=\"panel panel-default\">\n       <button type=\"button\" (click)=\"merge_molecules()\" class=\"btn btn-danger\">Generate structure</button>\n      <div class=\"panel panel-info\" style=\"color: #0000CC; border: NONE\">\n        <iframe id=\"ketcher-frame\" [src]=\"frame_component\" (lang)=\"langchange()\" (innerText)=\"smilesChange()\" [name]=\"molfile\"  width=\"100%\" height=\"520px\" scrolling=\"no\" border=\"2px BLUE\" #ketcher_frame>\n        </iframe>\n      </div>\n      </div>\n     ",
                    providers: [chemistry_1.Chemistry]
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef, chemistry_1.Chemistry, platform_browser_1.DomSanitizer])
            ], UnitViewerComponent);
            exports_1("UnitViewerComponent", UnitViewerComponent);
        }
    };
});
//# sourceMappingURL=unit_viewer.component.js.map
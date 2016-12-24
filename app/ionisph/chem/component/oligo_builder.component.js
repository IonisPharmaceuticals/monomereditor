System.register(["@angular/core", "rxjs/Rx", "../lib/application_control_manager", "../services/chemistry", "@angular/platform-browser", "ng2-bs3-modal/ng2-bs3-modal", "../services/urls"], function (exports_1, context_1) {
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
    var core_1, application_control_manager_1, chemistry_1, platform_browser_1, ng2_bs3_modal_1, urls_1, OligoBuilder;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (chemistry_1_1) {
                chemistry_1 = chemistry_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            OligoBuilder = (function () {
                function OligoBuilder(ref, chemistry, sanitizer) {
                    this.ref = ref;
                    this.chemistry = chemistry;
                    this.sanitizer = sanitizer;
                    this.comment = ' ';
                    this.helm_rules_datasource = urls_1.URLs.helm_rules_datasource;
                    this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("app/ketcher2.0/ketcher.html");
                }
                OligoBuilder.prototype.ngOnInit = function () {
                };
                OligoBuilder.prototype.updateOligo = function (event) {
                    this.comment = '';
                };
                OligoBuilder.prototype.setHELM = function (helm) {
                    this.helm = helm;
                };
                OligoBuilder.prototype.getHELM = function () {
                    return this.helm;
                };
                OligoBuilder.prototype.register = function () {
                    if (this.register_window) {
                        this.register_window.open('lg');
                    }
                };
                OligoBuilder.prototype.onSubmit = function () {
                    var _this = this;
                    this.chemistry.buildOligo(this.helm).subscribe(function (m) { return _this.updateStatus(m); });
                };
                OligoBuilder.prototype.select = function (vl, $event) {
                    var val = vl.value;
                    // console.log( ' value : '+ val );
                };
                OligoBuilder.prototype.updateStatus = function (oligo) {
                    this.oligo = oligo;
                    console.log(' we have the oligos ' + oligo.molecular_formula);
                    this.updateMolFile();
                    // this.image = m.arrayBuffer();
                    // var arrayBufferView = new Uint8Array( m );
                    // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                    // var urlCreator = window.URL
                    // var imageUrl = urlCreator.createObjectURL( blob );
                    // var img = document.querySelector( "#photo" );
                    // img.src = imageUrl;
                };
                OligoBuilder.prototype.updateMolFile = function () {
                    var molfile = this.oligo.molfile;
                    if (molfile == null || (!molfile.trim().endsWith("END"))) {
                        molfile = "";
                    }
                    var el = this.kecherFrame.nativeElement;
                    var ketcher__ = el.contentWindow;
                    ketcher__.setMolecule(molfile);
                };
                OligoBuilder.prototype.showRules = function () {
                    if (this.modal) {
                        this.modal.open("lg");
                    }
                };
                return OligoBuilder;
            }());
            __decorate([
                core_1.ViewChild('ketcher_frame'),
                __metadata("design:type", core_1.ElementRef)
            ], OligoBuilder.prototype, "kecherFrame", void 0);
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OligoBuilder.prototype, "modal", void 0);
            __decorate([
                core_1.ViewChild('register_window'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OligoBuilder.prototype, "register_window", void 0);
            OligoBuilder = __decorate([
                core_1.Component({
                    selector: 'oligo-builder',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    template: "\n\n <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">HELM-based Structure Editor</div>\n      <div class=\"panel-body\">\n\n            <div  class=\"table-responsive\" style=\"padding: 15px;\">\n            <tr>\n            <td>\n                    <div class=\"container\">\n                        <form class=\"form-horizontal\" role=\"form\">\n                            <div  class=\"form-group\">\n                                    <div class=\"col-sm-10\">\n                                        <textarea class=\"form-control input-lg global-search ng-pristine ng-untouched ng-valid ng-isolate-scope multi-paste\" isis-multi-paste=\"\" \n                                        [placeholder]=\"'helm syntax...'\" name=\"search_text\" [(ngModel)]=\"helm\" rows=\"3\" wrap=\"Off\"></textarea>\n                                    <button type=\"button\" (click)=\"showRules()\" class=\"btn btn-danger\"> Apply Rule </button>\n                                     <button type=\"button\" (click)=\"register()\" class=\"btn btn-info\"> Register Oligo </button>\n                                    </div>\n                            </div>\n\n\n\n                            <div class=\"form-group\">\n                              <!--<div class=\"col-sm-offset-2 col-sm-10\">-->\n                                <!--<button type=\"submit\" class=\"btn btn-default\">Build Chemistry</button>-->\n                              <!--</div>-->\n                            </div>\n                          </form> \n                          \n                          <span style=\"color:blue\"> {{ oligo?.molecular_formula }} </span>\n                        <div class=\"panel panel-default\">\n                        <button type=\"button\" (click)=\"onSubmit()\" class=\"btn btn-danger\"> Build HELM structure </button>\n                           <iframe id=\"ketcher-frame\" [src]=\"frame_component\" (lang)=\"langchange()\" (innerText)=\"smilesChange()\" [name]=\"molfile\"  width=\"100%\" height=\"520px\" scrolling=\"no\" border=\"2px BLUE\" #ketcher_frame>\n                            </iframe>                        \n                         </div>\n                     </div>\n                    <!--<unit-viewer [linker_monomer]=\"linker_monomer\" [sugar_monomer]=\"sugar_monomer\" [base_monomer]=\"base_monomer\"></unit-viewer>-->\n            </td>\n            </tr>\n            </div>\n         </div>\n\n    </div>\n\n\n\n\n\n<modal #modal item-width=\"'300px'\">\n      <modal-header [show-close]=\"true\">\n      <h4 class=\"modal-title\"> HELM Rules </h4>\n      </modal-header>\n      <modal-body>\n        <helm-rules-selector [helm_rules_resource]=\"helm_rules_datasource\" [helm_viewer]=\"this\"></helm-rules-selector>\n      </modal-body>\n</modal>\n      \n\n<modal #register_window item-width=\"'350px'\">\n      <modal-header [show-close]=\"true\">\n      </modal-header>\n      <modal-body>\n           <oligo-registration-form [helm]=\"helm\"></oligo-registration-form>\n      </modal-body>\n</modal>\n    ",
                    providers: [application_control_manager_1.ApplicationControls, chemistry_1.Chemistry]
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef, chemistry_1.Chemistry, platform_browser_1.DomSanitizer])
            ], OligoBuilder);
            exports_1("OligoBuilder", OligoBuilder);
        }
    };
});
//# sourceMappingURL=oligo_builder.component.js.map
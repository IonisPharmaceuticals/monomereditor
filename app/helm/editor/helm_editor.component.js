System.register(["@angular/core", "@angular/http", "@angular/platform-browser", "ng2-bs3-modal/ng2-bs3-modal"], function (exports_1, context_1) {
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
    var core_1, http_1, platform_browser_1, ng2_bs3_modal_1, HELMEditorComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            }
        ],
        execute: function () {
            HELMEditorComponent = (function () {
                function HELMEditorComponent(http, ref, sanitizer) {
                    this.http = http;
                    this.ref = ref;
                    this.sanitizer = sanitizer;
                    this.structure = new core_1.EventEmitter();
                    this.substructureof = new core_1.EventEmitter();
                    this.button_text = "Register as new HELM Structure ";
                }
                HELMEditorComponent.prototype.ngOnChanges = function (changes) {
                    if (this.helm != null && this.helm.length > 0) {
                        console.log(' helm string ' + this.helm);
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html?helm=\"" + this.helm + "\"");
                    }
                    else {
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html");
                    }
                };
                HELMEditorComponent.prototype.refreshHELM = function () {
                    if (this.helmFrame) {
                        var el = this.helmFrame.nativeElement;
                        var app = el.contentWindow;
                        console.log(app.getHelmStr());
                        this.helm = app.getHelmStr();
                    }
                };
                HELMEditorComponent.prototype.ngOnInit = function () {
                    if (this.helm != null && this.helm.length > 0) {
                        console.log(' helm string ' + this.helm);
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html?helm=\"" + this.helm + "\"");
                    }
                    else {
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("app/pistoia/app.html");
                    }
                    if (this.register_window) {
                        this.register_window.animation = false;
                    }
                };
                HELMEditorComponent.prototype.structureChanged = function () {
                    if (this.helmFrame) {
                    }
                    return false;
                };
                HELMEditorComponent.prototype.getMolfileForCurrentStructure = function () {
                    var el = this.helmFrame.nativeElement;
                    if (el)
                        return el.lang;
                    else
                        return "";
                };
                HELMEditorComponent.prototype.register = function () {
                    this.refreshHELM();
                    if (this.register_window) {
                        this.register_window.animation = false;
                        this.register_window.open('lg');
                    }
                };
                return HELMEditorComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], HELMEditorComponent.prototype, "structure", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], HELMEditorComponent.prototype, "substructureof", void 0);
            __decorate([
                core_1.ViewChild('helm_frame'),
                __metadata("design:type", core_1.ElementRef)
            ], HELMEditorComponent.prototype, "helmFrame", void 0);
            __decorate([
                core_1.ViewChild('register_window'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], HELMEditorComponent.prototype, "register_window", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], HELMEditorComponent.prototype, "helm", void 0);
            HELMEditorComponent = __decorate([
                core_1.Component({
                    selector: 'helm-editor',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
                    template: "\n        <button type=\"button\" (click)=\"register()\" class=\"btn btn-info\"> {{button_text}} </button>\n        <iframe id=\"helm_editor_iframe\" [src]=\"url\" width=\"100%\" height=\"800px\" scrolling=\"no\" border=\"2px BLUE\" #helm_frame>\n        </iframe>\n\n\n        <modal #register_window item-width=\"'350px'\">\n            <modal-header [show-close]=\"true\">\n            </modal-header>\n            <modal-body>\n                <helm-registration-form [helm]=\"helm\"></helm-registration-form>\n            </modal-body>\n        </modal>\n\n\n        <modal #load_window item-width=\"'200px'\">\n            <modal-header [show-close]=\"true\">\n                Enter ION number\n            </modal-header>\n            <modal-body>\n                 <input #ion_input type=\"text\" (input)=\"current_ion\">\n                <button type=\"button\" (click)=\"load_current_ion()\" class=\"btn btn-info\"> Load ION </button>\n            </modal-body>\n        </modal>\n\n\n\n\n     ",
                    // directives: [NgIf],
                    providers: []
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef, platform_browser_1.DomSanitizer])
            ], HELMEditorComponent);
            exports_1("HELMEditorComponent", HELMEditorComponent);
        }
    };
});
//# sourceMappingURL=helm_editor.component.js.map
System.register(["@angular/core", "rxjs/Rx", "../lib/application_control_manager", "@angular/platform-browser"], function (exports_1, context_1) {
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
    var core_1, application_control_manager_1, platform_browser_1, PistoiaHELMEditor;
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
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }
        ],
        execute: function () {
            PistoiaHELMEditor = (function () {
                function PistoiaHELMEditor(ref, sanitizer) {
                    this.ref = ref;
                    this.sanitizer = sanitizer;
                    this.comment = ' ';
                    this.frame_component = this.sanitizer.bypassSecurityTrustResourceUrl("http://elncloud.com/helm/helm/App.htm");
                }
                PistoiaHELMEditor.prototype.ngOnInit = function () {
                };
                PistoiaHELMEditor.prototype.go = function () { };
                return PistoiaHELMEditor;
            }());
            __decorate([
                core_1.ViewChild('helm_frame'),
                __metadata("design:type", core_1.ElementRef)
            ], PistoiaHELMEditor.prototype, "kecherFrame", void 0);
            PistoiaHELMEditor = __decorate([
                core_1.Component({
                    selector: 'iframe_helm-editor',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    template: "\n\n                        <button type=\"button\" (click)=\"go()\" class=\"btn btn-danger\"> Register HELM structure </button>\n                           <iframe id=\"helm-frame\" src=\"http://elncloud.com/helm/helm/App.htm\" width=\"100%\" height=\"800px\" scrolling=\"no\" border=\"2px BLUE\" #helm_frame>\n                            </iframe>                        \n    ",
                    providers: [application_control_manager_1.ApplicationControls]
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef, platform_browser_1.DomSanitizer])
            ], PistoiaHELMEditor);
            exports_1("PistoiaHELMEditor", PistoiaHELMEditor);
        }
    };
});
//# sourceMappingURL=pistoia_helm_editor.component.js.map
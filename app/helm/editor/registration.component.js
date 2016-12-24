System.register(["@angular/core", "rxjs/Rx", "@angular/platform-browser", "ng2-bs3-modal/ng2-bs3-modal", "../lib/register", "../lib/helmstruct"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, ng2_bs3_modal_1, register_1, helmstruct_1, RegistrationComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (register_1_1) {
                register_1 = register_1_1;
            },
            function (helmstruct_1_1) {
                helmstruct_1 = helmstruct_1_1;
            }
        ],
        execute: function () {
            RegistrationComponent = (function () {
                function RegistrationComponent(ref, oligoreg, sanitizer) {
                    this.ref = ref;
                    this.oligoreg = oligoreg;
                    this.sanitizer = sanitizer;
                    this.msg = "";
                    this.button_text = 'Register';
                    this.disabled = false;
                    this.oligo = new helmstruct_1.HELMStructure();
                    this.registerd_isis_no = "";
                }
                RegistrationComponent.prototype.ngOnInit = function () {
                    this.oligo.helm = this.helm;
                };
                RegistrationComponent.prototype.register = function () {
                };
                RegistrationComponent.prototype.action_update = function (res) {
                    this.ref.detectChanges();
                    this.msg = res;
                    this.ref.detectChanges();
                    this.modal.open('lg');
                };
                RegistrationComponent.prototype.action_successful = function (response) {
                    this.disabled = false;
                    this.registerd_isis_no = "Registerd as id: " + response.id;
                    this.msg = response.msg + "   IsisNo:" + response.id;
                    this.ref.detectChanges();
                    this.modal.open('lg');
                    this.button_text = "Register";
                    this.ref.detectChanges();
                };
                RegistrationComponent.prototype.action_failed = function (o) {
                    this.disabled = false;
                    this.button_text = "(failed).. try again.";
                    this.ref.detectChanges();
                };
                RegistrationComponent.prototype.qprompt = function (msg) {
                    this.msg = msg;
                    this.modal.open('lg');
                };
                RegistrationComponent.prototype.submit = function (event) {
                    this.disabled = true;
                    if (this.helm == null || this.helm.length <= 0) {
                        this.msg = "Please enter a valid helm string.";
                        this.qprompt(this.msg);
                        return;
                    }
                    if (this.helm.length > 0) {
                        this.helm = this.helm.trim();
                    }
                    this.oligo.helm = this.helm;
                    this.oligoreg.submitAsJSON(this.oligo, this);
                };
                return RegistrationComponent;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], RegistrationComponent.prototype, "modal", void 0);
            RegistrationComponent = __decorate([
                core_1.Component({
                    selector: 'helm-registration-form',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    inputs: ['helm'],
                    template: "\n\n <div class=\"panel panel-default\" >\n\t  <div class=\"panel-heading\">Oligo Registration</div>\n\t  <div class=\"panel-body\">\n\n\t\t\t<div  class=\"table-responsive\">\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"container\"  style=\"padding: 0px;width: 310px\">\n\t\t\t\t\t\t\t<form class=\"form-vertical\" role=\"form\" style=\"padding: 0px;width: 310px\">\n\t\t\t\t\t\t\t\t<div  class=\"form-group\"  style=\"padding: 0px;width: 300px\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Name:</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #user class=\"form-control\" id=\"usr\" [(ngModel)]=\"oligo.user\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Notebook</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #notebook class=\"form-control\" id=\"notebook\" [(ngModel)]=\"oligo.notebook\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Notebook Page</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #notebook_page class=\"form-control\" id=\"notebook_page\" [(ngModel)]=\"oligo.notebook_page\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"pwd\">Comment</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<textarea #notebook_comment class=\"form-control input-lg \" isis-multi-paste=\"\" \n\t\t\t\t\t\t\t\t\t\t\t\t[placeholder]=\"'Description...'\" name=\"comment\" [(ngModel)]=\"oligo.comment\" rows=\"2\" cols=\"20\" wrap=\"Off\" [ngModelOptions]=\"{standalone: true}\"></textarea>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form> \n\t\t\t\t\t\t</div>   \n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t\t<textarea #notebook_comment class=\"form-control input-lg \" isis-multi-paste=\"\" \n\t\t\t\t\t\t[placeholder]=\"'HELM...'\" name=\"oligo\" [(ngModel)]=\"helm\" rows=\"10\" cols=\"60\" wrap=\"on\"\n\t\t\t\t\t\t [ngModelOptions]=\"{standalone: true}\"></textarea>\n\t\t\t\t\t\t{{ registerd_isis_no }}\n\t\t\t\t</td>\n\t\t\t</tr>\n\n\n\t\t\t<td>\n\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<div  class=\"table-responsive\" style=\"width:300px;margin-left:100px\">\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" (click)=\"cancel()\" class=\"btn btn-info\">Cancel</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" [disabled]=disabled (click)=\"submit($event)\" class=\"btn btn-danger\">{{button_text}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t   </div> \n\n\t\t\t</tr>\n\t\t  </td>\n\n\t\t</div>\n\t</div>\n</div>\n\n\n<modal #modal item-width=\"'400px'\">\n\t  <modal-header [show-close]=\"true\">\n\t  </modal-header>\n\t  <modal-body>\n\n\n\t  {{ msg }}\n\n\t  </modal-body>\n</modal>\n\n\n\n\n\n\n\n\n\t",
                    providers: [register_1.Register]
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef, register_1.Register, platform_browser_1.DomSanitizer])
            ], RegistrationComponent);
            exports_1("RegistrationComponent", RegistrationComponent);
        }
    };
});
//# sourceMappingURL=registration.component.js.map
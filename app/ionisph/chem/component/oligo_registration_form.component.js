System.register(["@angular/core", "rxjs/Rx", "../lib/application_control_manager", "../services/register_oligo", "@angular/platform-browser", "ng2-bs3-modal/ng2-bs3-modal", "../ionisoligo"], function (exports_1, context_1) {
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
    var core_1, application_control_manager_1, register_oligo_1, platform_browser_1, ng2_bs3_modal_1, ionisoligo_1, OligoRegistrationForm;
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
            function (register_oligo_1_1) {
                register_oligo_1 = register_oligo_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (ionisoligo_1_1) {
                ionisoligo_1 = ionisoligo_1_1;
            }
        ],
        execute: function () {
            OligoRegistrationForm = (function () {
                function OligoRegistrationForm(ref, oligoreg, sanitizer) {
                    this.ref = ref;
                    this.oligoreg = oligoreg;
                    this.sanitizer = sanitizer;
                    this.msg = "";
                    this.oligo = new ionisoligo_1.IonisOligo();
                }
                OligoRegistrationForm.prototype.ngOnInit = function () {
                    this.oligo.helm = this.helm;
                };
                OligoRegistrationForm.prototype.register = function () {
                };
                OligoRegistrationForm.prototype.action_successful = function (response) {
                    if (response.msg != null && response.msg.length > 0 && response.isisno != null && response.isisno.length > 0) {
                        this.msg = "Oligo was not registered." + response.msg + " IsisNo:" + response.isisno;
                        this.modal.open('lg');
                    }
                    else {
                        this.msg = response.msg + " IsisNo : " + response.isisno;
                        this.modal.open('lg');
                    }
                };
                OligoRegistrationForm.prototype.action_failed = function (monomer) { };
                OligoRegistrationForm.prototype.qprompt = function (msg) {
                    this.msg = msg;
                    this.modal.open('lg');
                };
                OligoRegistrationForm.prototype.submit = function (event) {
                    if (this.helm == null || this.helm.length <= 0) {
                        this.msg = "Please enter a valid helm string.";
                        this.qprompt(this.msg);
                        return;
                    }
                    this.oligo.helm = this.helm;
                    this.oligoreg.submitAsJSON(this.oligo, this);
                    // this.chemistry.buildOligo(this.helm).subscribe(m=>this.updateStatus ( m ))
                    // OkHttpClient client = new OkHttpClient();
                    // MediaType mediaType = MediaType.parse("application/json");
                    // RequestBody body = RequestBody.create(mediaType, "{}");
                    // Request request = new Request.Builder()
                    //   .url("http://192.168.128.52/wslegacy/v1/register/new_oligo")
                    //   .post(body)
                    //   .addHeader("content-type", "application/json")
                    //   .addHeader("cache-control", "no-cache")
                    //   .addHeader("postman-token", "54253070-1840-f344-e730-4831ef698283")
                    //   .build();
                    // Response response = client.newCall(request).execute();
                };
                return OligoRegistrationForm;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OligoRegistrationForm.prototype, "modal", void 0);
            OligoRegistrationForm = __decorate([
                core_1.Component({
                    selector: 'oligo-registration-form',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    inputs: ['helm'],
                    template: "\n\n <div class=\"panel panel-default\" >\n\t  <div class=\"panel-heading\">Oligo Registration</div>\n\t  <div class=\"panel-body\">\n\n\t\t\t<div  class=\"table-responsive\">\n\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"container\"  style=\"padding: 0px;width: 310px\">\n\t\t\t\t\t\t\t<form class=\"form-vertical\" role=\"form\" style=\"padding: 0px;width: 310px\">\n\t\t\t\t\t\t\t\t<div  class=\"form-group\"  style=\"padding: 0px;width: 300px\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Name:</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #user class=\"form-control\" id=\"usr\" [(ngModel)]=\"oligo.user\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"pwd\">Password:</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"password\" #pass class=\"form-control\" id=\"pwd\" [(ngModel)]=\"oligo.pass\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Notebook</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #notebook class=\"form-control\" id=\"notebook\" [(ngModel)]=\"oligo.notebook\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"usr\">Notebook Page</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" #notebook_page class=\"form-control\" id=\"notebook_page\" [(ngModel)]=\"oligo.notebook_page\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"pwd\">Comment</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<textarea #notebook_comment class=\"form-control input-lg \" isis-multi-paste=\"\" \n\t\t\t\t\t\t\t\t\t\t\t\t[placeholder]=\"'Description...'\" name=\"comment\" [(ngModel)]=\"oligo.comment\" rows=\"2\" wrap=\"Off\" [ngModelOptions]=\"{standalone: true}\"></textarea>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form> \n\t\t\t\t\t\t</div>   \n\t\t\t\t</td>\n\t\t\t</tr>\n\n\n\t\t\t<td>\n\t\t\t\t<tr>\n\n\n\t\t\t\t\t\t\t\t<div  class=\"table-responsive\" style=\"width:300px;margin-left:100px\">\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" (click)=\"cancel()\" class=\"btn btn-info\">Cancel</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" (click)=\"submit($event)\" class=\"btn btn-danger\">Register</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t   </div> \n\n\t\t\t</tr>\n\t\t  </td>\n\n\t\t</div>\n\t</div>\n</div>\n\n\n<modal #modal item-width=\"'400px'\">\n\t  <modal-header [show-close]=\"true\">\n\t  </modal-header>\n\t  <modal-body>\n\n\n\t  {{ msg }}\n\n\t  </modal-body>\n</modal>\n\n\n\n\n\n\n\t",
                    providers: [application_control_manager_1.ApplicationControls, register_oligo_1.RegisterOligo]
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef, register_oligo_1.RegisterOligo, platform_browser_1.DomSanitizer])
            ], OligoRegistrationForm);
            exports_1("OligoRegistrationForm", OligoRegistrationForm);
        }
    };
});
//# sourceMappingURL=oligo_registration_form.component.js.map
System.register(["@angular/core", "./ionisph/chem/services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(save_mon) {
                    this.save_mon = save_mon;
                    this.mode = "lib";
                }
                AppComponent.prototype.hide = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                AppComponent.prototype.loadRegistration = function () {
                    this.mode = "registration";
                };
                AppComponent.prototype.loadSearch = function () {
                    this.mode = "lib";
                };
                AppComponent.prototype.myFunction = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                AppComponent.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                };
                AppComponent.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                AppComponent.prototype.action_failed = function () {
                    this.modal.close();
                };
                AppComponent.prototype.setMode = function (mode) {
                    this.mode = mode;
                };
                AppComponent.prototype.buildunit = function () {
                    this.mode = "unit_builder";
                };
                AppComponent.prototype.buildOligo = function () {
                    this.mode = "oligo_builder";
                };
                AppComponent.prototype.deleteMonomer = function () {
                };
                AppComponent.prototype.librarymanager = function () {
                    this.mode = "monomer_manager";
                };
                AppComponent.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return AppComponent;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], AppComponent.prototype, "modal", void 0);
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'chem-manager',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n      <router-outlet></router-outlet>\n\n    ",
                    providers: [monomer_saver_1.MonomerSaver]
                }),
                __metadata("design:paramtypes", [monomer_saver_1.MonomerSaver])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map
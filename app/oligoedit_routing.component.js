System.register(["@angular/core", "./ionisph/chem/services/monomer_saver", "./ionisph/chem/services/oligo_loader", "ng2-bs3-modal/ng2-bs3-modal", "./ionisph/chem/services/urls", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, oligo_loader_1, ng2_bs3_modal_1, urls_1, router_1, OligoEditRoutingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (oligo_loader_1_1) {
                oligo_loader_1 = oligo_loader_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            OligoEditRoutingComponent = (function () {
                function OligoEditRoutingComponent(route, router, save_mon, oligo_loader) {
                    this.route = route;
                    this.router = router;
                    this.save_mon = save_mon;
                    this.oligo_loader = oligo_loader;
                    this.mode = "lib";
                    this.helm_rules_data_source = urls_1.URLs.helm_rules_datasource;
                }
                OligoEditRoutingComponent.prototype.hide = function () {
                    var _this = this;
                    this.route.params.forEach(function (params) {
                        _this.mode = params['mode'];
                    });
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                OligoEditRoutingComponent.prototype.show = function (object) {
                    this.monomers_display.open('lg');
                };
                OligoEditRoutingComponent.prototype.updateHELM = function (helms) {
                    this.helm = helms;
                };
                OligoEditRoutingComponent.prototype.updateError = function (er) {
                };
                OligoEditRoutingComponent.prototype.loadRegistration = function () {
                    this.mode = "registration";
                };
                OligoEditRoutingComponent.prototype.loadSearch = function () {
                    this.mode = "lib";
                };
                OligoEditRoutingComponent.prototype.myFunction = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                OligoEditRoutingComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                    this.route.params.forEach(function (params) {
                        var id = +params['id']; // (+) converts string 'id' to a number
                        _this.isisno = id;
                    });
                    if (this.isisno != null) {
                        this.oligo_loader.loadOligo(this.isisno, this);
                    }
                };
                OligoEditRoutingComponent.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                OligoEditRoutingComponent.prototype.action_failed = function () {
                    this.modal.close();
                };
                OligoEditRoutingComponent.prototype.setMode = function (mode) {
                    this.mode = mode;
                };
                OligoEditRoutingComponent.prototype.buildunit = function () {
                    this.mode = "unit_builder";
                };
                OligoEditRoutingComponent.prototype.buildOligo = function () {
                    this.mode = "oligo_builder";
                };
                OligoEditRoutingComponent.prototype.deleteMonomer = function () {
                };
                OligoEditRoutingComponent.prototype.librarymanager = function () {
                    this.mode = "monomer_manager";
                };
                OligoEditRoutingComponent.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return OligoEditRoutingComponent;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OligoEditRoutingComponent.prototype, "modal", void 0);
            __decorate([
                core_1.ViewChild('monomer_display'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OligoEditRoutingComponent.prototype, "monomers_display", void 0);
            OligoEditRoutingComponent = __decorate([
                core_1.Component({
                    selector: 'oligo-edit',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n        <div class='panel panel-heading' >\n            <div style=\"padding: 3px\" class=\"btn-group\">\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Monomer Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"show('monomerdb.search')\"> Search </button>\n                </li>\n                </ul>\n            </div>\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">ION Rule Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligoruledb.search.rules')\">Search Rules</button>\n                </li>\n                <li>               \n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligoruledb.create.rule')\">Create Rule</button>\n                </li>\n                </ul>\n            </div>\n\n\n\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Tools\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\"(click)=\"buildOligo()\">HELM structure viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            </div>\n\n            <helm-editor [helm]='helm'></helm-editor>\n            {{ isisno }}\n            {{ helm }}\n\n\n<modal #monomer_display item-width=\"'400px'\">\n\t  <modal-header [show-close]=\"true\">\n\t  </modal-header>\n\t  <modal-body>\n        <monomer-library [enable_editing]='false'></monomer-library>\n\t  </modal-body>\n</modal>\n\n\n\n\n</div>\n\n    ",
                    providers: [monomer_saver_1.MonomerSaver],
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    monomer_saver_1.MonomerSaver, oligo_loader_1.OligoLoader])
            ], OligoEditRoutingComponent);
            exports_1("OligoEditRoutingComponent", OligoEditRoutingComponent);
        }
    };
});
//# sourceMappingURL=oligoedit_routing.component.js.map
System.register(["@angular/core", "./ionisph/chem/services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal", "@angular/router", "./ionisph/chem/services/urls"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, router_1, urls_1, OlgioRoutingComponent;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            OlgioRoutingComponent = (function () {
                function OlgioRoutingComponent(route, router, save_mon) {
                    this.route = route;
                    this.router = router;
                    this.save_mon = save_mon;
                    this.mode = "lib";
                    this.helm_rules_data_source = urls_1.URLs.helm_rules_datasource;
                }
                OlgioRoutingComponent.prototype.hide = function () {
                    var _this = this;
                    this.route.params.forEach(function (params) {
                        _this.mode = params['mode'];
                    });
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                OlgioRoutingComponent.prototype.show = function (object) {
                    this.monomers_display.open('lg');
                };
                OlgioRoutingComponent.prototype.loadRegistration = function () {
                    this.mode = "registration";
                };
                OlgioRoutingComponent.prototype.loadSearch = function () {
                    this.mode = "lib";
                };
                OlgioRoutingComponent.prototype.myFunction = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                OlgioRoutingComponent.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                };
                OlgioRoutingComponent.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                OlgioRoutingComponent.prototype.action_failed = function () {
                    this.modal.close();
                };
                OlgioRoutingComponent.prototype.setMode = function (mode) {
                    this.mode = mode;
                };
                OlgioRoutingComponent.prototype.buildunit = function () {
                    this.mode = "unit_builder";
                };
                OlgioRoutingComponent.prototype.buildOligo = function () {
                    this.mode = "oligo_builder";
                };
                OlgioRoutingComponent.prototype.deleteMonomer = function () {
                };
                OlgioRoutingComponent.prototype.librarymanager = function () {
                    this.mode = "monomer_manager";
                };
                OlgioRoutingComponent.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return OlgioRoutingComponent;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OlgioRoutingComponent.prototype, "modal", void 0);
            __decorate([
                core_1.ViewChild('monomer_display'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], OlgioRoutingComponent.prototype, "monomers_display", void 0);
            OlgioRoutingComponent = __decorate([
                core_1.Component({
                    selector: 'oligo-nav',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n\n        <div class='panel panel-heading' >\n            <div style=\"padding: 3px\" class=\"btn-group\">\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"> Create IONs... \n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"buildOligo()\">Simple Builder</button>\n                </li>\n                <li>\n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('helm_editor')\">MedCHEM Builder</button>\n                </li>\n                <li class=\"divider\"></li>\n                <li>               \n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"loadRegistration()\">SAR Editor</button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">ION Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligodb.search.ion')\">Search IONs</button>\n                </li>\n                <li>               \n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligo_database.search_sequence')\"> Search IONs by target </button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Monomers\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"show('monomerdb.search')\"> Search </button>\n                </li>\n                </ul>\n            </div>\n\n\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">ION Rule Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligoruledb.search.rules')\">Search Rules</button>\n                </li>\n                <li>               \n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligoruledb.create.rule')\">Create Rule</button>\n                </li>\n                </ul>\n            </div>\n\n\n\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Tools\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\"(click)=\"buildOligo()\">HELM structure viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            </div>\n\n                \n\n                <span [ngSwitch]=\"mode\">\n                    <span *ngSwitchCase=\"'lib'\">\n                        <oligo-search [monomer_db]=\"monomer_db\" [mode]=\"'Ions'\"></oligo-search>\n                    </span>\n                    <span *ngSwitchCase=\"'monomer_manager'\">\n                        <monomer-library-manager></monomer-library-manager>\n                    </span>\n                    <span *ngSwitchCase=\"'unit_builder'\">\n                        <unit-builder></unit-builder>\n                    </span>\n                    <span *ngSwitchCase=\"'oligo_builder'\">\n                        <oligo-builder></oligo-builder>\n                    </span>\n                    <span *ngSwitchCase=\"'oligodb.search.ion'\">\n                        <oligo-search [monomer_db]=\"monomer_db\" [mode]=\"'Ions'\"></oligo-search>\n                    </span>\n                    <span *ngSwitchCase=\"'helm_editor'\">\n                        <helm-editor></helm-editor>\n                    </span>\n                    <span *ngSwitchCase=\"'oligoruledb.search.rules'\">\n                        <search-helm-rules [data_source]=\"helm_rules_data_source\"></search-helm-rules>\n                    </span>\n                   \n                    <span *ngSwitchDefault>\n                    </span>\n                </span>\n                \n\n\n\n\n<modal #monomer_display item-width=\"'400px'\">\n\t  <modal-header [show-close]=\"true\">\n\t  </modal-header>\n\t  <modal-body>\n        <monomer-library [enable_editing]='false'></monomer-library>\n\t  </modal-body>\n</modal>\n\n\n\n\n</div>\n\n    ",
                    providers: [monomer_saver_1.MonomerSaver],
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    monomer_saver_1.MonomerSaver])
            ], OlgioRoutingComponent);
            exports_1("OlgioRoutingComponent", OlgioRoutingComponent);
        }
    };
});
//# sourceMappingURL=oligo_routing.component.js.map
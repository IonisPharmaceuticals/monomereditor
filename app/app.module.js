System.register(["@angular/core", "ng2-bs3-modal/ng2-bs3-modal", "@angular/platform-browser", "@angular/forms", "@angular/http", "./ionisph/chem/component/monomer_app.module", "./ionisph/chem/component/unit_app.module", "./ionisph/chem/component/oligo_app.module", "./app.component", "./oligo_routing.component", "./oligoedit_routing.component", "./app.routing", "./topnav.component", "./monomer_routing.component", "./intro.component", "./helm/helm.module", "./helm/rules/rules.module", "@angular/common"], function (exports_1, context_1) {
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
    var core_1, ng2_bs3_modal_1, platform_browser_1, forms_1, http_1, monomer_app_module_1, unit_app_module_1, oligo_app_module_1, app_component_1, oligo_routing_component_1, oligoedit_routing_component_1, app_routing_1, topnav_component_1, monomer_routing_component_1, intro_component_1, helm_module_1, rules_module_1, common_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (monomer_app_module_1_1) {
                monomer_app_module_1 = monomer_app_module_1_1;
            },
            function (unit_app_module_1_1) {
                unit_app_module_1 = unit_app_module_1_1;
            },
            function (oligo_app_module_1_1) {
                oligo_app_module_1 = oligo_app_module_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (oligo_routing_component_1_1) {
                oligo_routing_component_1 = oligo_routing_component_1_1;
            },
            function (oligoedit_routing_component_1_1) {
                oligoedit_routing_component_1 = oligoedit_routing_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (topnav_component_1_1) {
                topnav_component_1 = topnav_component_1_1;
            },
            function (monomer_routing_component_1_1) {
                monomer_routing_component_1 = monomer_routing_component_1_1;
            },
            function (intro_component_1_1) {
                intro_component_1 = intro_component_1_1;
            },
            function (helm_module_1_1) {
                helm_module_1 = helm_module_1_1;
            },
            function (rules_module_1_1) {
                rules_module_1 = rules_module_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        monomer_app_module_1.MonomerAppModule,
                        unit_app_module_1.UnitAppModule,
                        oligo_app_module_1.OligoAppModule,
                        ng2_bs3_modal_1.Ng2Bs3ModalModule,
                        helm_module_1.HELMModule,
                        rules_module_1.RulesModule,
                        app_routing_1.routing
                    ],
                    declarations: [app_component_1.AppComponent, oligoedit_routing_component_1.OligoEditRoutingComponent, oligo_routing_component_1.OlgioRoutingComponent, topnav_component_1.TopNavComponent, monomer_routing_component_1.MonomerRoutingComponent, intro_component_1.IntroComponent],
                    bootstrap: [app_component_1.AppComponent],
                    providers: [
                        app_routing_1.appRoutingProviders,
                        { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
                    ],
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map
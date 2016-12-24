System.register(["@angular/core", '@angular/platform-browser', '@angular/forms', '../lib/monomer_db', "./oligo_builder.component", "./oligo_database_manager.component", "./oligo_database_search.component", '../services/monomerloader', './monomer_app.module', '../../../helm/helm.module', './pistoia_helm_editor.component', '../chem.module', './oligo_chemistry_summary', './oligo_app.routing', '../services/oligo_loader', 'ng2-bs3-modal/ng2-bs3-modal', './../../../helm/rules/rules.module', './oligo_registration_form.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, forms_1, monomer_db_1, oligo_builder_component_1, oligo_database_manager_component_1, oligo_database_search_component_1, monomerloader_1, monomer_app_module_1, helm_module_1, pistoia_helm_editor_component_1, chem_module_1, oligo_chemistry_summary_1, oligo_app_routing_1, oligo_loader_1, ng2_bs3_modal_1, rules_module_1, oligo_registration_form_component_1;
    var OligoAppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (oligo_builder_component_1_1) {
                oligo_builder_component_1 = oligo_builder_component_1_1;
            },
            function (oligo_database_manager_component_1_1) {
                oligo_database_manager_component_1 = oligo_database_manager_component_1_1;
            },
            function (oligo_database_search_component_1_1) {
                oligo_database_search_component_1 = oligo_database_search_component_1_1;
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (monomer_app_module_1_1) {
                monomer_app_module_1 = monomer_app_module_1_1;
            },
            function (helm_module_1_1) {
                helm_module_1 = helm_module_1_1;
            },
            function (pistoia_helm_editor_component_1_1) {
                pistoia_helm_editor_component_1 = pistoia_helm_editor_component_1_1;
            },
            function (chem_module_1_1) {
                chem_module_1 = chem_module_1_1;
            },
            function (oligo_chemistry_summary_1_1) {
                oligo_chemistry_summary_1 = oligo_chemistry_summary_1_1;
            },
            function (oligo_app_routing_1_1) {
                oligo_app_routing_1 = oligo_app_routing_1_1;
            },
            function (oligo_loader_1_1) {
                oligo_loader_1 = oligo_loader_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (rules_module_1_1) {
                rules_module_1 = rules_module_1_1;
            },
            function (oligo_registration_form_component_1_1) {
                oligo_registration_form_component_1 = oligo_registration_form_component_1_1;
            }],
        execute: function() {
            OligoAppModule = (function () {
                function OligoAppModule() {
                }
                OligoAppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            chem_module_1.ChemModule,
                            monomer_app_module_1.MonomerAppModule,
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            helm_module_1.HELMModule,
                            oligo_app_routing_1.oligosRouting,
                            ng2_bs3_modal_1.Ng2Bs3ModalModule,
                            rules_module_1.RulesModule,
                        ],
                        declarations: [
                            oligo_builder_component_1.OligoBuilder, oligo_database_search_component_1.OligoDatabaseSearch, oligo_database_manager_component_1.OligoDatabaseManager, pistoia_helm_editor_component_1.PistoiaHELMEditor, oligo_chemistry_summary_1.OligoChemistrySummary, oligo_registration_form_component_1.OligoRegistrationForm],
                        exports: [oligo_database_search_component_1.OligoDatabaseSearch, oligo_builder_component_1.OligoBuilder],
                        providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, oligo_loader_1.OligoLoader]
                    }), 
                    __metadata('design:paramtypes', [])
                ], OligoAppModule);
                return OligoAppModule;
            }());
            exports_1("OligoAppModule", OligoAppModule);
        }
    }
});
//# sourceMappingURL=oligo_app.module.js.map
System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "../lib/monomer_db", "../component/monomer_manager.component", "../lib/application_control_manager", "ng2-bs3-modal/ng2-bs3-modal", "../lib/search_monomers.2.component", "./monomer_registration.2.component", "./ketcher.2.component", "./newmonomer.component", "../services/monomerloader", "./register_monomer_editor.component", "./monomer_list.component", "./monomer_editor.component", "./monomer_group.component", "./util/search_monomer.component", "./legacy_monomer_group.component", "../pipes/legacy_id_filter", "../pipes/ispublic", "./substructure_group.component", "../pipes/monomer_filter", "../pipes/monomer_name_filter", "./util/legacy_search_monomer.component", "./monomer/monomer_summary.component", "./monomer_library_manager.component"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, monomer_db_1, monomer_manager_component_1, application_control_manager_1, ng2_bs3_modal_1, search_monomers_2_component_1, monomer_registration_2_component_1, ketcher_2_component_1, newmonomer_component_1, monomerloader_1, register_monomer_editor_component_1, monomer_list_component_1, monomer_editor_component_1, monomer_group_component_1, search_monomer_component_1, legacy_monomer_group_component_1, legacy_id_filter_1, ispublic_1, substructure_group_component_1, monomer_filter_1, monomer_name_filter_1, legacy_search_monomer_component_1, monomer_summary_component_1, monomer_library_manager_component_1, MonomerAppModule;
    return {
        setters: [
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
            function (monomer_manager_component_1_1) {
                monomer_manager_component_1 = monomer_manager_component_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (search_monomers_2_component_1_1) {
                search_monomers_2_component_1 = search_monomers_2_component_1_1;
            },
            function (monomer_registration_2_component_1_1) {
                monomer_registration_2_component_1 = monomer_registration_2_component_1_1;
            },
            function (ketcher_2_component_1_1) {
                ketcher_2_component_1 = ketcher_2_component_1_1;
            },
            function (newmonomer_component_1_1) {
                newmonomer_component_1 = newmonomer_component_1_1;
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (register_monomer_editor_component_1_1) {
                register_monomer_editor_component_1 = register_monomer_editor_component_1_1;
            },
            function (monomer_list_component_1_1) {
                monomer_list_component_1 = monomer_list_component_1_1;
            },
            function (monomer_editor_component_1_1) {
                monomer_editor_component_1 = monomer_editor_component_1_1;
            },
            function (monomer_group_component_1_1) {
                monomer_group_component_1 = monomer_group_component_1_1;
            },
            function (search_monomer_component_1_1) {
                search_monomer_component_1 = search_monomer_component_1_1;
            },
            function (legacy_monomer_group_component_1_1) {
                legacy_monomer_group_component_1 = legacy_monomer_group_component_1_1;
            },
            function (legacy_id_filter_1_1) {
                legacy_id_filter_1 = legacy_id_filter_1_1;
            },
            function (ispublic_1_1) {
                ispublic_1 = ispublic_1_1;
            },
            function (substructure_group_component_1_1) {
                substructure_group_component_1 = substructure_group_component_1_1;
            },
            function (monomer_filter_1_1) {
                monomer_filter_1 = monomer_filter_1_1;
            },
            function (monomer_name_filter_1_1) {
                monomer_name_filter_1 = monomer_name_filter_1_1;
            },
            function (legacy_search_monomer_component_1_1) {
                legacy_search_monomer_component_1 = legacy_search_monomer_component_1_1;
            },
            function (monomer_summary_component_1_1) {
                monomer_summary_component_1 = monomer_summary_component_1_1;
            },
            function (monomer_library_manager_component_1_1) {
                monomer_library_manager_component_1 = monomer_library_manager_component_1_1;
            }
        ],
        execute: function () {
            MonomerAppModule = (function () {
                function MonomerAppModule() {
                }
                return MonomerAppModule;
            }());
            MonomerAppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        ng2_bs3_modal_1.Ng2Bs3ModalModule,
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule
                    ],
                    declarations: [
                        search_monomers_2_component_1.SearchMonomers2Component,
                        monomer_registration_2_component_1.MonomerRegistration2Component,
                        ketcher_2_component_1.Ketcher2Component,
                        newmonomer_component_1.NewMonomer,
                        register_monomer_editor_component_1.RegisterMonomerEditor,
                        monomer_list_component_1.MonomerList,
                        monomer_editor_component_1.MonomerEditor,
                        monomer_group_component_1.MonomerGroup,
                        monomer_library_manager_component_1.MonomerLibraryManager,
                        search_monomer_component_1.SearchMonomers,
                        legacy_monomer_group_component_1.LegacyMonomerGroup,
                        legacy_search_monomer_component_1.LegacySearchMonomers,
                        substructure_group_component_1.SubstructureGroup,
                        monomer_filter_1.MonomerFilter,
                        monomer_name_filter_1.MonomerNameFilter,
                        ispublic_1.IsPublicFilter,
                        legacy_id_filter_1.LegacyIDFilter,
                        monomer_summary_component_1.MonomerSummary,
                        monomer_manager_component_1.MonomerManager
                    ],
                    exports: [search_monomers_2_component_1.SearchMonomers2Component, monomer_library_manager_component_1.MonomerLibraryManager],
                    // pipes: [MonomerFilter, IsPublicFilter],
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, application_control_manager_1.ApplicationControls, legacy_id_filter_1.LegacyIDFilter]
                }),
                __metadata("design:paramtypes", [])
            ], MonomerAppModule);
            exports_1("MonomerAppModule", MonomerAppModule);
        }
    };
});
//# sourceMappingURL=monomer_app.module.js.map
System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "../lib/monomer_db", "../lib/application_control_manager", "ng2-bs3-modal/ng2-bs3-modal", "./unit_builder.component", "./unit_display.component", "./unit_viewer.component", "../services/monomerloader", "../pipes/legacy_id_filter", "./monomer_app.module"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, monomer_db_1, application_control_manager_1, ng2_bs3_modal_1, unit_builder_component_1, unit_display_component_1, unit_viewer_component_1, monomerloader_1, legacy_id_filter_1, monomer_app_module_1, UnitAppModule;
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
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (unit_builder_component_1_1) {
                unit_builder_component_1 = unit_builder_component_1_1;
            },
            function (unit_display_component_1_1) {
                unit_display_component_1 = unit_display_component_1_1;
            },
            function (unit_viewer_component_1_1) {
                unit_viewer_component_1 = unit_viewer_component_1_1;
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (legacy_id_filter_1_1) {
                legacy_id_filter_1 = legacy_id_filter_1_1;
            },
            function (monomer_app_module_1_1) {
                monomer_app_module_1 = monomer_app_module_1_1;
            }
        ],
        execute: function () {
            UnitAppModule = (function () {
                function UnitAppModule() {
                }
                return UnitAppModule;
            }());
            UnitAppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        ng2_bs3_modal_1.Ng2Bs3ModalModule,
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        monomer_app_module_1.MonomerAppModule
                    ],
                    declarations: [
                        unit_builder_component_1.UnitBuilder, unit_display_component_1.UnitDisplay, unit_viewer_component_1.UnitViewerComponent
                    ],
                    exports: [unit_builder_component_1.UnitBuilder],
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, application_control_manager_1.ApplicationControls, legacy_id_filter_1.LegacyIDFilter]
                }),
                __metadata("design:paramtypes", [])
            ], UnitAppModule);
            exports_1("UnitAppModule", UnitAppModule);
        }
    };
});
//# sourceMappingURL=unit_app.module.js.map
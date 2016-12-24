System.register(["@angular/forms", "@angular/core", "@angular/platform-browser", "ag-grid-ng2/main", "ng2-bs3-modal/ng2-bs3-modal", "./results_table.component"], function (exports_1, context_1) {
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
    var forms_1, core_1, platform_browser_1, main_1, ng2_bs3_modal_1, results_table_component_1, ResultsTableModule;
    return {
        setters: [
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (results_table_component_1_1) {
                results_table_component_1 = results_table_component_1_1;
            }
        ],
        execute: function () {
            ResultsTableModule = (function () {
                function ResultsTableModule() {
                }
                return ResultsTableModule;
            }());
            ResultsTableModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        main_1.AgGridModule,
                        ng2_bs3_modal_1.Ng2Bs3ModalModule,
                        forms_1.FormsModule,
                    ],
                    declarations: [results_table_component_1.ResultsTable],
                    exports: [results_table_component_1.ResultsTable],
                }),
                __metadata("design:paramtypes", [])
            ], ResultsTableModule);
            exports_1("ResultsTableModule", ResultsTableModule);
        }
    };
});
//# sourceMappingURL=results_table.module.js.map
System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, http_1, HELMRulesSearch;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            HELMRulesSearch = (function () {
                function HELMRulesSearch(_http, ref) {
                    this._http = _http;
                    this.ref = ref;
                    this.search_text = "";
                    this.search_description = "rule id or rule function name";
                    this.data_source = "";
                    this.helm_rules_resource = "";
                }
                HELMRulesSearch.prototype.ngOnInit = function () {
                    if (this.data_source != null && this.data_source.length > 0) {
                        this.helm_rules_resource = this.data_source;
                    }
                };
                HELMRulesSearch.prototype.onSubmit = function (event) {
                    var value = this.search_text.trim().replace(' ', '');
                };
                return HELMRulesSearch;
            }());
            HELMRulesSearch = __decorate([
                core_1.Component({
                    selector: 'search-helm-rules',
                    templateUrl: './app/helm/rules/helm_rules_search.html',
                    inputs: ["data_source"],
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef])
            ], HELMRulesSearch);
            exports_1("HELMRulesSearch", HELMRulesSearch);
        }
    };
});
//# sourceMappingURL=helm_rules_search.component.js.map
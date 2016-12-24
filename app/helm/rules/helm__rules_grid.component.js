System.register(["@angular/core", "@angular/http", "rxjs/Observable", "./../../ui/gridmanager"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, gridmanager_1, GroupInnerRowComponent, HELMRulesGrid;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (gridmanager_1_1) {
                gridmanager_1 = gridmanager_1_1;
            }
        ],
        execute: function () {
            GroupInnerRowComponent = (function () {
                function GroupInnerRowComponent() {
                }
                GroupInnerRowComponent.prototype.agInit = function (params) {
                    this.params = params;
                };
                return GroupInnerRowComponent;
            }());
            GroupInnerRowComponent = __decorate([
                core_1.Component({
                    selector: 'group-row-cell',
                    template: "{{params}}"
                }),
                __metadata("design:paramtypes", [])
            ], GroupInnerRowComponent);
            HELMRulesGrid = (function () {
                function HELMRulesGrid(_http, ref) {
                    this._http = _http;
                    this.ref = ref;
                    this.uri_ref = 'http://127.0.0.1:8000/oligo_library/list_oligos?start=0&length=1000';
                    this.start = 0;
                    this.length = 1000;
                    this.selected = new core_1.EventEmitter();
                }
                HELMRulesGrid.prototype.update = function (mode, url) {
                    var _this = this;
                    this.uri_ref = url;
                    this._http.get(this.uri_ref)
                        .map(this.extract_data)
                        .catch(this.handleError).subscribe(function (json) { return _this.set_data(json); }, function (error) { return _this.errorMessage = error; });
                };
                // deprecated 
                HELMRulesGrid.prototype.set_selected = function (_seobject) {
                };
                HELMRulesGrid.prototype.fieldDataSelected = function (field, values) {
                };
                HELMRulesGrid.prototype.ngOnInit = function () {
                    var _this = this;
                    this.grid_manager.addInteractionListener(this);
                    this.grid_manager.addDataListener(this);
                    this._http.get(this.uri_ref)
                        .map(this.extract_data)
                        .catch(this.handleError).subscribe(function (json) { return _this.set_data(json); }, function (error) { return _this.errorMessage = error; });
                };
                HELMRulesGrid.prototype.set_data = function (data) {
                    // let d = [
                    //         {
                    //             "helm": "RNA1{[moe](G)[sp].[moe](G)p.[moe](A)p.[moe](A)p.[moe](A)p.d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].[moe]([m5C])p.[moe](A)p.[moe]([m5C])[sp].[moe](A)[sp].[moe]([m5C])}$$$$",
                    //             "isisno": "619169"
                    //         },
                    //         {
                    //             "helm": "RNA1{[cet](A)[sp].[cet](A)p.[moe](T)p.[moe](T)p.[moe](A)[sp].[cet](T)[sp].d([m5C])[sp].d([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d(T)[sp].d(G)[sp].d([m5C])[sp].[cet](T)p.[moe]([m5C])p.[moe]([m5C])[sp].[cet](T)[sp].[cet](T)}$$$$",
                    //             "isisno": "615678"
                    //         },
                    //         {
                    //             "helm": "RNA1{[moe](T)[sp].[moe](T)p.[moe](T)p.[moe]([m5C])[sp].d(A)[sp].d(A)[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d([m5C])[sp].d(A)[sp].d([m5C])[sp].[moe]([m5C])p.[moe](T)p.[moe](T)p.[moe]([m5C])[sp].[moe](A)[sp].[moe](T)}$$$$",
                    //             "isisno": "625448"
                    //         }];
                    this.data = data;
                    this.ref.markForCheck();
                };
                HELMRulesGrid.prototype.extract_data = function (res) {
                    var body = res.json();
                    return body;
                };
                HELMRulesGrid.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                HELMRulesGrid.prototype.click = function (event) {
                    var srows = event.api.getSelectedRows();
                    this.set_selected(srows);
                };
                HELMRulesGrid.prototype.onModelUpdated = function (event) {
                    // console.log ( ' module is updated ');
                };
                return HELMRulesGrid;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], HELMRulesGrid.prototype, "selected", void 0);
            HELMRulesGrid = __decorate([
                core_1.Component({
                    selector: 'helmrules-grid',
                    inputs: ['uri_ref', 'grid_manager'],
                    templateUrl: 'app/helm/helm_grid.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [gridmanager_1.GridManager]
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef])
            ], HELMRulesGrid);
            exports_1("HELMRulesGrid", HELMRulesGrid);
        }
    };
});
//# sourceMappingURL=helm__rules_grid.component.js.map
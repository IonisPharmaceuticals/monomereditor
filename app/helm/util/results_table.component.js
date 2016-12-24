System.register(["@angular/core", "@angular/http", "rxjs/Observable"], function (exports_1, context_1) {
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
    function render_cell(params) {
        //    if ( params != null && params.data != null ){
        //     // let hr = "<a href='http://birdbeta.isisph.com/ri/#/oligos/"  + params.data.isisno + "' class='btn btn-secondary btn-small' role='button'>Detail</a>"
        //     return hr;
        //    }else
        //    {
        return "";
        //    }
    }
    var core_1, http_1, Observable_1, LinkoutRenderComponent, ResultsTable;
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
            }
        ],
        execute: function () {
            LinkoutRenderComponent = (function () {
                function LinkoutRenderComponent() {
                }
                LinkoutRenderComponent.prototype.agInit = function (params) {
                    this.params = params;
                };
                return LinkoutRenderComponent;
            }());
            LinkoutRenderComponent = __decorate([
                core_1.Component({
                    selector: 'linkout-cell',
                    template: "linkout cell-->"
                }),
                __metadata("design:paramtypes", [])
            ], LinkoutRenderComponent);
            ResultsTable = (function () {
                function ResultsTable(_http, ref, _viewContainerRef) {
                    this._http = _http;
                    this.ref = ref;
                    this._viewContainerRef = _viewContainerRef;
                    this.display_status = "show_grid";
                    this.start = 0;
                    this.length = 1000;
                    this.fields = ["isisno", "helm"];
                    this.headers = ["ION", "HELM"];
                    this.field_widths = [100, 1000];
                    this.notify_selection_on_field = 'helm';
                    this.columns = [];
                }
                ResultsTable.prototype.ngOnChanges = function (changes) {
                    if (this.data == null || Object.keys(this.data).length <= 0) {
                        this.display_status = "show_no_results";
                    }
                    else {
                        this.display_status = "show_grid";
                    }
                };
                ResultsTable.prototype.ngOnInit = function () {
                    if (this.data == null || Object.keys(this.data).length <= 0) {
                        this.display_status = "show_no_results";
                    }
                    else {
                        this.display_status = "show_grid";
                    }
                    this.columns = [];
                    var ind = 0;
                    for (var i in this.fields) {
                        var field = this.fields[i];
                        var header = this.headers[i];
                        var field_width = this.field_widths[i];
                        this.columns.push({ headerName: header, field: field,
                            width: field_width,
                            editable: false,
                        });
                        ind++;
                    }
                    this.columns.push({
                        headerName: '',
                        cellRenderer: render_cell, pinned: true,
                        field: 'linkout',
                        width: 100
                    });
                    this.grid = {
                        columnDefs: this.columns,
                        enableColResize: true,
                        enableSorting: true,
                        enableFilter: true,
                    };
                };
                ResultsTable.prototype.set_data = function (data) {
                    this.data = data;
                    if (this.data == null || Object.keys(this.data).length <= 0) {
                        this.display_status = "show_no_results";
                    }
                    else {
                        this.display_status = "show_grid";
                    }
                    this.ref.markForCheck();
                };
                ResultsTable.prototype.extract_data = function (res) {
                    var body = res.json();
                    return body;
                };
                ResultsTable.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ResultsTable.prototype.click = function (event) {
                    var srows = event.api.getSelectedRows();
                    var row = {};
                    if (this.table_manager != null) {
                        this.table_manager.notifyInteractionListeners(event.data);
                    }
                };
                ResultsTable.prototype.onModelUpdated = function (event) {
                };
                return ResultsTable;
            }());
            ResultsTable = __decorate([
                core_1.Component({
                    selector: 'uri-result-table',
                    inputs: ['data', 'fields', 'headers', 'field_widths', 'table_manager', 'notify_selection_on_field'],
                    template: "\n            <span [ngSwitch]=\"display_status\">\n                  <span *ngSwitchCase=\"'show_grid'\">\n                        <ag-grid-ng2 id=\"helm_grid\" #agGrid style=\"height:100%;width:100%;font-size:small\" class=\"ag-material\" [gridOptions]=\"grid\" \n                        [enableFilter]=\"true\" (modelUpdated)=\"onModelUpdated($event)\" \n                        rowSelection=\"multiple\" (cellClicked)=\"click($event)\" [rowData]=\"data\" rowHeight=\"40\" [showToolPanel]=\"'true'\">\n                        </ag-grid-ng2>\n                    </span>\n                     <span *ngSwitchCase=\"'show_no_results'\" style=\"font-color:lightGray\" padding=\"20\">\n                                <h4>No Results found.</h4>\n                     </span>\n            </span>\n\n    ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                }),
                __metadata("design:paramtypes", [http_1.Http,
                    core_1.ChangeDetectorRef,
                    core_1.ViewContainerRef])
            ], ResultsTable);
            exports_1("ResultsTable", ResultsTable);
        }
    };
});
//# sourceMappingURL=results_table.component.js.map
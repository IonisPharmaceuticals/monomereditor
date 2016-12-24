System.register(["@angular/http", "@angular/core", "rxjs/Observable", "rxjs/Rx", "../services/urls", "../../../ui/gridmanager", "@angular/router"], function (exports_1, context_1) {
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
    var http_1, core_1, Observable_1, urls_1, gridmanager_1, router_1, OligoDatabaseSearch;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            },
            function (gridmanager_1_1) {
                gridmanager_1 = gridmanager_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            OligoDatabaseSearch = (function () {
                function OligoDatabaseSearch(ref, http, gridManager, router) {
                    this.ref = ref;
                    this.http = http;
                    this.gridManager = gridManager;
                    this.router = router;
                    this.search_status = '';
                    this.results_uri = 'http://127.0.0.1:8000/oligo_library/get_oligos?isisno=619169,615678,625448'; //http://127.0.0.1:8000/oligo_library/list_oligos?start=0&length=1000';
                    this.selectedid = "";
                    this.mode = "Ions";
                    this.search_description = "";
                    this.helm = "";
                    this.search_description = "  ";
                    this.gridManager = gridManager;
                }
                OligoDatabaseSearch.prototype.setMode = function (mode) {
                    this.mode = mode;
                    if (mode == 'Ions') {
                        this.search_description = "Enter Ion numbers";
                    }
                    else if (mode == 'Sequence') {
                        this.search_description = "Enter an oligo base sequence";
                    }
                    else if (mode == "HELM") {
                        this.search_description = "Enter a HELM string";
                    }
                    else {
                        this.search_description = "";
                    }
                };
                OligoDatabaseSearch.prototype.fieldDataSelected = function (field, data) {
                    if (data != null && data.length > 0) {
                        this.helm = data[0];
                    }
                    this.ref.markForCheck();
                };
                OligoDatabaseSearch.prototype.onSubmit = function (event) {
                    if (this.mode == OligoDatabaseSearch.IONS) {
                        var value = this.search_text.trim().replace(' ', '');
                        // search via a list of oligos 
                        if (value.indexOf(',') > 0) {
                            this.results_uri = urls_1.URLs.build_oligo_list_url(value.trim());
                            this.gridManager.setUri(gridmanager_1.GridManager.LIST, this.results_uri);
                        }
                        else if (/^[a-zA-Z]+$/.test(value)) {
                            // search using analog sequence 
                            this.results_uri = urls_1.URLs.build_oligo_list_url_for_sequence(value.trim());
                        }
                        else if (/^\d+$/.test(value)) {
                            if (value != null && value != undefined) {
                                var ival = +value;
                                this.results_uri = urls_1.URLs.build_oligo_list_url(value);
                                this.gridManager.setUri(gridmanager_1.GridManager.SUMMARY, this.results_uri);
                            }
                        }
                    }
                    console.log(' url ' + this.results_uri);
                };
                /**
                 *  This is data coming from the grids
                 */
                OligoDatabaseSearch.prototype.set_selected = function (selected) {
                    // this.helm = selected.helm;
                    console.log(' we have the ion? ' + selected);
                };
                OligoDatabaseSearch.prototype.valuechange = function (value) {
                    // implementing anything here will update on keystrokes in the text search box. 
                };
                OligoDatabaseSearch.prototype.ngOnInit = function () {
                    this.gridManager.addInteractionListener(this);
                };
                OligoDatabaseSearch.prototype.handleError = function (error) {
                    this.search_status = error.toString();
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return OligoDatabaseSearch;
            }());
            OligoDatabaseSearch.IONS = "Ions";
            OligoDatabaseSearch = __decorate([
                core_1.Component({
                    selector: 'oligo-search',
                    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'mode'],
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    templateUrl: 'app/ionisph/chem/component/templates/oligo_search.html',
                    providers: [gridmanager_1.GridManager],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef, http_1.Http, gridmanager_1.GridManager, router_1.Router])
            ], OligoDatabaseSearch);
            exports_1("OligoDatabaseSearch", OligoDatabaseSearch);
        }
    };
});
//# sourceMappingURL=oligo_database_search.component.js.map
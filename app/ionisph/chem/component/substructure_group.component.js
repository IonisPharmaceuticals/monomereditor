System.register(["@angular/http", "@angular/core", "rxjs/Observable", "../lib/monomer_db", "rxjs/Rx", "../services/monomerloader", "../lib/application_control_manager", "../services/urls"], function (exports_1, context_1) {
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
    var http_1, core_1, Observable_1, monomer_db_1, monomerloader_1, application_control_manager_1, urls_1, SubstructureGroup;
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
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (_1) {
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            SubstructureGroup = (function () {
                function SubstructureGroup(monomer_loader, ref, http) {
                    this.monomer_loader = monomer_loader;
                    this.ref = ref;
                    this.http = http;
                    this.ispublic = "*";
                    this.search_status = '';
                }
                SubstructureGroup.prototype.updateSelectedStructure = function (ionisMon, msg) {
                };
                SubstructureGroup.prototype.updateSelectedSubstructureList = function (substructureList) {
                    //this.monomers = this.listWithSubstructureFilter(substructureList);
                    this.ref.markForCheck();
                };
                SubstructureGroup.prototype.ngOnInit = function () {
                    if (this.monomer_db != null) {
                    }
                    if (this.monomer_manager != undefined) {
                        this.monomer_manager.addListener(this);
                    }
                };
                SubstructureGroup.prototype.validateCurrentStructure = function () {
                    var _this = this;
                    var searchTerm = this.monomer_manager.getViewerSmiles();
                    if (searchTerm && searchTerm.length > 1) {
                        var encoded_smiles = encodeURIComponent(searchTerm);
                        var uri = urls_1.URLs.substructureurl + "smarts=" + encoded_smiles;
                        //var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
                        //let options = new RequestOptions({headers: headers});
                        this.search_status = "Searching..." + encoded_smiles;
                        this.http.get(uri)
                            .map(function (response) { return response.json(); })
                            .catch(this.handleError).subscribe(function (results) { return _this.setResults(results); });
                    }
                };
                SubstructureGroup.prototype.setResults = function (results) {
                    this.search_status = '';
                    if (results) {
                        this.hits = results.hits;
                    }
                    this.ref.detectChanges();
                };
                SubstructureGroup.prototype.handleError = function (error) {
                    this.search_status = error.toString();
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                SubstructureGroup.prototype.loadstructure = function (input) {
                    var _this = this;
                    this.monomer_loader.getMonomer(+input.monomer_id).subscribe(function (mon) { return _this.monomer_manager.setSelectedMonomer(mon); });
                };
                SubstructureGroup.prototype.list = function () {
                    var ion = new Array();
                    var index = 0;
                    var sub = this.monomer_manager.substructure_set;
                    if (sub != undefined && sub.length > 0) {
                        for (var propName in this.monomer_db) {
                            var i = this.monomer_db[propName];
                            for (var ss in sub) {
                                if (sub[ss].symbol == i.monomer.alternateId) {
                                    ion.push(i);
                                }
                            }
                        }
                    }
                    return ion;
                };
                SubstructureGroup.prototype.listWithSubstructureFilter = function (sub) {
                    var ion = new Array();
                    var index = 0;
                    if (sub != undefined && sub.length > 0) {
                        for (var propName in this.monomer_db) {
                            var i = this.monomer_db[propName];
                            for (var ss in sub) {
                                var h = sub[ss];
                                console.log(h.symbol);
                                if (sub[ss].symbol == i.monomer.alternateId) {
                                    ion.push(i);
                                }
                            }
                        }
                    }
                    return ion;
                };
                SubstructureGroup.prototype.getids = function (m, type) {
                    var vals = new Array();
                    var idstr;
                    if (type == 'Endcaps') {
                        if (!m.endcapID) {
                            return vals;
                        }
                        if (m.endcapID == '-') {
                            return vals;
                        }
                        idstr = m.endcapID;
                    }
                    else if (type == 'Linkers') {
                        if (!m.linkerId) {
                            return vals;
                        }
                        if (m.linkerId == '-') {
                            return vals;
                        }
                        idstr = m.linkerId;
                    }
                    else if (type == 'Bases') {
                        if (!m.het_id) {
                            return vals;
                        }
                        if (m.het_id == '-') {
                            return vals;
                        }
                        idstr = m.het_id;
                    }
                    else if (type == 'Sugars') {
                        if (!m.sugarId) {
                            return vals;
                        }
                        if (m.sugarId == '-') {
                            return vals;
                        }
                        idstr = m.sugarId;
                    }
                    var sp = idstr.split(',');
                    for (var s in sp) {
                        var i = Number.parseInt(s);
                        vals.push(i);
                    }
                    return vals;
                };
                return SubstructureGroup;
            }());
            SubstructureGroup = __decorate([
                core_1.Component({
                    selector: 'substructure-group',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'ispublic'],
                    //changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n       <div class=\"panel default-color0\" style=\"padding: 2px\">\n        <p style=\"padding-left: 20px\">\n        \n        The following will take the structure displayed in the viewer and search the Ionis monomer database for similar structures.\n        \n         <button type=\"button\" (click)=\"validateCurrentStructure()\" class=\"btn btn-primary\"> Search MonomerDB... </button>\n         </p>\n        <!--<validate-structure [smiles]=\"searchTerm\"></validate-structure>-->\n        <p style=\"padding: 2px;\">\n        {{ search_status }}\n        </p>\n         <!--<div *ngIf=\"hits.length == 0\" style=\"padding: 5px\">-->\n            <!--No monomers found with current structure.-->\n         <!--</div>-->\n         <div *ngIf=\"hits\" class='tabContainer'>\n                      <ul>\n                       <li *ngFor='let hit of hits; let i=index'>\n                            <!--<input type=\"text\" #input>-->\n                            <div class=\"btn btn-secondary-outline btn-xs\" id={{i}} type=\"input\" (click)=\"loadstructure(hit)\" #input>\n                            ({{hit.monomer_id}}) {{hit.symbol}}\n                                <div *ngIf=\"hit.hit_type=='exact'\" style=\"color: indianred\">\n                                    Exact match\n                                </div>\n                            </div>\n\n                       </li>\n                      </ul>\n          </div>\n          </div>\n\n    ",
                    // pipes: [MonomerFilter, IsPublicFilter],
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, application_control_manager_1.ApplicationControls]
                }),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, core_1.ChangeDetectorRef, http_1.Http])
            ], SubstructureGroup);
            exports_1("SubstructureGroup", SubstructureGroup);
        }
    };
});
//# sourceMappingURL=substructure_group.component.js.map
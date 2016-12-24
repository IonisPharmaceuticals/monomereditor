System.register(["@angular/core", "@angular/http", "../lib/monomer_db", "rxjs/Rx", "../component/monomer_manager.component", "../lib/application_control_manager", "../services/monomerloader", "../services/monomer_saver"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, monomer_db_1, monomer_manager_component_1, application_control_manager_1, monomerloader_1, monomer_saver_1, UnitBuilder;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (_1) {
            },
            function (monomer_manager_component_1_1) {
                monomer_manager_component_1 = monomer_manager_component_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            }
        ],
        execute: function () {
            UnitBuilder = (function () {
                function UnitBuilder(monomer_loader, monomer_saver, ref, http) {
                    var _this = this;
                    this.monomer_loader = monomer_loader;
                    this.monomer_saver = monomer_saver;
                    this.ref = ref;
                    this.selectedGroup = "Any";
                    this.monomer_type = "any";
                    this.app_control = new application_control_manager_1.ApplicationControls();
                    this.monomer_manager = new monomer_manager_component_1.MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
                    var intervalId = setInterval(function () {
                        if (_this.monomer_db) {
                            clearInterval(intervalId);
                            _this.ref.markForCheck();
                        }
                    }, 1000);
                    this.monomer_loader.getMonomers().subscribe(function (monomers) { return _this.setMonomerDatabase(monomers); });
                }
                UnitBuilder.prototype.setMonomerDatabase = function (mdb) {
                    if (!this.monomer_db) {
                        this.monomer_db = new monomer_db_1.MonomerDB();
                    }
                    this.monomer_db.monomers = mdb;
                    this.monomer_manager.setMonomer_db(this.monomer_db);
                    this.ref.markForCheck();
                };
                UnitBuilder.prototype.newMonomer = function () {
                };
                UnitBuilder.prototype.ngOnInit = function () {
                    if (this.monomer_manager) {
                        this.monomer_manager.addListener(this);
                    }
                    if (this.app_control != undefined) {
                        this.app_control.addListener(this);
                        this.app_control.notifyOfNewMonomerState();
                    }
                };
                UnitBuilder.prototype.updatevalue = function (elem) {
                    var selectedval = elem.value;
                    this.selectedGroup = selectedval;
                    // console.log(this.selectedGroup + " ___selected " + selectedval);
                };
                UnitBuilder.prototype.updateGroup = function (ngroup) {
                    this.selectedGroup = ngroup;
                };
                UnitBuilder.prototype.select = function (vl, $event) {
                    var val = vl.value;
                    // console.log( ' value : '+ val );
                };
                UnitBuilder.prototype.updateSelectedStructure = function (ionisMon, msg) {
                    // we have the selected ionis monomer
                };
                UnitBuilder.prototype.updateSelectedSubstructureList = function (substructureList) {
                    if ((substructureList != undefined) && substructureList.length > 1) {
                        this.substructureList = substructureList;
                        this.selectedGroup = 'Substructure';
                    }
                };
                return UnitBuilder;
            }());
            UnitBuilder = __decorate([
                core_1.Component({
                    selector: 'unit-builder',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'app_control', 'selectedGroup'],
                    // outputs: ['monomers'],
                    template: "\n\n            <div  class=\"table-responsive\" style=\"padding: 15px;\">\n            <!--<div class=\"col-xs-12 col-sm-6 col-md-8\">-->\n            <tr>\n            <!--<td>-->\n                    <!--<select class=\"form-control\" type=\"input\" (change)=\"updatevalue(selectedvalue)\" #selectedvalue>-->\n                          <!--<option value=\"Any\">All Monomers</option>-->\n                          <!--<option value=\"Sugars\" >Sugars</option>-->\n                          <!--<option value=\"Bases\">Bases</option>-->\n                          <!--<option value=\"Linkers\">Linkers</option>-->\n                    <!--</select>-->\n                    <!--<unit-textbox [substructureList]=\"substructureList\" [monomer_db]=\"monomer_db\" (unit_text)=\"unit_text = $event\" (update)=\"term = $event\" ></unit-textbox>-->\n        <!---->\n                     <!--<div class=\"row\">-->\n                     <!--</div>-->\n                     <!---->\n                    <!--<div class=\"row\">-->\n                          <!--<monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [monomer_type]=\"selectedGroup\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n                     <!---->\n                     <!--&lt;!&ndash;&ndash;&gt;-->\n                     <!--&lt;!&ndash;&ndash;&gt;-->\n                     <!--&lt;!&ndash;&ndash;&gt;-->\n                    <!--<div *ngIf='selectedGroup==\"Any\"' class=\"row\">-->\n                          <!--<monomer-group  [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" monomer_type=\"any\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n                    <!--<div *ngIf='selectedGroup==\"Endcaps\"' class=\"row\">-->\n                          <!--<monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" monomer_type=\"Endcaps\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n                    <!--<div *ngIf='selectedGroup==\"Sugars\"' class=\"row\">-->\n                          <!--<monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" monomer_type=\"Sugars\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n                    <!--<div *ngIf='selectedGroup==\"Bases\"' class=\"row\">-->\n                          <!--<monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" monomer_type=\"Bases\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n                    <!--<div *ngIf='selectedGroup==\"Linkers\"' class=\"row\">-->\n                          <!--<monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" monomer_type=\"Linkers\" [searchTerm]=\"term\"></monomer-group>-->\n                    <!--</div>-->\n            <!--</td>-->\n            <td>\n                <unit-display [monomer_db]=\"monomer_db\"></unit-display>\n            </td>\n            \n            </tr>\n            </div>\n    ",
                    // directives: [MonomerGroup, LegacyMonomerGroup, SubstructureGroup, UnitStringManager, UnitDisplay],
                    providers: [application_control_manager_1.ApplicationControls, monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver]
                }),
                __param(3, core_1.Inject(http_1.Http)),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, core_1.ChangeDetectorRef, http_1.Http])
            ], UnitBuilder);
            exports_1("UnitBuilder", UnitBuilder);
        }
    };
});
//# sourceMappingURL=unit_builder.component.js.map
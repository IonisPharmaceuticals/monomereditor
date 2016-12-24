System.register(["@angular/core", "@angular/http", "rxjs/Rx", "../services/monomerloader", "../services/monomer_saver", "../lib/monomer_db", "../component/monomer_manager.component", "../lib/application_control_manager"], function (exports_1, context_1) {
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
    var core_1, http_1, monomerloader_1, monomer_saver_1, monomer_db_1, monomer_manager_component_1, application_control_manager_1, SearchMonomers2Component;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (monomer_manager_component_1_1) {
                monomer_manager_component_1 = monomer_manager_component_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            }
        ],
        execute: function () {
            SearchMonomers2Component = (function () {
                function SearchMonomers2Component(monomer_loader, monomer_saver, ref, http) {
                    var _this = this;
                    this.monomer_loader = monomer_loader;
                    this.monomer_saver = monomer_saver;
                    this.ref = ref;
                    this.monomer_db = new monomer_db_1.MonomerDB();
                    this.mode = "library";
                    this.enable_editing = true;
                    this.appman = new application_control_manager_1.ApplicationControls();
                    this.monomer_manager = new monomer_manager_component_1.MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
                    // var intervalId = setInterval(() => {
                    //     if (this.monomer_db) {
                    //         clearInterval(intervalId);
                    //     }
                    //     this.ref.markForCheck();
                    // }, 1000);
                    this.monomer_loader.getMonomers().subscribe(function (monomers) { return _this.setMonomerDatabase(monomers); });
                }
                SearchMonomers2Component.prototype.ngOnInit = function () {
                    if (this.appman != undefined) {
                        this.appman.addListener(this);
                    }
                };
                SearchMonomers2Component.prototype.setMonomerDatabase = function (mdb) {
                    if (!this.monomer_db) {
                        this.monomer_db = new monomer_db_1.MonomerDB();
                    }
                    this.monomer_db.monomers = mdb;
                    this.monomer_manager.setMonomer_db(this.monomer_db);
                    for (var _i = 0, _a = this.monomer_db.monomers; _i < _a.length; _i++) {
                        var l = _a[_i];
                        console.log(' l ' + l.monomerid);
                    }
                    this.ref.markForCheck();
                };
                SearchMonomers2Component.prototype.showSubstructureHits = function (event) {
                    this.monomer_manager.substructure_set = event;
                    this.monomer_manager.notifyListeners();
                };
                SearchMonomers2Component.prototype.newMonomer = function () {
                    var new_ionis_monomer = this.monomer_manager.createNewMonomer();
                    this.monomer_manager.setSelectedMonomer(new_ionis_monomer);
                };
                SearchMonomers2Component.prototype.refreshList = function () {
                    var _this = this;
                    this.monomer_loader.getMonomers().subscribe(function (monomers) { return _this.setMonomerDatabase(monomers); });
                };
                return SearchMonomers2Component;
            }());
            SearchMonomers2Component = __decorate([
                core_1.Component({
                    selector: 'monomer-library',
                    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    templateUrl: 'app/ionisph/chem/lib/search_monomer.2.html',
                    providers: [monomerloader_1.MonomerLoader, application_control_manager_1.ApplicationControls],
                    inputs: ['enable_editing']
                }),
                __param(3, core_1.Inject(http_1.Http)),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, core_1.ChangeDetectorRef, http_1.Http])
            ], SearchMonomers2Component);
            exports_1("SearchMonomers2Component", SearchMonomers2Component);
        }
    };
});
//# sourceMappingURL=search_monomers.2.component.js.map
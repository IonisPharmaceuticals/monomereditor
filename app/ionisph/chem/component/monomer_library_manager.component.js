System.register(["@angular/core", "@angular/http", "rxjs/Rx", "../services/monomerloader", "../services/download_data", "../services/monomer_saver", "../component/monomer_manager.component", "../lib/application_control_manager", "../lib/custom_browser_xhr"], function (exports_1, context_1) {
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
    var core_1, http_1, monomerloader_1, download_data_1, monomer_saver_1, monomer_manager_component_1, application_control_manager_1, custom_browser_xhr_1, MonomerLibraryManager;
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
            function (download_data_1_1) {
                download_data_1 = download_data_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (monomer_manager_component_1_1) {
                monomer_manager_component_1 = monomer_manager_component_1_1;
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            },
            function (custom_browser_xhr_1_1) {
                custom_browser_xhr_1 = custom_browser_xhr_1_1;
            }
        ],
        execute: function () {
            MonomerLibraryManager = (function () {
                function MonomerLibraryManager(monomer_loader, monomer_saver, downloader, ref, http) {
                    var _this = this;
                    this.monomer_loader = monomer_loader;
                    this.monomer_saver = monomer_saver;
                    this.downloader = downloader;
                    this.ref = ref;
                    this.appman = new application_control_manager_1.ApplicationControls();
                    this.monomer_manager = new monomer_manager_component_1.MonomerManager(this.monomer_db, monomer_loader, monomer_saver, http);
                    this.currentMonomer = this.monomer_manager.createNewMonomer();
                    this.monomer_manager.setSelectedMonomer(this.currentMonomer);
                    var intervalId = setInterval(function () {
                        if (_this.monomer_db) {
                            clearInterval(intervalId);
                        }
                        _this.ref.markForCheck();
                    }, 1000);
                    this.monomer_loader.getMonomers().subscribe(function (monomers) { return _this.setMonomerDatabase(monomers); });
                }
                MonomerLibraryManager.prototype.ngOnInit = function () {
                    if (this.appman != undefined) {
                        this.appman.addListener(this);
                    }
                };
                MonomerLibraryManager.prototype.downloadPublic = function () {
                    this.downloader.downloadPub();
                };
                MonomerLibraryManager.prototype.downloadAll = function () {
                    this.downloader.downloadAll();
                };
                MonomerLibraryManager.prototype.downloadPrivate = function () {
                    this.downloader.downloadPub();
                };
                MonomerLibraryManager.prototype.setMonomerDatabase = function (mdb) {
                    this.monomer_db.monomers = mdb;
                    this.monomer_manager.setMonomer_db(this.monomer_db);
                    this.ref.markForCheck();
                };
                MonomerLibraryManager.prototype.newMonomer = function () {
                    this.currentMonomer = this.monomer_manager.createNewMonomer();
                    this.monomer_manager.setSelectedMonomer(this.currentMonomer);
                    console.log(" we have  a new monomer ");
                };
                MonomerLibraryManager.prototype.updateSelectedStructure = function (ionisMon, msg) {
                    this.currentMonomer = ionisMon;
                };
                MonomerLibraryManager.prototype.updateSelectedSubstructureList = function (substructureList) { };
                return MonomerLibraryManager;
            }());
            MonomerLibraryManager = __decorate([
                core_1.Component({
                    selector: 'monomer-library-manager',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: 'app/ionisph/chem/component/templates/monomer_library_manager.html',
                    // directives: [SearchMonomers, Ketcher2Component, MonomerList, MonomerEditor, NewMonomer, RegisterMonomerEditor, MonomerGroup],
                    providers: [monomerloader_1.MonomerLoader, application_control_manager_1.ApplicationControls, download_data_1.DownloadData, custom_browser_xhr_1.CustomBrowserXhr]
                }),
                __param(4, core_1.Inject(http_1.Http)),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, download_data_1.DownloadData, core_1.ChangeDetectorRef, http_1.Http])
            ], MonomerLibraryManager);
            exports_1("MonomerLibraryManager", MonomerLibraryManager);
        }
    };
});
//# sourceMappingURL=monomer_library_manager.component.js.map
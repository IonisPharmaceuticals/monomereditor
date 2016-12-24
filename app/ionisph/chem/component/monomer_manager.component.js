System.register(["@angular/core", "ng2-bs3-modal/ng2-bs3-modal", "@angular/http", "../lib/monomer_db", "rxjs/Rx", "../ionismonomer", "../imonomer", "../services/monomerloader", "../services/monomer_saver", "../services/urls"], function (exports_1, context_1) {
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
    var core_1, core_2, ng2_bs3_modal_1, http_1, monomer_db_1, ionismonomer_1, imonomer_1, monomerloader_1, monomer_saver_1, urls_1, MonomerManager;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (_1) {
            },
            function (ionismonomer_1_1) {
                ionismonomer_1 = ionismonomer_1_1;
            },
            function (imonomer_1_1) {
                imonomer_1 = imonomer_1_1;
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            MonomerManager = (function () {
                function MonomerManager(monomer_db, monomer_loader, save_mon, http) {
                    this.monomer_db = monomer_db;
                    this.monomer_loader = monomer_loader;
                    this.save_mon = save_mon;
                    this.listeners = new Array();
                    this.structure_clash_listeners = new Array();
                    this.msg = "";
                    this.http = http;
                }
                MonomerManager.prototype.getViewerSmiles = function () {
                    return this.structure_viewer.getSmiles();
                };
                MonomerManager.prototype.getMolfileForCurrentStructure = function () {
                    return this.structure_viewer.getMolfileForCurrentStructure();
                };
                MonomerManager.prototype.setSelectedMonomer = function (mon) {
                    this.selectedMonomer = mon;
                    this.notifyListeners();
                };
                MonomerManager.prototype.addListener = function (_listener) {
                    this.listeners.push(_listener);
                };
                MonomerManager.prototype.setMonomer_db = function (monomer_db) {
                    this.monomer_db = monomer_db;
                };
                MonomerManager.prototype.saveCurrentStructure = function () {
                    this.msg = "Saving...";
                    this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
                    this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
                    this.save_mon.updateMonomer(this.selectedMonomer, this);
                };
                MonomerManager.prototype.check_topology_uniqueness = function () {
                    var _this = this;
                    this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
                    this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(this.selectedMonomer.monomer);
                    this.http.post(urls_1.URLs.generate_fingerprint, body, { headers: headers })
                        .subscribe(function (response) { return _this.response(response, body); });
                    // this.save_mon.updateMonomer(this.selectedMonomer, this);
                };
                MonomerManager.prototype.check_morgan_topology_uniqueness = function () {
                    var _this = this;
                    this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
                    this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(this.selectedMonomer.monomer);
                    this.http.post(urls_1.URLs.generate_morgan_fingerprint, body, { headers: headers })
                        .subscribe(function (response) { return _this.morgan_response(response, body); });
                };
                MonomerManager.prototype.check_canonical_smiles_uniqueness = function () {
                    var _this = this;
                    this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
                    this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(this.selectedMonomer.monomer);
                    this.http.post(urls_1.URLs.generate_canonical_smiles, body, { headers: headers })
                        .subscribe(function (response) { return _this.search_with_smiles(response); });
                };
                MonomerManager.prototype.unique_check_response = function (response) {
                    var msg = response['_body'];
                    var hits = JSON.parse(msg);
                    // this is just an array of json objects 
                    this.structure_clash_listeners.forEach(function (l) {
                        l.structures_found(hits);
                    });
                };
                MonomerManager.prototype.addStructureClashListener = function (scl) {
                    this.structure_clash_listeners.push(scl);
                };
                MonomerManager.prototype.search_with_smiles = function (res) {
                    var _this = this;
                    var msg = res['_body'];
                    var msgv = JSON.parse(msg);
                    // alert ( msgv['msg'] );
                    if ('canonical_smiles' in msgv) {
                        //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                        var fpo = {};
                        fpo['canonical_smiles'] = msgv['canonical_smiles'];
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        this.http.post(urls_1.URLs.search_by_canonical_smiles, fpo, { headers: headers })
                            .subscribe(function (response) { return _this.unique_check_response(response); });
                    }
                    else {
                        this.msg = 'Failed to run uniqueness algorithm';
                    }
                };
                MonomerManager.prototype.morgan_response = function (res, _t) {
                    var _this = this;
                    var msg = res['_body'];
                    var msgv = JSON.parse(msg);
                    // alert ( msgv['msg'] );
                    if ('fp' in msgv) {
                        //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                        var fpo = {};
                        fpo['morgan_fingerprint'] = msgv['fp'];
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        this.http.post(urls_1.URLs.search_by_morgan_fingerprint, fpo, { headers: headers })
                            .subscribe(function (response) { return _this.unique_check_response(response); });
                    }
                    else {
                        this.msg = 'Failed to run uniqueness algorithm';
                    }
                };
                MonomerManager.prototype.response = function (res, _t) {
                    var _this = this;
                    var msg = res['_body'];
                    var msgv = JSON.parse(msg);
                    // alert ( msgv['msg'] );
                    if ('fp' in msgv) {
                        //  this.msg = ' Fingerprint bitvector : ' + msgv['fp']  + ' searching the monomer database for uniqueness';
                        var fpo = {};
                        fpo['fingerprint'] = msgv['fp'];
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        this.http.post(urls_1.URLs.search_by_fingerprint, fpo, { headers: headers })
                            .subscribe(function (response) { return _this.unique_check_response(response); });
                    }
                    else {
                        this.msg = 'Failed to run uniqueness algorithm';
                    }
                };
                MonomerManager.prototype.saveLegacyStructure = function () {
                    this.selectedMonomer.monomer.molfile = this.getMolfileForCurrentStructure();
                    this.selectedMonomer.monomer.canSMILES = this.getViewerSmiles();
                    this.save_mon.save_legacy_monomer(this.selectedMonomer, this);
                };
                MonomerManager.prototype.reload = function (monomer) {
                    var _this = this;
                    this.monomer_loader.getMonomer(monomer.monomerid).subscribe(function (nmon) { return _this.selectedMonomer; });
                };
                MonomerManager.prototype.setStructureViewer = function (ketc) {
                    this.structure_viewer = ketc;
                };
                MonomerManager.prototype.notifyListeners = function () {
                    var _this = this;
                    this.listeners.forEach(function (l) {
                        l.updateSelectedStructure(_this.selectedMonomer, _this.msg);
                        l.updateSelectedSubstructureList(_this.substructure_set);
                    });
                };
                MonomerManager.prototype.createNewMonomer = function () {
                    var m = new ionismonomer_1.IonisMonomer();
                    m.endcapID = '';
                    m.het_id = '';
                    m.ispublic = false;
                    m.sugarId = '';
                    m.monomer = this.getDefaultMonomer();
                    return m;
                };
                MonomerManager.prototype.getDefaultMonomer = function () {
                    var nm = new imonomer_1.IMonomer();
                    //molfile: string;
                    //id: number;
                    //canSMILES: string;
                    //naturalAnalog: string;
                    //alternateId: string;
                    //name: string;
                    //monomerType: string;
                    //polymerType: string;
                    nm.name = '';
                    nm.id = 0;
                    nm.canSMILES = '';
                    nm.molfile = '';
                    nm.monomerType = '';
                    nm.alternateId = '';
                    nm.naturalAnalog = '';
                    return nm;
                };
                MonomerManager.prototype.getNextID = function () {
                    var mx = 0;
                    console.log("loading...");
                    for (var i in this.monomer_db) {
                        // console.log ( ' i :' + this.monomer_db[i]);
                        var currentid = this.monomer_db[i].monomerid;
                        if (currentid > mx) {
                            mx = currentid + 1;
                        }
                    }
                    return mx;
                };
                MonomerManager.prototype.action_successful = function (m, msg) {
                    this.msg = msg;
                    this.setSelectedMonomer(m);
                };
                MonomerManager.prototype.action_failed = function (m) {
                    this.setSelectedMonomer(m);
                };
                return MonomerManager;
            }());
            __decorate([
                core_2.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerManager.prototype, "modal", void 0);
            MonomerManager = __decorate([
                core_2.Component({
                    selector: 'monomer-manager',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    template: "\n           \n    <div>\n    {{ msg }}\n\n                        <modal #modal>\n                            <modal-header [show-close]=\"true\">\n                                <h4 class=\"modal-title\"></h4>\n                            </modal-header>\n                            <modal-body>\n                                {{msg}}\n                            </modal-body>\n                        </modal>\n</div>\n\n\n    ",
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver]
                }),
                __param(3, core_1.Inject(http_1.Http)),
                __metadata("design:paramtypes", [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, http_1.Http])
            ], MonomerManager);
            exports_1("MonomerManager", MonomerManager);
        }
    };
});
//# sourceMappingURL=monomer_manager.component.js.map
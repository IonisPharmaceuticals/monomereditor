System.register(["@angular/core", "ng2-bs3-modal/ng2-bs3-modal", "../lib/monomer_db", "rxjs/Rx", "../services/monomerloader", "../services/monomer_saver"], function (exports_1, context_1) {
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
    var core_1, ng2_bs3_modal_1, monomer_db_1, monomerloader_1, monomer_saver_1, MonomerGroup;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (_1) {
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            }
        ],
        execute: function () {
            MonomerGroup = (function () {
                function MonomerGroup(monomer_loader, monomer_writer, ref) {
                    this.monomer_loader = monomer_loader;
                    this.monomer_writer = monomer_writer;
                    this.ref = ref;
                    this.searchTerm = "";
                    this.nameSearchTerm = "";
                    this.ispublic = "*";
                    this.canDelete = false;
                    this.display = "name";
                }
                MonomerGroup.prototype.ngOnInit = function () {
                    if (this.monomer_manager != null) {
                        this.monomer_manager.addListener(this);
                    }
                };
                MonomerGroup.prototype.updateSelectedStructure = function (ionisMon, msg) {
                };
                MonomerGroup.prototype.updateSelectedSubstructureList = function (substructureList) {
                };
                MonomerGroup.prototype.togglePublic = function (monomer) {
                    var _this = this;
                    if (monomer.ispublic == false) {
                        this.selectedMonomer = monomer;
                        this.public_modal.open();
                    }
                    else {
                        monomer.ispublic = (!monomer.ispublic);
                        this.loadstructure(monomer).subscribe(function (mon) { return _this.saveMonomer(_this.togglePublicOnMonomer(mon)); });
                    }
                };
                MonomerGroup.prototype.makeMonomerPublic = function (modal) {
                    var _this = this;
                    this.public_modal.close();
                    this.selectedMonomer.ispublic = true;
                    this.loadstructure(this.selectedMonomer).subscribe(function (mon) { return _this.saveMonomer(_this.togglePublicOnMonomer(mon)); });
                };
                MonomerGroup.prototype.cancelPubToggle = function () {
                    this.public_modal.close();
                };
                MonomerGroup.prototype.togglePublicOnMonomer = function (monomer) {
                    this.selectedMonomer = monomer;
                    this.selectedMonomer.ispublic = (!this.selectedMonomer.ispublic);
                    return this.selectedMonomer;
                };
                MonomerGroup.prototype.saveMonomer = function (monomer) {
                    console.log(' saving the monomer ' + monomer.ispublic);
                    // this.monomer_writer.saveMonomer(monomer, this.monomer_manager);
                    this.ref.markForCheck();
                    return monomer;
                };
                MonomerGroup.prototype.loadstructure = function (value) {
                    return this.monomer_loader.getMonomer(+value.monomerid);
                };
                MonomerGroup.prototype.loadAndSelect = function (value) {
                    var _this = this;
                    this.monomer_loader.getMonomer(+value.monomerid).subscribe(function (mon) { return _this.monomer_manager.setSelectedMonomer(mon); });
                };
                MonomerGroup.prototype.listMonomers = function (mon, monomer_type) {
                    var ion = new Array();
                    var index = 0;
                    for (var propName in mon) {
                        var i = mon[propName];
                        if (monomer_type == 'any') {
                            ion.push(i);
                        }
                        else {
                            var n = this.getids(i, monomer_type);
                            if (n && n.length > 0) {
                                ion.push(i);
                            }
                        }
                    }
                    return ion;
                };
                MonomerGroup.prototype.getids = function (m, type) {
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
                MonomerGroup.prototype.removeMonomer = function () {
                    this.modal.open();
                    this.modal.visible = true;
                };
                MonomerGroup.prototype.cancelModal = function (model) {
                    this.modal.close();
                };
                MonomerGroup.prototype.delete = function (model) {
                    this.modal.visible = false;
                    this.modal.close();
                };
                return MonomerGroup;
            }());
            __decorate([
                core_1.Input('name'),
                __metadata("design:type", String)
            ], MonomerGroup.prototype, "display", void 0);
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerGroup.prototype, "modal", void 0);
            __decorate([
                core_1.ViewChild('make_public'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerGroup.prototype, "public_modal", void 0);
            MonomerGroup = __decorate([
                core_1.Component({
                    selector: 'monomer-group',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'polymer_type', 'searchTerm', 'ispublic', 'canDelete', 'display', 'nameSearchTerm'],
                    changeDetection: core_1.ChangeDetectionStrategy.Default,
                    template: "\n\n         <div *ngIf=\"display=='symbol'\"class='tabContainer' style=\"width: 90%;\">\n                      <ul>  \n                       <li *ngFor='let monomer of monomer_db?.getMonomers(polymer_type, monomer_type) | ispublic_filter : ispublic | monomer_filter : searchTerm ; let i=index'>\n                            <div class=\"btn btn-secondary-outline btn-xs\" id={{i}} type=\"input\" (click)=\"loadAndSelect(monomer)\" #inputfield> ({{ monomer.monomerid }})\n                            {{monomer.monomer.alternateId }}\n                                <img *ngIf=\"monomer.ispublic\" src=\"app/img/check.png\" (click)='togglePublic(monomer)'/>\n                                <img *ngIf=\"monomer.ispublic == false\" src=\"app/img/locked.png\" (click)='togglePublic(monomer)'/>\n                                <img *ngIf=\"canDelete\" src=\"app/img/delete.png\" (click)='removeMonomer(monomer)'/> \n                                \n                            </div>\n\n                       </li>\n                      </ul>\n          </div>\n         <div *ngIf=\"display=='name'\" class='tabContainer' style=\"width: 90%;\">\n                      <ul>  \n                       <li *ngFor='let monomer of monomer_db?.getMonomers(polymer_type, monomer_type) | ispublic_filter : ispublic | monomer_filter : searchTerm | monomer_name_filter : nameSearchTerm ; let i=index'>\n                            <div class=\"btn btn-secondary-outline btn-xs\" id={{i}} type=\"input\" (click)=\"loadAndSelect(monomer)\" #inputfield> ({{ monomer.monomerid }})\n                            {{monomer.monomer.name }}, (<font color=\"BLUE\">{{monomer.monomer.alternateId }}</font> )\n                                <img *ngIf=\"monomer.ispublic\" src=\"app/img/check.png\" (click)='togglePublic(monomer)'/>\n                                <img *ngIf=\"monomer.ispublic == false\" src=\"app/img/locked.png\" (click)='togglePublic(monomer)'/>\n                                <img *ngIf=\"canDelete\" src=\"app/img/delete.png\" (click)='removeMonomer(monomer)'/> \n                            </div>\n\n                       </li>\n                      </ul>\n          </div>\n          \n          <div>\n        <modal #modal>\n        <modal-header [show-close]=\"true\">\n        <h4 class=\"modal-title\"></h4>\n        </modal-header>\n        <modal-body>\n            <button type=\"button\" (click)=\"delete(modal)\" class=\"btn btn-secondary\">Delete?</button>\n            <button type=\"button\" (click)=\"cancelModal(modal)\" class=\"btn btn-secondary\">Cancel</button>\n        </modal-body>\n        <!--<modal-footer [show-default-buttons]=\"true\"></modal-footer>-->\n        </modal>\n\n\n        <modal #make_public>\n        <modal-header [show-close]=\"true\">\n        <h4 class=\"modal-title\"></h4>\n        </modal-header>\n        <modal-body>\n            <button type=\"button\" (click)=\"makeMonomerPublic(make_public)\" class=\"btn btn-secondary\">Make this structure public?</button>\n            <button type=\"button\" (click)=\"cancelPubToggle(make_public)\" class=\"btn btn-secondary\">Cancel</button>\n        </modal-body>\n        <!--<modal-footer [show-default-buttons]=\"true\"></modal-footer>-->\n        </modal>\n\n        </div>\n\n          \n          \n    ",
                    // directives: [MODAL_DIRECTIVES],
                    // pipes: [MonomerFilter, IsPublicFilter],
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver]
                }),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, core_1.ChangeDetectorRef])
            ], MonomerGroup);
            exports_1("MonomerGroup", MonomerGroup);
        }
    };
});
//# sourceMappingURL=monomer_group.component.js.map
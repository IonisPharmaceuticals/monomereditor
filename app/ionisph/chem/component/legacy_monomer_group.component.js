System.register(["@angular/core", "../lib/monomer_db", "rxjs/Rx", "../services/monomerloader"], function (exports_1, context_1) {
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
    var core_1, monomer_db_1, monomerloader_1, LegacyMonomerGroup;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (monomer_db_1_1) {
                monomer_db_1 = monomer_db_1_1;
            },
            function (_1) {
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            }
        ],
        execute: function () {
            LegacyMonomerGroup = (function () {
                function LegacyMonomerGroup(monomer_loader, ref) {
                    this.monomer_loader = monomer_loader;
                    this.ref = ref;
                    this.monomer_type = "Endcaps";
                    this.id_type = "Endcap";
                }
                LegacyMonomerGroup.prototype.ngOnInit = function () {
                    if (this.monomer_db != null) {
                        this.monomers = this.listMonomers(this.monomer_db, this.monomer_type);
                    }
                };
                LegacyMonomerGroup.prototype.loadstructure = function (input, event) {
                    var _this = this;
                    var st = input.innerText;
                    st = st.trim();
                    st = st.substr(0, st.indexOf(')') + 1);
                    var sta = st.match(/\(([^)]+)\)/)[1];
                    this.monomer_loader.getMonomer(+sta).subscribe(function (mon) { return _this.monomer_manager.setSelectedMonomer(mon); });
                };
                LegacyMonomerGroup.prototype.updateValue = function (v) {
                    this.id_type = v;
                    console.log(" value " + v);
                    this.ref.markForCheck();
                };
                LegacyMonomerGroup.prototype.updateType = function (v) {
                    this.id_value = v;
                    console.log(" value " + v);
                    this.ref.markForCheck();
                };
                LegacyMonomerGroup.prototype.listMonomers = function (mon, monomer_type) {
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
                LegacyMonomerGroup.prototype.getids = function (m, type) {
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
                    if (idstr != undefined) {
                        var sp = idstr.split(',');
                        for (var s in sp) {
                            var i = Number.parseInt(s);
                            vals.push(i);
                        }
                    }
                    return vals;
                };
                return LegacyMonomerGroup;
            }());
            LegacyMonomerGroup = __decorate([
                core_1.Component({
                    selector: 'legacy-monomer-group',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'id_type', 'id_value'],
                    template: "\n\n         <legacy-search-monomers (id_type)=\"updateType($event)\" (id_value)=\"updateValue($event)\"> </legacy-search-monomers>\n         <div *ngIf=\"monomers\" class='tabContainer'>\n                      <ul>\n                       <li *ngFor='let monomer of monomers | legacy_id_filter: [id_type,id_value]; let i=index'>\n                            <!--<input type=\"text\" #input>-->\n                            <div class=\"btn btn-secondary-outline btn-xs\" id={{i}} type=\"input\" (click)=\"loadstructure(input, $event)\" #input> ({{ monomer.monomerid }})\n                            {{monomer.monomer.alternateId }}\n                                <img *ngIf=\"monomer.ispublic\" src=\"app/img/check.png\"/>\n                            </div>\n                       </li>\n                      </ul>\n          </div>\n    ",
                    // directives: [ROUTER_DIRECTIVES, LegacySearchMonomers],
                    // pipes: [LegacyIDFilter],
                    providers: [monomer_db_1.MonomerDB, monomerloader_1.MonomerLoader]
                }),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, core_1.ChangeDetectorRef])
            ], LegacyMonomerGroup);
            exports_1("LegacyMonomerGroup", LegacyMonomerGroup);
        }
    };
});
//# sourceMappingURL=legacy_monomer_group.component.js.map
System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, MonomerDB;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            MonomerDB = (function () {
                function MonomerDB() {
                }
                MonomerDB.prototype.saveMonomer = function (_monomer) {
                    console.log(" saving monomer " + _monomer.monomer.name);
                };
                MonomerDB.prototype.getMonomers = function (polymer_type, monomer_type) {
                    if (polymer_type && monomer_type) {
                        var mlist = new Array();
                        for (var _i = 0, _a = this.monomers; _i < _a.length; _i++) {
                            var m = _a[_i];
                            if (m.monomer.polymerType.toUpperCase() === polymer_type && m.monomer.monomerType.toUpperCase() === monomer_type.toUpperCase()) {
                                mlist.push(m);
                            }
                        }
                        return mlist;
                    }
                    else if (polymer_type) {
                        var mlist = new Array();
                        for (var _b = 0, _c = this.monomers; _b < _c.length; _b++) {
                            var m = _c[_b];
                            if (m.monomer.polymerType.toUpperCase() === polymer_type.toUpperCase()) {
                                mlist.push(m);
                            }
                        }
                        return mlist;
                    }
                    else {
                        return this.monomers;
                    }
                };
                MonomerDB.prototype.getCount = function () {
                    if (this.monomers) {
                        return this.monomers.length;
                    }
                    else {
                        return 0;
                    }
                };
                MonomerDB.prototype.getMonomer = function (helmid) {
                    for (var _i = 0, _a = this.monomers; _i < _a.length; _i++) {
                        var mon = _a[_i];
                        if (mon.monomer.alternateId == helmid) {
                            return mon;
                        }
                    }
                    return null;
                };
                return MonomerDB;
            }());
            MonomerDB = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], MonomerDB);
            exports_1("MonomerDB", MonomerDB);
        }
    };
});
//# sourceMappingURL=monomer_db.js.map
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
    var core_1, LegacyIDFilter;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LegacyIDFilter = (function () {
                function LegacyIDFilter() {
                }
                LegacyIDFilter.prototype.transform = function (value, _a) {
                    var param = _a[0];
                    if (param != undefined && param.length == 2) {
                        var idtype = param[1];
                        var idvalue = param[0];
                        if (idtype != undefined && idvalue != undefined && idtype != '' && idvalue != '') {
                            return this.lookForOtherShit(value, idtype, idvalue);
                        }
                    }
                    return value;
                };
                LegacyIDFilter.prototype.publicStructures = function (value) {
                    var ex_list = [];
                    var index = 0;
                    for (var i = 0; i < value.length; i++) {
                        var exp = value[i];
                        if (exp.ispublic) {
                            ex_list[index++] = exp;
                        }
                    }
                    return ex_list;
                };
                LegacyIDFilter.prototype.privateStructures = function (value) {
                    var ex_list = [];
                    var index = 0;
                    for (var i = 0; i < value.length; i++) {
                        var exp = value[i];
                        if (!exp.ispublic) {
                            ex_list[index++] = exp;
                        }
                    }
                    return ex_list;
                };
                LegacyIDFilter.prototype.lookForOtherShit = function (value, idtype, idvalue) {
                    var ex_list = [];
                    var index = 0;
                    for (var i = 0; i < value.length; i++) {
                        var exp = value[i];
                        if (this.has(exp, idtype, idvalue)) {
                            if (ex_list.indexOf(exp) < 0) {
                                ex_list[index] = exp;
                                index++;
                            }
                        }
                    }
                    return ex_list;
                };
                LegacyIDFilter.prototype.isInt = function (value) {
                    return !isNaN(value) &&
                        parseInt(value) == value && !isNaN(parseInt(value, 10));
                };
                LegacyIDFilter.prototype.has = function (i, monomer_type, idvalue) {
                    var nublist = this.getids(i, monomer_type);
                    for (var vi in nublist) {
                        console.log(vi);
                        if (nublist[vi] + '' == idvalue) {
                            return true;
                        }
                    }
                    return false;
                };
                LegacyIDFilter.prototype.getids = function (m, type) {
                    var idstr;
                    var vals = new Array();
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
                            var i = Number.parseInt(sp[s]);
                            vals.push(i);
                        }
                    }
                    return vals;
                };
                return LegacyIDFilter;
            }());
            LegacyIDFilter = __decorate([
                core_1.Pipe({
                    name: "legacy_id_filter"
                }),
                __metadata("design:paramtypes", [])
            ], LegacyIDFilter);
            exports_1("LegacyIDFilter", LegacyIDFilter);
        }
    };
});
//# sourceMappingURL=legacy_id_filter.js.map
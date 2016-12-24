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
    var core_1, IsPublicFilter;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            IsPublicFilter = (function () {
                function IsPublicFilter() {
                }
                IsPublicFilter.prototype.transform = function (value, term) {
                    if (value != null) {
                        console.log(' filter ' + term);
                        if (!term || term == '') {
                            return value;
                        }
                        return this.lookForOtherShit(value, term);
                    }
                    return value;
                };
                IsPublicFilter.prototype.publicStructures = function (value) {
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
                IsPublicFilter.prototype.privateStructures = function (value) {
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
                IsPublicFilter.prototype.lookForOtherShit = function (value, term) {
                    var ex_list = [];
                    var index = 0;
                    if (term == '' || term.length <= 0 || term == 'undefined') {
                        return value;
                    }
                    if (term == true || term == 'true') {
                        return this.publicStructures(value);
                    }
                    for (var i = 0; i < value.length; i++) {
                        var exp = value[i];
                        ex_list[index] = exp;
                        index++;
                    }
                    return ex_list;
                };
                IsPublicFilter.prototype.isInt = function (value) {
                    return !isNaN(value) &&
                        parseInt(value) == value && !isNaN(parseInt(value, 10));
                };
                return IsPublicFilter;
            }());
            IsPublicFilter = __decorate([
                core_1.Pipe({
                    name: "ispublic_filter"
                }),
                __metadata("design:paramtypes", [])
            ], IsPublicFilter);
            exports_1("IsPublicFilter", IsPublicFilter);
        }
    };
});
//# sourceMappingURL=ispublic.js.map
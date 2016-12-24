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
    var core_1, LegacySearchMonomers;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LegacySearchMonomers = (function () {
                function LegacySearchMonomers() {
                    this.id_type = new core_1.EventEmitter();
                    this.id_value = new core_1.EventEmitter();
                }
                LegacySearchMonomers.prototype.ngOnInit = function () {
                    this.id_type.emit('');
                    this.id_value.emit('');
                };
                LegacySearchMonomers.prototype.updateID = function (fv, v) {
                    this.id_type.emit(fv);
                    //this.id_value.emit ( v );
                };
                LegacySearchMonomers.prototype.go = function (v) {
                    this.id_value.emit(v);
                };
                return LegacySearchMonomers;
            }());
            LegacySearchMonomers = __decorate([
                core_1.Component({
                    selector: 'legacy-search-monomers',
                    template: "\n            <div style=\"padding-top: 5px\">\n\n            <select class=\"form-control\" [(ngModel)]=\"id_type\" (change)=\"updateID(input.value)\" #input>\n                  <option value=\"Endcaps\">Endcaps </option>\n                  <option value=\"Sugars\" >Sugars</option>\n                  <option value=\"Bases\">Bases</option>\n                  <option value=\"Linkers\">Linkers</option>\n            </select>\n            ID :  <input #idvalue type=\"text\" (input)=\"go(idvalue.value)\">\n            </div>\n            ",
                    outputs: ['id_type', 'id_value']
                }),
                __metadata("design:paramtypes", [])
            ], LegacySearchMonomers);
            exports_1("LegacySearchMonomers", LegacySearchMonomers);
        }
    };
});
//# sourceMappingURL=legacy_search_monomer.component.js.map
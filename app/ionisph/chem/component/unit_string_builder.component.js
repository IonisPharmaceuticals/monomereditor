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
    var core_1, UnitStringManager;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UnitStringManager = (function () {
                //.tabContainer {
                //    padding: 10px;
                //    color: black;
                //    font-size: x-small;
                //    height: 400px;
                //    width: 100%;
                //    float: left;
                //    overflow: auto;
                //    overflow-x:hidden;
                //}
                function UnitStringManager() {
                    this.update = new core_1.EventEmitter();
                    this.unit_text = new core_1.EventEmitter();
                }
                UnitStringManager.prototype.ngOnInit = function () {
                    this.update.emit('');
                };
                UnitStringManager.prototype.updateFilter = function (fv, v) {
                    this.update.emit(fv);
                };
                UnitStringManager.prototype.go = function (v) {
                };
                UnitStringManager.prototype.selectMonomer = function (value) {
                    if (this.monomer_db != null) {
                        for (var _i = 0, _a = this.monomer_db; _i < _a.length; _i++) {
                            var mon = _a[_i];
                            if (mon.monomer.alternateId === value) {
                                this.unit_text.emit(mon);
                            }
                        }
                    }
                };
                return UnitStringManager;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array)
            ], UnitStringManager.prototype, "substructureList", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array)
            ], UnitStringManager.prototype, "monomer_db", void 0);
            UnitStringManager = __decorate([
                core_1.Component({
                    selector: 'unit-textbox',
                    template: "\n\n            <div  style=\"padding: 5px; font-size: x-small\">\n            <input #input type=\"text\" (input)=\"updateFilter(input.value)\"> \n            <!--<img src=\"app/img/right_arrow.png\" (click)=\"selectMonomer(input.value)\"/>-->\n            <br>\n            </div>\n            ",
                    outputs: ['update', 'unit_text']
                }),
                __metadata("design:paramtypes", [])
            ], UnitStringManager);
            exports_1("UnitStringManager", UnitStringManager);
        }
    };
});
//# sourceMappingURL=unit_string_builder.component.js.map
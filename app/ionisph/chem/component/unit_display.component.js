System.register(["@angular/core", "rxjs/Rx", "../services/monomerloader", "../services/monomer_saver"], function (exports_1, context_1) {
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
    var core_1, monomerloader_1, monomer_saver_1, UnitDisplay;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
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
            UnitDisplay = (function () {
                function UnitDisplay(monomer_loader, monomer_saver, ref) {
                    this.monomer_loader = monomer_loader;
                    this.monomer_saver = monomer_saver;
                    this.ref = ref;
                    this.test = "tgest";
                    this.helm = new core_1.EventEmitter();
                    this.current_linker = new core_1.EventEmitter();
                    this.current_sugar = new core_1.EventEmitter();
                    this.current_base = new core_1.EventEmitter();
                    this.previous_value = null;
                }
                UnitDisplay.prototype.ngOnInit = function () {
                };
                UnitDisplay.prototype.parseSugar = function (v) {
                    v = v.trim();
                    var sugar = "";
                    for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
                        var c = v_1[_i];
                        if (c === '(') {
                            break;
                        }
                        sugar += c;
                    }
                    sugar = sugar.trim();
                    if (sugar.startsWith("[")) {
                        var start = 0;
                        var end = UnitDisplay.getMatchingBracketPosition(sugar, start, '[', ']');
                        sugar = sugar.substring(start + 1, end);
                    }
                    return sugar;
                };
                UnitDisplay.prototype.parseBase = function (v) {
                    v = v.trim();
                    var index = 0;
                    for (var _i = 0, v_2 = v; _i < v_2.length; _i++) {
                        var c = v_2[_i];
                        if (c === '(') {
                            var open = index;
                            var close = UnitDisplay.getMatchingBracketPosition(v, index, '(', ')');
                            if (open >= 0 && close > 0) {
                                return v.substring(open + 1, close);
                            }
                        }
                        index++;
                    }
                    return null;
                };
                UnitDisplay.prototype.parseLinker = function (v) {
                    v = v.trim();
                    var linker = "";
                    var start = false;
                    for (var _i = 0, v_3 = v; _i < v_3.length; _i++) {
                        var c = v_3[_i];
                        if (start) {
                            linker += c;
                        }
                        else if (c === ')') {
                            start = true;
                        }
                    }
                    linker = linker.trim();
                    if (linker.startsWith("[")) {
                        var end = UnitDisplay.getMatchingBracketPosition(linker, 0, '[', ']');
                        linker = linker.substring(1, end);
                    }
                    return linker;
                };
                UnitDisplay.prototype.updateHELM = function (helm_value) {
                    this.helm.emit(helm_value);
                };
                UnitDisplay.prototype.keyUp = function (event) {
                    var v = event.target.value;
                    if (true) {
                        this.previous_value = event.target.value;
                        this.updateHELM(event.target.value);
                        var sugar = this.parseSugar(event.target.value);
                        var base = this.parseBase(event.target.value);
                        var linker = this.parseLinker(event.target.value);
                        if (sugar == null || sugar === "") {
                            this.sugar_monomer = null;
                        }
                        if (base == null || base === "") {
                            this.base_monomer = null;
                        }
                        if (linker == null || linker === "") {
                            this.linker_monomer = null;
                        }
                        // if (sugar!= null && base != null && linker != null && sugar.length > 0 && base.length > 0 && linker.length > 0 ) {
                        // if (
                        //     this.sugar_monomer == null ||
                        //     this.linker_monomer == null ||
                        //     this.base_monomer == null ||
                        //     sugar != this.sugar_monomer.monomer.alternateId || base != this.base_monomer.monomer.alternateId ||
                        //     linker != this.linker_monomer.monomer.alternateId) {
                        if (this.monomer_db == null)
                            return;
                        for (var _i = 0, _a = this.monomer_db; _i < _a.length; _i++) {
                            var mon = _a[_i];
                            if (mon.monomer.polymerType == 'RNA') {
                                if (mon.monomer.alternateId === sugar) {
                                    if (mon.monomer == null || mon.monomer.molfile == null) {
                                        this.loadSugar(mon);
                                    }
                                }
                                if (mon.monomer.alternateId === base) {
                                    if (mon.monomer == null || mon.monomer.molfile == null) {
                                        this.loadBase(mon);
                                    }
                                }
                                if (mon.monomer.alternateId === linker) {
                                    if (mon.monomer == null || mon.monomer.molfile == null) {
                                        this.loadLinker(mon);
                                    }
                                }
                            }
                        }
                    }
                };
                UnitDisplay.prototype.loadSugar = function (value) {
                    var _this = this;
                    if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
                        this.monomer_loader.getMonomer(+value.monomerid).subscribe(function (mon) { return _this.updateSugar(mon); });
                    else
                        this.sugar_monomer = value;
                };
                UnitDisplay.prototype.loadBase = function (value) {
                    var _this = this;
                    if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
                        this.monomer_loader.getMonomer(+value.monomerid).subscribe(function (mon) { return _this.updateBase(mon); });
                    else
                        this.base_monomer = value;
                };
                UnitDisplay.prototype.loadLinker = function (value) {
                    var _this = this;
                    if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
                        this.monomer_loader.getMonomer(+value.monomerid).subscribe(function (mon) { return _this.updateLinker(mon); });
                    else
                        this.linker_monomer = value;
                };
                UnitDisplay.prototype.updateSugar = function (im) {
                    this.sugar_monomer = im;
                    this.current_sugar_id = this.sugar_monomer.monomer.alternateId;
                };
                UnitDisplay.prototype.updateBase = function (im) {
                    this.base_monomer = im;
                };
                UnitDisplay.prototype.updateLinker = function (im) {
                    this.linker_monomer = im;
                };
                UnitDisplay.prototype.ngOnChanges = function (change) {
                    console.log(' we have a change ' + change.currentValue);
                };
                UnitDisplay.prototype.structureUpdate = function (update) {
                };
                UnitDisplay.getMatchingBracketPosition = function (characters, position, openingBracket, closingBracket) {
                    if (position < characters.length - 1 && characters.charAt(position) === openingBracket) {
                        var currentPosition = position + 1;
                        var openingBracketCount = 1;
                        while (openingBracketCount > 0 && currentPosition < characters.length) {
                            var currentCharacter = characters.charAt(currentPosition);
                            if (currentCharacter === closingBracket) {
                                --openingBracketCount;
                            }
                            if (currentCharacter === openingBracket) {
                                ++openingBracketCount;
                            }
                            currentPosition++;
                        }
                        return characters.charAt(currentPosition - 1) === closingBracket ? (currentPosition - 1) : -1;
                    }
                    else {
                        return -1;
                    }
                };
                return UnitDisplay;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array)
            ], UnitDisplay.prototype, "monomer_db", void 0);
            UnitDisplay = __decorate([
                core_1.Component({
                    selector: 'unit-display',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    template: "\n            <div  class=\"table-responsive\" style=\"padding: 15px;\">\n            <tr>\n            <td>\n                    <div class=\"container\">\n                        <form class=\"form-horizontal\" role=\"form\">\n                            <div class=\"form-group\">\n                              <label class=\"control-label col-sm-1\" for=\"pwd\">Oligomer Unit (HELM):</label>\n                              <div class=\"col-sm-10\">\n                                <input type=\"text\" class=\"form-control\" id=\"helm\" (keyup)='keyUp($event)' placeholder=\"$sugar($branch)$linker\">\n                              </div>\n                            </div>\n                            <div class=\"form-group\">\n                              <div class=\"col-sm-offset-2 col-sm-10\">\n                                <!--<button type=\"submit\" class=\"btn btn-default\">Load</button>-->\n                                <b>Sugar</b> : <span style=\"color: #dc143c\">  {{ sugar_monomer?.monomer?.name }} </span>\n                                <b>Base</b>  : <span style=\"color: #dc143c\">  {{ base_monomer?.monomer?.name }} </span>\n                                <b>Linker</b> : <span style=\"color: #dc143c\">  {{ linker_monomer?.monomer?.name }}</span>\n                              \n                              </div>\n                            </div>\n                          </form> \n                     </div>\n                    <unit-viewer [linker_monomer]=\"linker_monomer\" [sugar_monomer]=\"sugar_monomer\" [base_monomer]=\"base_monomer\"></unit-viewer>\n            </td>\n            </tr>\n            </div>\n    ",
                    // directives: [UnitViewerComponent],
                    providers: [],
                    outputs: ['current_linker', 'current_sugar', 'current_base']
                }),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, monomer_saver_1.MonomerSaver, core_1.ChangeDetectorRef])
            ], UnitDisplay);
            exports_1("UnitDisplay", UnitDisplay);
        }
    };
});
//# sourceMappingURL=unit_display.component.js.map
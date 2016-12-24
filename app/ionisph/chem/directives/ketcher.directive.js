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
    var core_1, KetcherDirective;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            KetcherDirective = (function () {
                function KetcherDirective(el) {
                    this.index = 1;
                    this.el = el.nativeElement;
                }
                KetcherDirective.prototype.onMouseEnter = function () {
                };
                KetcherDirective.prototype.onMouseLeave = function () {
                };
                KetcherDirective.prototype.updateData = function () {
                    console.log(" click... ");
                };
                KetcherDirective.prototype.setMolFile = function (molfile) {
                    this.el.setAttribute('data', molfile);
                };
                Object.defineProperty(KetcherDirective.prototype, "data", {
                    set: function (data) {
                        this.setMolFile(data);
                    },
                    enumerable: true,
                    configurable: true
                });
                return KetcherDirective;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], KetcherDirective.prototype, "molFile", void 0);
            KetcherDirective = __decorate([
                core_1.Directive({
                    selector: '[data]',
                    inputs: ['molFile'],
                    host: {
                        '(mouseenter)': 'onMouseEnter()',
                        '(mouseleave)': 'onMouseLeave()'
                    }
                }),
                __metadata("design:paramtypes", [core_1.ElementRef])
            ], KetcherDirective);
            exports_1("KetcherDirective", KetcherDirective);
        }
    };
});
//# sourceMappingURL=ketcher.directive.js.map
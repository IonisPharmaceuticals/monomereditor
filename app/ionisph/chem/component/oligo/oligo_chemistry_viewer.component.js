System.register(["@angular/core", "rxjs/Rx", "../../services/oligo_loader"], function (exports_1, context_1) {
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
    var core_1, oligo_loader_1, OligoChemistrViewer;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (oligo_loader_1_1) {
                oligo_loader_1 = oligo_loader_1_1;
            }
        ],
        execute: function () {
            OligoChemistrViewer = (function () {
                function OligoChemistrViewer(loader) {
                    this.loader = loader;
                }
                OligoChemistrViewer.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.helm != null && this.helm.length > 0) {
                        console.log(' loading the oligo chemistry ');
                        this.loader.getOligoChemistry(this.helm).subscribe(function (oligo) { return _this.setOligoUnits(oligo); });
                    }
                };
                OligoChemistrViewer.prototype.setOligoUnits = function (oligo) {
                    this.oligochemistry = oligo;
                };
                return OligoChemistrViewer;
            }());
            OligoChemistrViewer = __decorate([
                core_1.Component({
                    selector: 'oligo-chemistry-viewer',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    inputs: ['helm'],
                    template: "\n\n    deprecated classs \n\n    Hello world \n\n        {{ helm }}\n\n         <div *ngIf=\"units\" class='tabContainer'>\n                      <ul>\n                       <li *ngFor='let unit of oligochemistry.chains; let i=index'>\n                            <div class=\"btn btn-secondary-outline btn-xs\" id={{i}} type=\"input\" (click)=\"loadstructure(input, $event)\" #input> \n                                                        {{unit.helm}}\n                            \n                            </div>\n                       </li>\n                      </ul>\n          </div>\n    ",
                }),
                __metadata("design:paramtypes", [oligo_loader_1.OligoLoader])
            ], OligoChemistrViewer);
            exports_1("OligoChemistrViewer", OligoChemistrViewer);
        }
    };
});
//# sourceMappingURL=oligo_chemistry_viewer.component.js.map
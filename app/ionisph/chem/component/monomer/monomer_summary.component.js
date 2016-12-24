System.register(["@angular/core", "rxjs/Rx", "../../services/monomerloader"], function (exports_1, context_1) {
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
    var core_1, monomerloader_1, MonomerSummary;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (monomerloader_1_1) {
                monomerloader_1 = monomerloader_1_1;
            }
        ],
        execute: function () {
            MonomerSummary = (function () {
                function MonomerSummary(monomer_loader, ref) {
                    this.monomer_loader = monomer_loader;
                    this.ref = ref;
                }
                MonomerSummary.prototype.ngOnInit = function () {
                };
                MonomerSummary.prototype.setMonomerDatabase = function (mdb) {
                    this.monomer_db = mdb;
                };
                return MonomerSummary;
            }());
            MonomerSummary = __decorate([
                core_1.Component({
                    selector: 'monomer-summary',
                    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "---",
                    providers: [monomerloader_1.MonomerLoader],
                    inputs: ['currentMonomer']
                }),
                __metadata("design:paramtypes", [monomerloader_1.MonomerLoader, core_1.ChangeDetectorRef])
            ], MonomerSummary);
            exports_1("MonomerSummary", MonomerSummary);
        }
    };
});
//# sourceMappingURL=monomer_summary.component.js.map
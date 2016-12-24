System.register(['@angular/core', 'rxjs/Rx', '../../../helm/lib/helm_parser', '../services/oligo_loader', "ng2-bs3-modal/ng2-bs3-modal"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, helm_parser_1, oligo_loader_1, ng2_bs3_modal_1;
    var OligoChemistrySummary;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (helm_parser_1_1) {
                helm_parser_1 = helm_parser_1_1;
            },
            function (oligo_loader_1_1) {
                oligo_loader_1 = oligo_loader_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            }],
        execute: function() {
            OligoChemistrySummary = (function () {
                // <img src='data:image/png;base64, ra data here ' />
                function OligoChemistrySummary(hparser, oloader, ref) {
                    this.hparser = hparser;
                    this.oloader = oloader;
                    this.ref = ref;
                    this.status = "";
                    this.ref = ref;
                }
                OligoChemistrySummary.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    status = 'loading...';
                    // BootstrapDialog.show({
                    //     title: 'Add Description',
                    //     message: 'The description is shown to screen readers.',
                    //     description: 'This is a Bootstrap Dialog'
                    // });
                    this.modal.open();
                    this.oloader.getUnits(this.helm).subscribe(function (chemistry) { return _this.set(chemistry); });
                };
                OligoChemistrySummary.prototype.hide = function () {
                };
                OligoChemistrySummary.prototype.is_active = function (chain) {
                    if (chain == 'RNA1') {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                OligoChemistrySummary.prototype.set = function (chemistry) {
                    this.status = '';
                    this.oligochemistry = chemistry;
                    // this.ref.markFor
                    for (var _i = 0, _a = this.oligochemistry.chains; _i < _a.length; _i++) {
                        var c = _a[_i];
                        for (var _b = 0, _c = c.units; _b < _c.length; _b++) {
                            var u = _c[_b];
                            console.log(' unit ' + u.helm);
                        }
                    }
                    this.ref.markForCheck();
                    this.modal.close();
                };
                OligoChemistrySummary.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(' helmn ' + this.helm);
                    status = 'loading...';
                    this.oloader.getUnits(this.helm).subscribe(function (chemistry) { return _this.set(chemistry); });
                };
                __decorate([
                    core_1.ViewChild('modal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], OligoChemistrySummary.prototype, "modal", void 0);
                OligoChemistrySummary = __decorate([
                    core_1.Component({
                        selector: 'oligo-chemistry',
                        styleUrls: ['app/ionisph/chem/component/component_styles/helm-panel.css'],
                        inputs: ['monomer_db', 'helm'],
                        templateUrl: 'app/ionisph/chem/component/templates/oligo_chemistry_summary.html',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof helm_parser_1.HELMParser !== 'undefined' && helm_parser_1.HELMParser) === 'function' && _a) || Object, (typeof (_b = typeof oligo_loader_1.OligoLoader !== 'undefined' && oligo_loader_1.OligoLoader) === 'function' && _b) || Object, core_1.ChangeDetectorRef])
                ], OligoChemistrySummary);
                return OligoChemistrySummary;
                var _a, _b;
            }());
            exports_1("OligoChemistrySummary", OligoChemistrySummary);
        }
    }
});
//# sourceMappingURL=oligo_chemistry_summary.js.map
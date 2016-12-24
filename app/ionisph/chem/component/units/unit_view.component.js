System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, http_1, UnitView;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            UnitView = (function () {
                function UnitView(_http, ref) {
                    this._http = _http;
                    this.ref = ref;
                }
                UnitView.prototype.hide = function () {
                    // document.getElementById("myDropdown").classList.toggle("show");
                };
                UnitView.prototype.ngOnInit = function () {
                    //  this._http.get(this.uri_ref)
                    //     .map(this.extract_data)
                    //     .catch(this.handleError).subscribe(
                    //              json => this.set_data(json),
                    //              error =>  this.errorMessage = <any>error);
                };
                return UnitView;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", String)
            ], UnitView.prototype, "mol", void 0);
            UnitView = __decorate([
                core_1.Component({
                    selector: 'unitview',
                    inputs: ['mol'],
                    template: "\n        <div style=\"padding: 4px;\" class=\"toolbar\">\n        </div>\n    ",
                    // directives: [AlertComponent, DATEPICKER_DIRECTIVES, NgModel],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef])
            ], UnitView);
            exports_1("UnitView", UnitView);
        }
    };
});
//# sourceMappingURL=unit_view.component.js.map
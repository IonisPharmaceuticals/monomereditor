System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, router_1, TopNavComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            TopNavComponent = (function () {
                function TopNavComponent(route) {
                    this.route = route;
                }
                TopNavComponent.prototype.load = function (l) {
                    var navigationExtras = {
                        queryParams: {},
                    };
                    this.route.navigate([l], navigationExtras);
                };
                return TopNavComponent;
            }());
            TopNavComponent = __decorate([
                core_1.Component({
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n        <div class='panel panel-heading' >\n            <div style=\"padding: 3px\" class=\"btn-group\">\n                    <button type=\"button\" class=\"btn btn-link\"(click)=\"load('/oligos')\"> Oligos </button>\n                    <button type=\"button\" class=\"btn btn-link\"(click)=\"load('/monomers')\"> Monomers </button>\n             </div>\n        </div>\n    <router-outlet></router-outlet>\n  "
                }),
                __metadata("design:paramtypes", [router_1.Router])
            ], TopNavComponent);
            exports_1("TopNavComponent", TopNavComponent);
        }
    };
});
//# sourceMappingURL=topnav.component.js.map
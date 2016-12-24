/**
 * Created by jmilton on 6/8/2016.
 */
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
    var core_1, http_1, ServicesManager;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {/**
             * Created by jmilton on 6/8/2016.
             */
            ServicesManager = (function () {
                function ServicesManager(_http) {
                    this._http = _http;
                    //public static monomer_lib_url = 'http://lin107:8081/exp/v1/monomers/all';
                    this.monomer_lib_url = 'http://localhost:8180/v1/monomers/all';
                    //public static  monomer_lib_url_id = 'http://lin107:8081/exp/v1/monomers';
                    this.monomer_lib_url_id = 'http://localhost:8180/v1/monomers';
                }
                return ServicesManager;
            }());
            ServicesManager = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], ServicesManager);
            exports_1("ServicesManager", ServicesManager);
        }
    };
});
//# sourceMappingURL=services_manager.js.map
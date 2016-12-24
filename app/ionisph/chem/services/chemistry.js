System.register(["@angular/core", "@angular/http", "./urls"], function (exports_1, context_1) {
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
    var core_1, http_1, urls_1, Chemistry;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            Chemistry = (function () {
                function Chemistry(_http) {
                    this._http = _http;
                }
                Chemistry.prototype.mergeMonomers = function (sugar, base, linker) {
                    var headers = new http_1.Headers();
                    // in order for cors to work we have to set the content type to url-encoded.
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //headers.append("cache-control", "no-cache");
                    if (linker == null || linker.length <= 0) {
                        var molfiles = {
                            "sugar": sugar,
                            "base": base
                        };
                        var body = JSON.stringify(molfiles);
                        return this._http.post(urls_1.URLs.molfile_merge, body, { headers: headers });
                    }
                    else {
                        var m = {
                            "sugar": sugar,
                            "base": base,
                            "linker": linker
                        };
                        var body = JSON.stringify(m);
                        return this._http.post(urls_1.URLs.molfile_merge, body, { headers: headers });
                    }
                };
                Chemistry.prototype.buildOligo = function (helm) {
                    var headers = new http_1.Headers();
                    // in order for cors to work we have to set the content type to url-encoded.
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //headers.append("cache-control", "no-cache");
                    if (helm != null) {
                        var body = JSON.stringify({ "helm": helm });
                        return this._http.post(urls_1.URLs.build_oligo, body, { headers: headers }).map(function (response) { return response.json(); });
                    }
                };
                return Chemistry;
            }());
            Chemistry = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], Chemistry);
            exports_1("Chemistry", Chemistry);
        }
    };
});
//# sourceMappingURL=chemistry.js.map
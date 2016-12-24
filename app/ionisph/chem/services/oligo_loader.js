System.register(["@angular/core", "@angular/http", "rxjs/Observable", "./urls"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, urls_1, OligoLoader;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (urls_1_1) {
                urls_1 = urls_1_1;
            }
        ],
        execute: function () {
            OligoLoader = (function () {
                function OligoLoader(_http) {
                    this._http = _http;
                }
                OligoLoader.prototype.buildOligo = function (helm) {
                    var headers = new http_1.Headers();
                    // in order for cors to work we have to set the content type to url-encoded.
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //headers.append("cache-control", "no-cache");
                    if (helm != null) {
                        var body = JSON.stringify({ "helm": helm });
                        return this._http.post(urls_1.URLs.build_oligo, body, { headers: headers }).map(function (response) { return response.json(); });
                    }
                };
                /**
                 *  This will fetch the chemistry of an oligo nucleotide as a sercies of monomer chains and units
                 * deprecategf
                 */
                OligoLoader.prototype.getOligoChemistry = function (helm) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //headers.append("cache-control", "no-cache");
                    if (helm != null) {
                        var body = JSON.stringify({ "helm": helm });
                        return this._http.post(urls_1.URLs.build_oligo, body, { headers: headers }).map(function (response) { return response.json(); });
                    }
                };
                /**
                 *  This will fetch the chemistry of an oligo nucleotide as a sercies of monomer chains and units
                 * deprecategf
                 */
                OligoLoader.prototype.loadOligo = function (isisno, helm_listener) {
                    var _this = this;
                    this._http.get(urls_1.URLs.build_oligo_list_url("" + isisno))
                        .map(this.extract_data)
                        .catch(this.handleError).subscribe(function (json) { return helm_listener.updateHELM(_this.set_data(json)); }, function (error) { return helm_listener.updateError(error); });
                };
                OligoLoader.prototype.extract_data = function (res) {
                    var body = res.json();
                    return body;
                };
                OligoLoader.prototype.set_data = function (data) {
                    if (data.length > 0) {
                        return data[0]['helm'];
                    }
                    // let helmstring = data['helm'];
                    // return helmstring;
                };
                OligoLoader.prototype.getUnits = function (helm) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //headers.append("cache-control", "no-cache");
                    if (helm != null) {
                        var body = JSON.stringify({ "helm": helm });
                        return this._http.post(urls_1.URLs.build_helm_units, body, { headers: headers }).map(function (response) { return response.json(); });
                    }
                };
                OligoLoader.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return OligoLoader;
            }());
            OligoLoader = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], OligoLoader);
            exports_1("OligoLoader", OligoLoader);
        }
    };
});
//# sourceMappingURL=oligo_loader.js.map
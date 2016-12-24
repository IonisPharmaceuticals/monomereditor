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
    function extract_data(res) {
        var body = res.json();
        return body;
    }
    var core_1, http_1, Observable_1, urls_1, RegisterOligo;
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
            RegisterOligo = (function () {
                function RegisterOligo(_http) {
                    this._http = _http;
                }
                RegisterOligo.prototype.submitAsJSON = function (oligo, ob) {
                    var _this = this;
                    this.ob = ob;
                    this.oligo = oligo;
                    var body = JSON.stringify(oligo);
                    // .addHeader("content-type", "application/json")
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    headers.append('Content-Type', 'Access-Control-Allow-Headers');
                    var options = new http_1.RequestOptions({ headers: headers }); // headers.append("cache-control", "no-cache")
                    console.log(' json body ' + body);
                    this._http.post(urls_1.URLs.oligo_registration_legacy, body, options).
                        toPromise()
                        .then(extract_data)
                        .then(function (response) { return _this.response(response); })
                        .then(function (response) { return _this.register_in_oligo_library(response, oligo); });
                };
                RegisterOligo.prototype.register_in_oligo_library = function (res, oligo) {
                    var vres = res;
                    var jsy = {
                        "isisno": +vres.isisno,
                        "helm": oligo.helm
                    };
                    var body = JSON.stringify(jsy);
                    // .addHeader("content-type", "application/json")
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    headers.append('Content-Type', 'Access-Control-Allow-Headers');
                    var options = new http_1.RequestOptions({ headers: headers }); // headers.append("cache-control", "no-cache")
                    console.log(' oligo registra ---  ' + body);
                    this._http.post(urls_1.URLs.oligo_registration, body, options).
                        toPromise()
                        .then(extract_data)
                        .then(function (response) { return alert(' Registration Complete '); });
                };
                RegisterOligo.prototype.response = function (res) {
                    console.log(res);
                    this.ob.action_successful(res);
                };
                RegisterOligo.prototype.logError = function (error) {
                    console.log(error);
                    this.ob.action_failed(this.oligo);
                };
                RegisterOligo.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    this.ob.action_failed(this.oligo);
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return RegisterOligo;
            }());
            RegisterOligo = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], RegisterOligo);
            exports_1("RegisterOligo", RegisterOligo);
        }
    };
});
//# sourceMappingURL=register_oligo.js.map
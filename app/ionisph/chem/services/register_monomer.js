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
    var core_1, http_1, Observable_1, urls_1, RegisterMonomer;
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
            RegisterMonomer = (function () {
                function RegisterMonomer(_http) {
                    this._http = _http;
                }
                RegisterMonomer.prototype.submitAsJSON = function (monomer, ob) {
                    var _this = this;
                    this.ob = ob;
                    this.monomer = monomer;
                    var username = 'test';
                    var password = 'password';
                    var body = JSON.stringify(monomer);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this._http.post(urls_1.URLs.monomer_registration, body, { headers: headers }).subscribe(function (response) { return _this.response(response); });
                };
                RegisterMonomer.prototype.submitToLegacyDB = function (type, molfile, user, name, molecular_weight, molecular_formula, conjugate_id) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = "type=" + type + "&molfile=" + molfile + "&user=" + user + "&name=" + name + "&molecular_formula=" + molecular_formula + "&conjugate_id=" + conjugate_id + "&molecular_weight=" + molecular_weight;
                    this._http.post(urls_1.URLs.monomer_chemistry_info, body, { headers: headers }).subscribe(function (response) { return _this.response(response); });
                };
                RegisterMonomer.prototype.submitAsFORM = function (monomer, ob) {
                    var _this = this;
                    this.ob = ob;
                    this.monomer = monomer;
                    var username = 'test';
                    var password = 'password';
                    // var body = JSON.stringify(monomer);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(monomer);
                    this._http.post(urls_1.URLs.monomer_registration, body, { headers: headers }).subscribe(function (response) { return _this.response(response); });
                };
                RegisterMonomer.prototype.response = function (res) {
                    console.log(res);
                    var msg = '';
                    var body = res['_body'];
                    if (body != null && body.length > 0) {
                        try {
                            var msgv = JSON.parse(body);
                            if (msgv != null) {
                                msg = msgv['msg'];
                            }
                        }
                        catch (ec) { }
                    }
                    this.ob.action_successful(this.monomer, msg);
                };
                RegisterMonomer.prototype.logError = function (error) {
                    console.log(error);
                    this.ob.action_failed(this.monomer);
                };
                RegisterMonomer.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    this.ob.action_failed(this.monomer);
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return RegisterMonomer;
            }());
            RegisterMonomer = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], RegisterMonomer);
            exports_1("RegisterMonomer", RegisterMonomer);
        }
    };
});
//# sourceMappingURL=register_monomer.js.map
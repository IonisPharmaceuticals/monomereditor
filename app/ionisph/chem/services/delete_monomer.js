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
    var core_1, http_1, Observable_1, urls_1, MonomerSaver;
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
            MonomerSaver = (function () {
                //private monomer_lib_save_url = 'http://localhost:8180/v1/monomers/save';
                function MonomerSaver(_http) {
                    this._http = _http;
                }
                MonomerSaver.prototype.saveMonomer = function (monomer) {
                    var username = 'test';
                    var password = 'password';
                    var body = JSON.stringify(monomer);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    //this._http.get(this.monomer_lib_save_url+"?"+body).subscribe(response => console.log ( response ));
                    this._http.post(urls_1.URLs.monomer_lib_save_url, body, { headers: headers }).subscribe(function (response) { return console.log(response); });
                    //.post(this.monomer_lib_save_url,
                    //    body, {
                    //        headers: headers
                    //    })
                    //.map(response => response.json())
                    //.subscribe(
                    //    response => this.response(response.id_token),
                    //    this.logError,
                    //    () => console.log('Authentication Complete')
                    //);
                    //console.log ( "saving the monomer " + monomer.monomer.alternateId );
                };
                MonomerSaver.prototype.response = function (res) {
                    console.log(res);
                };
                MonomerSaver.prototype.logError = function (error) {
                    console.log(error);
                };
                MonomerSaver.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return MonomerSaver;
            }());
            MonomerSaver = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], MonomerSaver);
            exports_1("MonomerSaver", MonomerSaver);
        }
    };
});
//# sourceMappingURL=delete_monomer.js.map
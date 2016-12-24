System.register(["@angular/core", "@angular/http", "rxjs/Observable", "./urls", "./../../chem/lib/custom_browser_xhr"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, urls_1, custom_browser_xhr_1, DownloadData;
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
            },
            function (custom_browser_xhr_1_1) {
                custom_browser_xhr_1 = custom_browser_xhr_1_1;
            }
        ],
        execute: function () {
            DownloadData = (function () {
                function DownloadData(_http, _browser) {
                    this._http = _http;
                    this._browser = _browser;
                }
                DownloadData.prototype.saveMonomer = function (monomer, ob) {
                    var _this = this;
                    this.currentMonomer = monomer;
                    this.ob = ob;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(monomer);
                    this._http.post(urls_1.URLs.monomer_lib_save_url, body, { headers: headers }).subscribe(function (response) { return _this.response(response); });
                };
                DownloadData.prototype.updateMonomer = function (monomer, ob) {
                    var _this = this;
                    this.ob = ob;
                    this.currentMonomer = monomer;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var body = JSON.stringify(monomer);
                    this._http.post(urls_1.URLs.monomer_lib_save_url, body, { headers: headers }).do(function (data) { return console.log('All: ' + JSON.stringify(data)); }).subscribe(function (response) { return _this.response(response); });
                };
                DownloadData.prototype.downloadPub = function () {
                    var _this = this;
                    this._http.get(urls_1.URLs.monomer_lib_download_public_monomers_url + 'type=public').subscribe(function (response) { return _this.descargarArchivo(response); });
                };
                DownloadData.prototype.downloadPrivate = function () {
                    var _this = this;
                    this._http.get(urls_1.URLs.monomer_lib_download_public_monomers_url + 'type=private').subscribe(function (response) { return _this.descargarArchivo(response); });
                };
                DownloadData.prototype.downloadAll = function () {
                    var _this = this;
                    this._http.get(urls_1.URLs.monomer_lib_download_public_monomers_url + 'type=all').subscribe(function (response) { return _this.descargarArchivo(response); });
                };
                DownloadData.prototype.descargarArchivo = function (response) {
                    var blob = new Blob([response.text()], { type: 'text/sdf' });
                    var url = window.URL.createObjectURL(blob);
                    saveAs(blob, 'monomer_library.sdf');
                };
                DownloadData.prototype.response = function (res) {
                    console.log(res);
                    if (this.ob != null) {
                        this.ob.action_successful(this.currentMonomer, "");
                    }
                };
                DownloadData.prototype.logError = function (error) {
                    console.log(error);
                    this.ob.action_failed(this.currentMonomer);
                };
                DownloadData.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    this.ob.action_failed(this.currentMonomer);
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                return DownloadData;
            }());
            DownloadData = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, custom_browser_xhr_1.CustomBrowserXhr])
            ], DownloadData);
            exports_1("DownloadData", DownloadData);
        }
    };
});
//# sourceMappingURL=download_data.js.map
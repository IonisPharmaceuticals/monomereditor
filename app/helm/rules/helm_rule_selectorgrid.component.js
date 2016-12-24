System.register(["@angular/core", "@angular/http", "rxjs/Observable", "ng2-bs3-modal/ng2-bs3-modal", "./../util/result_table_manager"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, ng2_bs3_modal_1, result_table_manager_1, HELMRulesSelctorGrid;
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
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (result_table_manager_1_1) {
                result_table_manager_1 = result_table_manager_1_1;
            }
        ],
        execute: function () {
            HELMRulesSelctorGrid = (function () {
                function HELMRulesSelctorGrid(_http, ref) {
                    this._http = _http;
                    this.ref = ref;
                    this.helm_rules_resource = "";
                    this.error_message = "";
                    this.function_name = "";
                    this.function_author = "";
                    this.function_description = "";
                    this.function_text = "function (helm, callback){\n\n\n\n                                               }";
                    this.table_manager = new result_table_manager_1.ResultTableManager();
                }
                HELMRulesSelctorGrid.prototype.ngOnInit = function () {
                    var _this = this;
                    this.table_manager.addListener(this);
                    this._http.get(this.helm_rules_resource + "/list")
                        .map(this.extract_data)
                        .catch(this.handleError).subscribe(function (json) { return _this.set_data(json); }, function (error) { return _this.error_message = error; });
                };
                HELMRulesSelctorGrid.prototype.set_data = function (data) {
                    this.data = data;
                    this.ref.markForCheck();
                };
                HELMRulesSelctorGrid.prototype.setSelectedRow = function (data) {
                    if ('helm_function' in data) {
                        this.function_text = data['helm_function'];
                    }
                    if ('id' in data) {
                        this.function_name = data['id'];
                    }
                    if ('author' in data) {
                        this.function_author = data['author'];
                    }
                    if ('description' in data) {
                        this.function_description = data['description'];
                    }
                    this.show_helm_rule_editor();
                };
                HELMRulesSelctorGrid.prototype.show_helm_rule_editor = function () {
                    var _this = this;
                    if (this.modal) {
                        this._http.get(this.helm_rules_resource + "/list")
                            .map(this.extract_data)
                            .catch(this.handleError).subscribe(function (json) { return _this.set_data_show(json); }, function (error) { return _this.error_message = error; });
                    }
                };
                HELMRulesSelctorGrid.prototype.set_data_show = function (js) {
                    this.set_data(js);
                    if (this.modal) {
                        this.modal.open("lg");
                        this.modal.visible = true;
                    }
                };
                HELMRulesSelctorGrid.prototype.closehelm_rule_editor = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                HELMRulesSelctorGrid.prototype.apply_function = function () {
                    if (this.function_name == null || this.function_name.length <= 0
                        || this.function_author.length <= 0
                        || this.function_text.length <= 0) {
                        return;
                    }
                    var m = {
                        "id": this.function_name,
                        "author": this.function_author,
                        "description": this.function_description,
                        "helm_function": this.function_text,
                    };
                    var helm_function = { "helm_rule": m };
                    var current_helm = this.helm_viewer.getHELM();
                    if (current_helm == undefined || current_helm == null) {
                        current_helm = "";
                    }
                    // this works!!! 
                    var function_string = "let helm = '" + current_helm + "';\n"
                        + this.function_text +
                        "this.helm_viewer.setHELM(helm)";
                    console.log(function_string);
                    var F = new Function(function_string);
                    F.call(this);
                    this.closehelm_rule_editor();
                };
                HELMRulesSelctorGrid.prototype.handleResponse = function (response) {
                    console.log(' item is saved ' + JSON.stringify(response.json()));
                    var j = response.json();
                    if ('complete' in j) {
                        if (j['complete'] == "successful") {
                            this.modal.close();
                            this.refresh();
                        }
                    }
                };
                HELMRulesSelctorGrid.prototype.refresh = function () {
                    var _this = this;
                    this._http.get(this.helm_rules_resource + "/list")
                        .map(this.extract_data)
                        .catch(this.handleError).subscribe(function (json) { return _this.set_data(json); }, function (error) { return _this.error_message = error; });
                };
                HELMRulesSelctorGrid.prototype.extract_data = function (res) {
                    var body = res.json();
                    return body;
                };
                HELMRulesSelctorGrid.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                HELMRulesSelctorGrid.prototype.click = function (event) {
                };
                return HELMRulesSelctorGrid;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], HELMRulesSelctorGrid.prototype, "modal", void 0);
            HELMRulesSelctorGrid = __decorate([
                core_1.Component({
                    selector: 'helm-rules-selector',
                    templateUrl: './app/helm/rules/helm_rule_selectorgrid.html',
                    inputs: ['helm_rules_resource', 'helm_viewer']
                }),
                __metadata("design:paramtypes", [http_1.Http, core_1.ChangeDetectorRef])
            ], HELMRulesSelctorGrid);
            exports_1("HELMRulesSelctorGrid", HELMRulesSelctorGrid);
            // function callfunction ( fun_ , exect){
            //     fun_(exect);
            // }
        }
    };
});
// function callfunction ( fun_ , exect){
//     fun_(exect);
// }
//# sourceMappingURL=helm_rule_selectorgrid.component.js.map
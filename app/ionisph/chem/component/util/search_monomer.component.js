System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, SearchMonomers;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            SearchMonomers = (function () {
                //.tabContainer {
                //    padding: 10px;
                //    color: black;
                //    font-size: x-small;
                //    height: 400px;
                //    width: 100%;
                //    float: left;
                //    overflow: auto;
                //    overflow-x:hidden;
                //}
                // <input #ispub type="checkbox" (change)="go(ispub.checked)"> Is public
                // removed the ispublic filter 10.21.2016
                function SearchMonomers() {
                    this.update = new core_1.EventEmitter();
                    this.update_name = new core_1.EventEmitter();
                    this.ispublic = new core_1.EventEmitter();
                }
                SearchMonomers.prototype.ngOnInit = function () {
                    this.update.emit('');
                    this.update_name.emit('');
                    this.ispublic.emit('');
                };
                SearchMonomers.prototype.updateFilter = function (fv, v) {
                    this.update.emit(fv);
                    this.ispublic.emit(v);
                };
                SearchMonomers.prototype.updateNameFilter = function (fv, v) {
                    this.update_name.emit(fv);
                    this.ispublic.emit(v);
                };
                SearchMonomers.prototype.go = function (v) {
                    this.ispublic.emit(v);
                };
                return SearchMonomers;
            }());
            SearchMonomers = __decorate([
                core_1.Component({
                    selector: 'filter-monomers',
                    inputs: ['substructureList', 'title'],
                    template: "\n\n            <div  style=\"padding: 5px; font-size: x-small\">\n             Symbol: <input #input type=\"text\" (input)=\"updateFilter(input.value,  ispub.checked)\">\n             Name: <input #input_name type=\"text\" (input)=\"updateNameFilter(input_name.value,  ispub.checked)\">\n            <input #ispub type=\"checkbox\" (change)=\"go(ispub.checked)\"> Is public\n            <br>\n            </div>\n            ",
                    outputs: ['update', 'ispublic', 'update_name']
                }),
                __metadata("design:paramtypes", [])
            ], SearchMonomers);
            exports_1("SearchMonomers", SearchMonomers);
        }
    };
});
//# sourceMappingURL=search_monomer.component.js.map
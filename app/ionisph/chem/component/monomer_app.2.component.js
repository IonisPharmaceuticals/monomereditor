System.register(["@angular/core", "../services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, MonomerApp2;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (monomer_saver_1_1) {
                monomer_saver_1 = monomer_saver_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            }
        ],
        execute: function () {
            MonomerApp2 = (function () {
                function MonomerApp2(save_mon) {
                    this.save_mon = save_mon;
                    this.mode = "lib";
                }
                MonomerApp2.prototype.hide = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                MonomerApp2.prototype.loadRegistration = function () {
                    this.mode = "registration";
                };
                MonomerApp2.prototype.loadSearch = function () {
                    this.mode = "lib";
                };
                MonomerApp2.prototype.myFunction = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                MonomerApp2.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                };
                MonomerApp2.prototype.saveSelectedMonomer = function (model) {
                    this.modal.open();
                    // this.save_mon.saveMonomer(this.monomer_manager.selectedMonomer, this);
                    this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
                };
                MonomerApp2.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                MonomerApp2.prototype.action_failed = function () {
                    this.modal.close();
                };
                MonomerApp2.prototype.setMode = function (mode) {
                    this.mode = mode;
                };
                MonomerApp2.prototype.buildunit = function () {
                    this.mode = "unit_builder";
                };
                MonomerApp2.prototype.buildOligo = function () {
                    this.mode = "oligo_builder";
                };
                MonomerApp2.prototype.deleteMonomer = function () {
                };
                MonomerApp2.prototype.librarymanager = function () {
                    this.mode = "monomer_manager";
                };
                MonomerApp2.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return MonomerApp2;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerApp2.prototype, "modal", void 0);
            MonomerApp2 = __decorate([
                core_1.Component({
                    selector: 'monomer-app2',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n    \n        <div class='panel panel-heading' >\n            <div style=\"padding: 3px\" class=\"btn-group\">\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Monomer Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"loadRegistration()\">Substructure Search</button>\n                </li>\n                <li class=\"divider\"></li>\n                <li>               \n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"loadRegistration()\">Monomer viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Oligo Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligodb.search.ion')\">Search Ions</button>\n                </li>\n                <li>               \n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligo_database.search_sequence')\">Sequence</button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Tools\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\"(click)=\"buildOligo()\">HELM structure viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            </div>\n        <span [ngSwitch]=\"mode\">\n          <span *ngSwitchCase=\"'registration'\">        \n                <monomer2-lib></monomer2-lib>\n           </span>\n          <span *ngSwitchCase=\"'lib'\">\n              <!--Monomer library: -->\n                  <monomer2-lib></monomer2-lib>\n           </span>\n          <span *ngSwitchCase=\"'monomer_manager'\">\n                <monomer-library-manager></monomer-library-manager>\n           </span>\n          <span *ngSwitchCase=\"'unit_builder'\">\n                <unit-builder></unit-builder>\n           </span>\n          <span *ngSwitchCase=\"'oligo_builder'\">\n                <oligo-builder></oligo-builder>\n           </span>\n          <span *ngSwitchCase=\"'oligodb.search.ion'\">\n             <oligo-search [monomer_db]=\"monomer_db\" [mode]=\"'ion'\"></oligo-search>\n           </span>\n          <span *ngSwitchDefault>\n            </span>\n        </span>\n\n    < #modal>\n        <modal-header [show-close]=\"true\">\n            <h4 class=\"modal-title\"></h4>\n        </modal-header>\n        <modal-body>\n            Saved.\n        </modal-body>\n    </modal>\n</div>\n\n    ",
                    // directives: [MonomerManager, MODAL_DIRECTIVES, MonomerRegistration2Component,
                    //     SearchMonomers2Component, MonomerLibraryManager, UnitBuilder, OligoBuilder, OligoDatabaseManager, OligoDatabaseSearch],
                    providers: [monomer_saver_1.MonomerSaver]
                }),
                __metadata("design:paramtypes", [monomer_saver_1.MonomerSaver])
            ], MonomerApp2);
            exports_1("MonomerApp2", MonomerApp2);
        }
    };
});
//# sourceMappingURL=monomer_app.2.component.js.map
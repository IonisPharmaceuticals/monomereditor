System.register(["@angular/core", "./ionisph/chem/services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, router_1, MonomerRoutingComponent;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            MonomerRoutingComponent = (function () {
                function MonomerRoutingComponent(route, router, save_mon) {
                    this.route = route;
                    this.router = router;
                    this.save_mon = save_mon;
                    this.mode = "lib";
                }
                Object.defineProperty(MonomerRoutingComponent.prototype, "routeAnimation", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                MonomerRoutingComponent.prototype.hide = function () {
                    this.route.params.forEach(function (params) {
                        var monomerid = params['id'];
                    });
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                MonomerRoutingComponent.prototype.loadRegistration = function () {
                    this.mode = "registration";
                };
                MonomerRoutingComponent.prototype.loadSearch = function () {
                    this.mode = "lib";
                };
                MonomerRoutingComponent.prototype.myFunction = function () {
                    document.getElementById("myDropdown").classList.toggle("show");
                };
                MonomerRoutingComponent.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                };
                // saveSelectedMonomer(model:any):void {
                //     this.modal.open();
                //     this.save_mon.saveMonomer(this.monomer_manager.selectedMonomer, this);
                //     this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
                // }
                MonomerRoutingComponent.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                MonomerRoutingComponent.prototype.action_failed = function () {
                    this.modal.close();
                };
                MonomerRoutingComponent.prototype.setMode = function (mode) {
                    this.mode = mode;
                };
                MonomerRoutingComponent.prototype.buildunit = function () {
                    this.mode = "unit_builder";
                };
                MonomerRoutingComponent.prototype.buildOligo = function () {
                    this.mode = "oligo_builder";
                };
                MonomerRoutingComponent.prototype.deleteMonomer = function () {
                };
                MonomerRoutingComponent.prototype.librarymanager = function () {
                    this.mode = "monomer_manager";
                };
                MonomerRoutingComponent.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return MonomerRoutingComponent;
            }());
            __decorate([
                core_1.HostBinding('@routeAnimation'),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], MonomerRoutingComponent.prototype, "routeAnimation", null);
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerRoutingComponent.prototype, "modal", void 0);
            MonomerRoutingComponent = __decorate([
                core_1.Component({
                    selector: 'monomer-navigation',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
                    template: "\n\n        <div class='panel panel-heading' >\n            <div style=\"padding: 3px\" class=\"btn-group\">\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Monomer Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"loadRegistration()\">Substructure Search</button>\n                </li>\n                <li class=\"divider\"></li>\n                <li>               \n                    <button type=\"button\" class=\"btn btn-link\" (click)=\"loadRegistration()\">Monomer viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Oligo Database\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligodb.search.ion')\">Search Ions</button>\n                </li>\n                <li>               \n                     <button type=\"button\" class=\"btn btn-link\" (click)=\"setMode('oligo_database.search_sequence')\">Sequence</button>\n                </li>\n                </ul>\n            </div>\n\n            <div class=\"dropdown\">\n                <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Tools\n                <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu\">\n                <li>\n                     <button type=\"button\" class=\"btn btn-link\"(click)=\"buildOligo()\">HELM structure viewer</button>\n                </li>\n                </ul>\n            </div>\n\n            </div>\n\n                \n\n                <span [ngSwitch]=\"mode\">\n                    <span *ngSwitchCase=\"'registration'\">        \n                        <monomer-library></monomer-library>\n                    </span>\n                    <span *ngSwitchCase=\"'lib'\">\n                        <monomer-library>Loading monomer library... </monomer-library>\n                    </span>\n                    <span *ngSwitchCase=\"'monomer_manager'\">\n                        <monomer-library-manager></monomer-library-manager>\n                    </span>\n                    <span *ngSwitchCase=\"'unit_builder'\">\n                        <unit-builder></unit-builder>\n                    </span>\n                    <span *ngSwitchCase=\"'oligo_builder'\">\n                        <oligo-builder></oligo-builder>\n                    </span>\n                    <span *ngSwitchCase=\"'oligodb.search.ion'\">\n                        <oligo-search [monomer_db]=\"monomer_db\" [mode]=\"'Ions'\"></oligo-search>\n                    </span>\n                    <span *ngSwitchDefault>\n                    </span>\n                </span>\n\n\n\n\n\n</div>\n\n    ",
                    animations: [
                        core_1.trigger('routeAnimation', [
                            core_1.state('*', core_1.style({
                                opacity: 1,
                                transform: 'translateX(0)'
                            })),
                            core_1.transition('void => *', [
                                core_1.style({
                                    opacity: 0,
                                    transform: 'translateX(-100%)'
                                }),
                                core_1.animate('0.2s ease-in')
                            ]),
                            core_1.transition('* => void', [
                                core_1.animate('0.5s ease-out', core_1.style({
                                    opacity: 0,
                                    transform: 'translateY(100%)'
                                }))
                            ])
                        ])
                    ],
                    // directives: [MonomerManager, MODAL_DIRECTIVES, MonomerRegistration2Component,
                    //     SearchMonomers2Component, MonomerLibraryManager, UnitBuilder, OligoBuilder, OligoDatabaseManager, OligoDatabaseSearch],
                    providers: [monomer_saver_1.MonomerSaver],
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    monomer_saver_1.MonomerSaver])
            ], MonomerRoutingComponent);
            exports_1("MonomerRoutingComponent", MonomerRoutingComponent);
        }
    };
});
//# sourceMappingURL=monomer_routing.component.js.map
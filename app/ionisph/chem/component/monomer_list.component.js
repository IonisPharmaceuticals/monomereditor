System.register(["@angular/core", "rxjs/Rx", "../lib/application_control_manager"], function (exports_1, context_1) {
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
    var core_1, application_control_manager_1, MonomerList;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (application_control_manager_1_1) {
                application_control_manager_1 = application_control_manager_1_1;
            }
        ],
        execute: function () {
            MonomerList = (function () {
                function MonomerList(ref) {
                    this.ref = ref;
                    this.selectedGroup = "All";
                }
                MonomerList.prototype.newMonomer = function () {
                };
                MonomerList.prototype.setTerm = function (event) {
                    this.term = event;
                    // this.ref.markForCheck();
                };
                MonomerList.prototype.setNameTerm = function (event) {
                    this.name_term = event;
                    // this.ref.markForCheck();
                };
                MonomerList.prototype.setPub = function (event) {
                    this.ispub = event;
                    // console.log ( ' is public ' + this.ispub );
                    this.ref.markForCheck();
                };
                MonomerList.prototype.ngOnInit = function () {
                    if (this.monomer_manager) {
                        this.monomer_manager.addListener(this);
                    }
                    if (this.app_control != undefined) {
                        this.app_control.addListener(this);
                    }
                    this.app_control.notifyOfNewMonomerState();
                    this.ref.detectChanges();
                };
                MonomerList.prototype.updatevalue = function (elem) {
                    var selectedval = elem.value;
                    this.selectedGroup = selectedval;
                    // console.log ( this.selectedGroup + " ___selected " + selectedval);
                    if (selectedval == 'NewMonomer') {
                        this.app_control.notifyOfNewMonomerState();
                    }
                    this.ref.detectChanges();
                };
                MonomerList.prototype.updateGroup = function (ngroup) {
                    this.selectedGroup = ngroup;
                    this.ref.detectChanges();
                };
                MonomerList.prototype.select = function (vl, $event) {
                    var val = vl.value;
                    // console.log( ' value : '+ val );
                };
                MonomerList.prototype.updateSelectedStructure = function (ionisMon, msg) { };
                MonomerList.prototype.updateSelectedSubstructureList = function (substructureList) {
                    if ((substructureList != undefined) && substructureList.length > 1) {
                        this.substructureList = substructureList;
                        this.selectedGroup = 'Substructure';
                        this.ref.markForCheck();
                    }
                };
                return MonomerList;
            }());
            MonomerList = __decorate([
                core_1.Component({
                    selector: 'monomer-list',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
                    changeDetection: core_1.ChangeDetectionStrategy.Default,
                    inputs: ['monomer_db', 'monomer_manager', 'app_control', 'selectedGroup'],
                    template: "\n\n            <div  class=\"table-responsive\" style=\"padding: 15px;\">\n            <!--<div class=\"col-xs-12 col-sm-6 col-md-8\">-->\n            <select class=\"form-control\" type=\"input\" (change)=\"updatevalue(selectedvalue)\" #selectedvalue>\n                  <option value=\"All\">All</option>\n                  <option value=\"Chem\">Chem (e.g. conjugate structures) </option>\n                  <option value=\"RNA_BACKBONE\" >Sugars and linkers (backbone structures)</option>\n                  <option value=\"Bases\">Bases (branch structures) </option>\n                  <option value=\"Peptides\">Peptides </option>\n                  <option value=\"LegacySearch\">Legacy Search</option>\n                  <option value=\"Substructure\">Substructure</option>\n                  <option value=\"NewMonomer\">New Monomer</option>\n            </select>\n\n\n\n             <div class=\"row\">\n             </div>\n            <div *ngIf='selectedGroup==\"All\"' class=\"row\">\n                  <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\" (update)=\"setTerm($event)\" (ispublic)=\"setPub($event)\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" \n                  [searchTerm]=\"term\" \n                  [nameSearchTerm]=\"name_term\" \n                  [ispublic]=\"ispub\"></monomer-group>\n            </div>\n\n\n\n\n            <div *ngIf='selectedGroup==\"LegacySearch\"' class=\"row\">\n                  <legacy-monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [id_value]=\"id_value\"></legacy-monomer-group>\n            </div>\n\n\n\n            <div *ngIf='selectedGroup==\"Substructure\"' class=\"row\">\n                  <substructure-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\"></substructure-group>\n            </div>\n            <div *ngIf='selectedGroup==\"Chem\"' class=\"row\">\n               <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\"  \n               (update)=\"term = $event\" (ispublic)=\"ispub = $event\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [polymer_type]=\"'CHEM'\" [searchTerm]=\"term\" \n                    [nameSearchTerm]=\"name_term\" \n                  [ispublic]=\"ispub\"></monomer-group>\n            </div>\n            <div *ngIf='selectedGroup==\"RNA\"' class=\"row\">\n               <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\"  (update)=\"term = $event\" (ispublic)=\"ispub = $event\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [polymer_type]=\"'RNA'\" [searchTerm]=\"term\"\n                    [nameSearchTerm]=\"name_term\"                   \n                   [ispublic]=\"ispub\"></monomer-group>\n            </div>\n            <div *ngIf='selectedGroup==\"RNA_BACKBONE\"' class=\"row\">\n               <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\"  (update)=\"term = $event\" (ispublic)=\"ispub = $event\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [polymer_type]=\"'RNA'\" [monomer_type]=\"'backbone'\" [searchTerm]=\"term\" \n                    [nameSearchTerm]=\"name_term\" \n                  [ispublic]=\"ispub\"></monomer-group>\n            </div>\n            \n            <div *ngIf='selectedGroup==\"Peptides\"' class=\"row\">\n               <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\"  (update)=\"term = $event\" (ispublic)=\"ispub = $event\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [polymer_type]=\"'PEPTIDE'\" [monomer_type]=\"'backbone'\" [searchTerm]=\"term\"\n                    [nameSearchTerm]=\"name_term\" \n                   [ispublic]=\"ispub\"></monomer-group>\n            </div>\n            <div *ngIf='selectedGroup==\"Bases\"' class=\"row\">\n               <filter-monomers [substructureList]=\"substructureList\" (update_name)=\"setNameTerm($event)\"  (update)=\"term = $event\" (ispublic)=\"ispub = $event\" ></filter-monomers>\n                  <monomer-group [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\" [polymer_type]=\"'RNA'\" [monomer_type]=\"'branch'\" [searchTerm]=\"term\" \n                    [nameSearchTerm]=\"name_term\" \n                  [ispublic]=\"ispub\"></monomer-group>\n            </div>\n            <div *ngIf='selectedGroup==\"NewMonomer\"' class=\"row\">\n                  <new-monomer [monomer_db]=\"monomer_db\" [monomer_manager]=\"monomer_manager\"\n                  monomer_type=\"any\" [app_control]=\"app_control\"></new-monomer>\n            </div>\n            </div>\n    ",
                    // directives: [MonomerGroup, LegacyMonomerGroup,  SubstructureGroup, SearchMonomers, LegacySearchMonomers, NewMonomer],
                    providers: [application_control_manager_1.ApplicationControls]
                }),
                __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
            ], MonomerList);
            exports_1("MonomerList", MonomerList);
        }
    };
});
//# sourceMappingURL=monomer_list.component.js.map
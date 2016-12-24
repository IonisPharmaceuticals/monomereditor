/**
 * Created by jmilton on 6/2/2016.
 */
System.register(["@angular/core", "../services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal", "../services/register_monomer", "../iattachment"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, register_monomer_1, iattachment_1, RegisterMonomerEditor;
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
            function (register_monomer_1_1) {
                register_monomer_1 = register_monomer_1_1;
            },
            function (iattachment_1_1) {
                iattachment_1 = iattachment_1_1;
            }
        ],
        execute: function () {/**
             * Created by jmilton on 6/2/2016.
             */
            RegisterMonomerEditor = (function () {
                function RegisterMonomerEditor(register_monomer) {
                    this.register_monomer = register_monomer;
                }
                RegisterMonomerEditor.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                };
                RegisterMonomerEditor.prototype.registerLegacy = function (model) {
                    this.legacy_modal.open();
                    this.molfile = this.monomer_manager.getMolfileForCurrentStructure();
                };
                RegisterMonomerEditor.prototype.commitLegacy = function (model) {
                    this.legacy_modal.close();
                    this.register_monomer.submitToLegacyDB(this.legacy_type, this.molfile, "jmilton", this.legacy_name, this.molecular_weight, this.molecular_formula, this.conjugation_id);
                };
                RegisterMonomerEditor.prototype.cancelLegacy = function (model) {
                    this.legacy_modal.close();
                };
                RegisterMonomerEditor.prototype.buildAttachmentList = function () {
                    var ab = [];
                    ab.push(new iattachment_1.IAttachment("R1-" + this.attachment1));
                    ab.push(new iattachment_1.IAttachment("R2-" + this.attachment2));
                    ab.push(new iattachment_1.IAttachment("R3-" + this.attachment3));
                    return ab;
                };
                RegisterMonomerEditor.prototype.saveSelectedMonomer = function (model) {
                    this.monomer_manager.selectedMonomer.monomer.attachmentList = this.buildAttachmentList();
                    this.monomer_manager.selectedMonomer.monomer.molfile = this.monomer_manager.getMolfileForCurrentStructure();
                    if (this.monomer_manager.selectedMonomer.monomer.molfile == null || this.monomer_manager.selectedMonomer.monomer.molfile.length <= 0) {
                        alert("Structure was not found ");
                        return;
                    }
                    this.modal.open();
                    this.monomer_manager.selectedMonomer.monomer.canSMILES = this.monomer_manager.getViewerSmiles();
                    this.register_monomer.submitAsFORM(this.monomer_manager.selectedMonomer, this);
                    this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
                };
                RegisterMonomerEditor.prototype.action_successful = function () {
                    if (this.modal) {
                        this.modal.close();
                        this.modal.visible = false;
                    }
                };
                RegisterMonomerEditor.prototype.action_failed = function () {
                    this.modal.close();
                };
                RegisterMonomerEditor.prototype.deleteMonomer = function () {
                };
                RegisterMonomerEditor.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                return RegisterMonomerEditor;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], RegisterMonomerEditor.prototype, "modal", void 0);
            __decorate([
                core_1.ViewChild('legacy_modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], RegisterMonomerEditor.prototype, "legacy_modal", void 0);
            RegisterMonomerEditor = __decorate([
                core_1.Component({
                    selector: 'register-monomer-editor',
                    styleUrls: ['app/ionisph/chem/component/component_styles/list.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'app_control'],
                    template: "\n  <div *ngIf=\"monomer_manager.selectedMonomer\" class='panel panel-heading' style=\"color: darkblue; padding: 2px;\">\n                        <form class=\"form-inline\" role=\"form\">\n                              <div class=\"form-group\">\n                                        <label for=\"m_id\">ID</label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.alternateId\" class=\"form-control\" id=\"m_id\" type=\"text\">\n                                        <label for=\"m_name\"> Name </label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.name\" class=\"form-control\" id=\"m_name\" type=\"text\">\n                                        <!--<label for=\"m_smiles\"> SMILES </label>-->\n                                        <!--<input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.canSMILES\" class=\"form-control\" id=\"m_smiles\" type=\"text\">-->\n                                        <br>\n                                        \n                                        <label for=\"m_monomer_type\"> Monomer Type</label>\n                                        <select class=\"form-control\" type=\"input\" [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.monomerType\"  #mid>\n                                              <option value=\"backbone\">Backbone </option>\n                                              <option value=\"branch\" >Branch</option>\n                                        </select>\n                                        \n                                        <label for=\"m_polymer_type\"> Polymer Type</label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.polymerType\" class=\"form-control\" id=\"m_polymer_type\" type=\"text\">\n                                        <br>\n                                        <label for=\"m_natural_analog\"> Natural Analog </label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.naturalAnalog\" class=\"form-control\" id=\"m_natural_analog\" type=\"text\">\n                                        <label for=\"focusedInput\">Public status</label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.ispublic\" class=\"form-control\" id=\"focusedInput\" type=\"text\">\n                                        <br>\n                                        <b> Default Monomer Attachment Chemistry </b>\n                                        \n                                        <label for=\"focusedInput\">R1</label>\n                                        <input #mid [(ngModel)]=\"attachement1\" class=\"form-control\" id=\"focusedInput\" type=\"text\">\n                                        <label for=\"focusedInput\">R2</label>\n                                        <input #mid [(ngModel)]=\"attachment2\" class=\"form-control\" id=\"focusedInput\" type=\"text\">\n                                        <label for=\"focusedInput\">R3</label>\n                                        <input #mid [(ngModel)]=\"attachment3\" class=\"form-control\" id=\"focusedInput\" type=\"text\">\n                                        \n                              </div>\n                        </form>\n                        <!--<button type=\"button\" (click)=\"newMonomer()\" class=\"btn btn-secondary\">New</button>-->\n                        <button type=\"button\" (click)=\"saveSelectedMonomer(modal)\" class=\"btn btn-secondary\">Register</button>\n                        <button type=\"button\" (click)=\"registerLegacy(legacy_modal)\" class=\"btn btn-secondary\">Register (legacy db)</button>\n\n\n                        <modal #modal>\n                            <modal-header [show-close]=\"true\">\n                                <h4 class=\"modal-title\"></h4>\n                            </modal-header>\n                            <modal-body>\n                                Saved.\n                            </modal-body>\n                            <!--<modal-footer [show-default-buttons]=\"true\"></modal-footer>-->\n                        </modal>\n                        <modal #legacy_modal>\n                            <modal-header [show-close]=\"true\">\n                                <h4 class=\"modal-title\"></h4>\n                            </modal-header>\n                            <modal-body>\n                            \n                            \n                                <form class=\"form-inline\" role=\"form\">\n                                  <div class=\"form-group\">\n                                            <label for=\"m_name\"> Name </label>\n                                            <input #mid [(ngModel)]=\"legacy_name\" class=\"form-control\" id=\"m_name\" type=\"text\">\n                                            <label for=\"m_monomer_type\"> Monomer Type</label>\n                                            <select class=\"form-control\" type=\"input\" [(ngModel)]=\"legacy_type\"  #mid>\n                                                  <option value=\"backbone\">Endcap </option>\n                                                  <option value=\"branch\" > Sugar </option>\n                                                  <option value=\"branch\" > Linker </option>\n                                            </select>\n                        <button type=\"button\" (click)=\"commitLegacy(legacy_modal)\" class=\"btn btn-secondary\">Commit </button>\n                        <button type=\"button\" (click)=\"cancelLegacy(legacy_modal)\" class=\"btn btn-secondary\"> Cancel </button>\n                                  </div>\n                                </form>\n\n                            \n                            \n                            \n                            \n                            </modal-body>\n                            <!--<modal-footer [show-default-buttons]=\"true\"></modal-footer>-->\n                        </modal>\n\n\n</div>\n\n    ",
                    // directives: [MonomerManager, MODAL_DIRECTIVES],
                    providers: [monomer_saver_1.MonomerSaver, register_monomer_1.RegisterMonomer]
                }),
                __metadata("design:paramtypes", [register_monomer_1.RegisterMonomer])
            ], RegisterMonomerEditor);
            exports_1("RegisterMonomerEditor", RegisterMonomerEditor);
        }
    };
});
//# sourceMappingURL=register_monomer_editor.component.js.map
/**
 * Created by jmilton on 6/2/2016.
 */
System.register(["@angular/core", "../services/monomer_saver", "ng2-bs3-modal/ng2-bs3-modal", "../../chem/iattachment"], function (exports_1, context_1) {
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
    var core_1, monomer_saver_1, ng2_bs3_modal_1, iattachment_1, MonomerEditor;
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
            function (iattachment_1_1) {
                iattachment_1 = iattachment_1_1;
            }
        ],
        execute: function () {/**
             * Created by jmilton on 6/2/2016.
             */
            MonomerEditor = (function () {
                function MonomerEditor(save_mon) {
                    this.save_mon = save_mon;
                    this.msg = "";
                    this.smiles_hits = new Array();
                    this.canonical_smiles_hits = "";
                    this.morgan_fp_hits = "";
                }
                MonomerEditor.prototype.structures_found = function (hits) {
                    this.smiles_hits = new Array();
                    if (hits.length > 0) {
                        for (var _i = 0, hits_1 = hits; _i < hits_1.length; _i++) {
                            var h = hits_1[_i];
                            if (h.hit_type == 'canonical_smiles') {
                                this.canonical_smiles_hits += " " + h.symbol + " ";
                            }
                            else if (h.hit_type == 'topology') {
                                this.msg += " " + h.symbol + " ";
                            }
                            else if (h.hit_type == 'morgan_fingerprint') {
                                this.morgan_fp_hits += " " + h.symbol + " ";
                            }
                        }
                    }
                    else {
                        this.msg = "This is a unique structure.";
                    }
                };
                MonomerEditor.prototype.ngOnInit = function () {
                    if (this.app_control != null) {
                        this.app_control.addListener(this);
                    }
                    if (this.monomer_manager != null) {
                        this.monomer_manager.addListener(this);
                        this.monomer_manager.addStructureClashListener(this);
                    }
                    // this sucks nned to change but time is kickin my butt right now 
                    if (this.monomer_manager.selectedMonomer != null && this.monomer_manager.selectedMonomer.monomer != null) {
                        var alist = this.monomer_manager.selectedMonomer.monomer.attachmentList;
                        for (var a = 0; a < alist.length; a++) {
                            if (a == 0) {
                                this.attachment1 = alist[0].capGroupName;
                            }
                            if (a == 1) {
                                this.attachment2 = alist[1].capGroupName;
                            }
                            if (a == 2) {
                                this.attachment3 = alist[2].capGroupName;
                            }
                        }
                    }
                };
                MonomerEditor.prototype.is_monomer_type = function (v) {
                    if (v == this.monomer_manager.selectedMonomer.monomer.monomerType) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                MonomerEditor.prototype.is_polymer_type = function (v) {
                    if (v == this.monomer_manager.selectedMonomer.monomer.polymerType) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                MonomerEditor.prototype.updateSelectedStructure = function (ionisMon, msg) {
                    this.msg = msg;
                    this.canonical_smiles_hits = "";
                    this.morgan_fp_hits = "";
                    this.update_attachment_text();
                };
                MonomerEditor.prototype.updateSelectedSubstructureList = function (substructureList) {
                };
                /**
                 *  not proud of this method. but time is not on my side.
                 */
                MonomerEditor.prototype.update_attachment_text = function () {
                    this.attachment1 = '';
                    this.attachment2 = '';
                    this.attachment3 = '';
                    if (this.monomer_manager.selectedMonomer == null || this.monomer_manager.selectedMonomer.monomer.attachmentList == undefined)
                        return;
                    var i = 0;
                    for (var i_1 = 0; i_1 < this.monomer_manager.selectedMonomer.monomer.attachmentList.length; i_1++) {
                        var val = this.monomer_manager.selectedMonomer.monomer.attachmentList[i_1];
                        if (i_1 == 0) {
                            this.attachment1 = val.capGroupName;
                        }
                        else if (i_1 == 1) {
                            this.attachment2 = val.capGroupName;
                        }
                        else if (i_1 == 2) {
                            this.attachment3 = val.capGroupName;
                        }
                    }
                };
                MonomerEditor.prototype.set_polymer_type = function (type) {
                    this.monomer_manager.selectedMonomer.monomer.polymerType = type;
                };
                MonomerEditor.prototype.set_monomer_type = function (type) {
                    this.monomer_manager.selectedMonomer.monomer.monomerType = type;
                    // this.saveSelectedMonomer( this.modal );
                };
                MonomerEditor.prototype.saveSelectedMonomer = function (model) {
                    this.msg = "Saving...";
                    this.canonical_smiles_hits = "";
                    this.morgan_fp_hits = "";
                    var at1 = new iattachment_1.IAttachment("R1-" + this.attachment1);
                    var at2 = new iattachment_1.IAttachment("R2-" + this.attachment2);
                    var at3 = new iattachment_1.IAttachment("R3-" + this.attachment3);
                    this.monomer_manager.selectedMonomer.monomer.attachmentList = [];
                    if (this.attachment1 != null && this.attachment1.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R1-" + this.attachment1)));
                    }
                    if (this.attachment2 != null && this.attachment2.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R2-" + this.attachment2)));
                    }
                    if (this.attachment3 != null && this.attachment3.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R3-" + this.attachment3)));
                    }
                    this.monomer_manager.saveCurrentStructure();
                };
                MonomerEditor.prototype.action_successful = function (monomer, msg) {
                    this.monomer_manager.setSelectedMonomer(monomer);
                    this.monomer_manager.reload(this.monomer_manager.selectedMonomer);
                    if (this.monomer_manager.selectedMonomer == null || this.monomer_manager.selectedMonomer.monomer.attachmentList == undefined)
                        return;
                    var i = 0;
                    for (var i_2 = 0; i_2 < this.monomer_manager.selectedMonomer.monomer.attachmentList.length; i_2++) {
                        var val = this.monomer_manager.selectedMonomer.monomer.attachmentList[i_2];
                        if (i_2 == 0) {
                            this.attachment1 = val.capGroupName;
                        }
                        else if (i_2 == 1) {
                            this.attachment2 = val.capGroupName;
                        }
                        else if (i_2 == 2) {
                            this.attachment3 = val.capGroupName;
                        }
                    }
                };
                MonomerEditor.prototype.action_failed = function (monomer) {
                    // this.modal.close();
                };
                MonomerEditor.prototype.deleteMonomer = function () {
                };
                MonomerEditor.prototype.newMonomer = function () {
                    console.log(" reset this panel ");
                };
                MonomerEditor.prototype.save_as = function () {
                    this.modal.close();
                    this.canonical_smiles_hits = "";
                    this.morgan_fp_hits = "";
                    this.msg = "Saving new monomer...";
                    var at1 = new iattachment_1.IAttachment("R1-" + this.attachment1);
                    var at2 = new iattachment_1.IAttachment("R2-" + this.attachment2);
                    var at3 = new iattachment_1.IAttachment("R3-" + this.attachment3);
                    this.monomer_manager.selectedMonomer.monomer.attachmentList = [];
                    this.monomer_manager.selectedMonomer.monomerid = null;
                    if (this.attachment1 != null && this.attachment1.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R1-" + this.attachment1)));
                    }
                    if (this.attachment2 != null && this.attachment2.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R2-" + this.attachment2)));
                    }
                    if (this.attachment3 != null && this.attachment3.length > 0) {
                        this.monomer_manager.selectedMonomer.monomer.attachmentList.push(new iattachment_1.IAttachment(("R3-" + this.attachment3)));
                    }
                    this.monomer_manager.saveCurrentStructure();
                };
                MonomerEditor.prototype.verify_is_unique = function () {
                    this.msg = "Hits based on topology: ";
                    this.canonical_smiles_hits = "Hits based on canonical smiles:  ";
                    this.morgan_fp_hits = "Hits based on Morgan Fingerprint: ";
                    this.monomer_manager.check_topology_uniqueness();
                    this.monomer_manager.check_morgan_topology_uniqueness();
                    this.monomer_manager.check_canonical_smiles_uniqueness();
                };
                MonomerEditor.prototype.register_in_legacy_bird = function (modal) {
                    // this.modal.open('lg');
                    this.monomer_manager.saveLegacyStructure();
                };
                MonomerEditor.prototype.cancel_save = function () {
                    this.modal.close();
                };
                MonomerEditor.prototype.save_as_prompt = function () {
                    this.modal.animation = false;
                    this.modal.open('lg');
                };
                MonomerEditor.prototype.create_new_monomer = function () {
                    this.monomer_manager.setSelectedMonomer(this.monomer_manager.createNewMonomer());
                };
                return MonomerEditor;
            }());
            __decorate([
                core_1.ViewChild('modal'),
                __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
            ], MonomerEditor.prototype, "modal", void 0);
            MonomerEditor = __decorate([
                core_1.Component({
                    selector: 'monomer-editor',
                    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-editor.css'],
                    inputs: ['monomer_db', 'monomer_manager', 'app_control'],
                    template: "\n\n  <div *ngIf=\"monomer_manager.selectedMonomer\" class='panel panel-heading' style=\"color: darkblue; padding: 2px;\">\n\n\n                        <form class=\"form-inline\" role=\"form\">\n                              <div class=\"form-group form-group-sm\">\n\n                                        <label *ngIf='monomer_manager.selectedMonomer.monomerid'> ( {{monomer_manager?.selectedMonomer?.monomerid}} ) </label> > \n                                        <label for=\"m_id\">HELM ID </label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.alternateId\" name=\"monomer_alternateid\" class=\"form-control\" id=\"m_id\" type=\"text\">\n                                        <label for=\"m_name\"> Name </label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.name\" name=\"monomer_name\" class=\"form-control\" id=\"m_name\" type=\"text\" style=\"width=300px\">\n                                        <hr>\n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"optradio\" [checked]=\"is_monomer_type('Backbone')\" (click)=\"set_monomer_type('Backbone')\">Backbone (e.g. sugar, linker)</label>\n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"optradio\" [checked]=\"is_monomer_type('Branch')\" (click)=\"set_monomer_type('Branch')\" > Branch (e.g. base)</label>\n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"optradio\" [checked]=\"is_monomer_type('Undefined')\" (click)=\"set_monomer_type('Undefined')\" > Undefined (e.g. CHEM polymers, endcaps)</label>\n                                        <hr>                                        \n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"POLYradio\"  [checked]=\"is_polymer_type('RNA')\" (click)=\"set_polymer_type('RNA')\">RNA (e.g. sugar, linker)</label>\n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"POLYradio\"  [checked]=\"is_polymer_type('CHEM')\"  (click)=\"set_polymer_type('CHEM')\" > CHEM (e.g. endcap, other chemical conjugates)</label>\n                                        <label class=\"radio-inline\"><input type=\"radio\" name=\"POLYradio\"  [checked]=\"is_polymer_type('PEPTIDE')\"  \n                                        (click)=\"set_polymer_type('CHEM')\" > PEPTIDE </label>\n                                        <hr>\n                                        <label for=\"m_natural_analog\"> Natural Analog </label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.naturalAnalog\" name=\"monomer_natural_analog\" class=\"form-control\" id=\"m_natural_analog\" type=\"text\">\n                                        <hr>\n                                        \n                                        <label for=\"focusedInput\">Public status</label>\n                                        <input #mid [(ngModel)]=\"monomer_manager.selectedMonomer.ispublic\" name=\"is_public\" class=\"form-control\" id=\"focusedInput\" type=\"text\">\n                                        <br>\n                                        \n                                        \n                                        \n                                         <hr>\n                                         \n                                         <p>\n                                            <b>R-group default attachments:</b>\n                                         </p>\n                                         <br>\n\n                                        <label for=\"het_id\">R1 attachment</label>\n                                        <input #mid [(ngModel)]=\"attachment1\" class=\"form-control\" name=\"attachment_id_1\" id=\"attachement_point_id1\" type=\"text\">\n                                        <br>\n                                        <label for=\"het_id\">R2 attachment</label>\n                                        <input #mid [(ngModel)]=\"attachment2\" class=\"form-control\" name=\"attachment_id_2\" id=\"attachement_point_id2\" type=\"text\">\n                                        <br>\n                                        <label for=\"het_id\">R3 attachment</label>\n                                        <input #mid [(ngModel)]=\"attachment3\" class=\"form-control\" name=\"attachment_id_3\" id=\"attachement_point_id3\" type=\"text\">\n                                        <hr>\n                                        <label for=\"primary_citation_label\">Primary Citation</label>\n                                        <br>\n                                        <textarea #mid class=\"form-control\" name=\"citation_text\" rows=\"5\"  cols=\"100\" [(ngModel)]=\"monomer_manager.selectedMonomer.monomer.primary_citation\" type=\"textarea\">\n                                        </textarea>\n                                        <hr>\n\n                              </div>\n                        </form>\n\n                    <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"...\">\n                        <button type=\"button\" (click)=\"verify_is_unique()\" class=\"btn btn-secondary\">Test structure uniqueness</button>\n                        <button type=\"button\" (click)=\"saveSelectedMonomer(modal)\" class=\"btn btn-secondary\">Save</button>\n                        <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"save_as_prompt()\">\n                            <span class=\"glyphicon glyphicon-plus-sign\" aria-hidden=\"true\" ></span>\n                             Save as new monomer\n                        </button>\n                    </div>\n\n                        \n                        {{ msg }}\n                        <br>\n                        {{ canonical_smiles_hits }}\n                        <br>\n                        {{ morgan_fp_hits }}\n\n\n\n<modal #modal item-width=\"'250px'\">\n      <modal-body>\n\n        Are you sure you want to save this as a <b>new</b> monomer?\n\n                        <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"save_as()\">\n                            <span class=\"glyphicon glyphicon-plus-sign\" aria-hidden=\"true\" ></span>\n                            Yes\n                        </button>\n                        <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"cancel_save()\">\n                            Cancel\n                        </button>\n\n\n      </modal-body>\n</modal>\n      \n      \n\n\n\n\n\n                        \n\n</div>\n\n    ",
                    providers: [monomer_saver_1.MonomerSaver],
                    encapsulation: core_1.ViewEncapsulation.None
                }),
                __metadata("design:paramtypes", [monomer_saver_1.MonomerSaver])
            ], MonomerEditor);
            exports_1("MonomerEditor", MonomerEditor);
        }
    };
});
//# sourceMappingURL=monomer_editor.component.js.map
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
    var core_1, HELMParser;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            HELMParser = (function () {
                function HELMParser() {
                }
                HELMParser.prototype.parseChains = function (helm) {
                    var t = this.pullChainGroup(helm);
                    var chains = t.split('|');
                    return chains;
                };
                HELMParser.prototype.pullChainGroup = function (helm) {
                    if (helm.indexOf('$') > 0) {
                        var iv = helm.indexOf('$');
                        var h = helm.substring(0, iv);
                        return h;
                    }
                    else {
                        return helm;
                    }
                };
                HELMParser.prototype.pull_backbone_sequence_from_chain = function (helm) {
                    var seq = "";
                    var sp = helm.split(".");
                    for (var s in sp) {
                        var t = sp[s];
                        if (t != null && t.length > 4) {
                            var vs = t.indexOf('(');
                            var vf = t.indexOf(')');
                            while (vs >= 0 && vf > 0) {
                                var seq_val = t.substring(vs, vf + 1);
                                t = t.replace(seq_val, ' ');
                                vs = t.indexOf('(');
                                vf = t.indexOf(')');
                            }
                            seq += t;
                        }
                    }
                    return seq;
                };
                HELMParser.prototype.parse_backbone_sequence = function (helm) {
                    var chain_group = this.pullChainGroup(helm);
                    var backbone = '';
                    var chains = chain_group.split("|");
                    for (var _i = 0, chains_1 = chains; _i < chains_1.length; _i++) {
                        var chain = chains_1[_i];
                        var start = chain.indexOf('{');
                        var end = chain.indexOf('}');
                        if (start >= 0 && end > 0) {
                            chain = chain.substring(start + 1, end);
                        }
                        backbone += this.pull_backbone_sequence_from_chain(chain);
                        backbone += '|';
                    }
                    if (backbone.endsWith('|')) {
                        backbone = backbone.substring(0, backbone.length - 1);
                    }
                    return backbone;
                };
                HELMParser.prototype.pull_sequence = function (helm) {
                    var seq = "";
                    var sp = helm.split(".");
                    for (var s in sp) {
                        var t = sp[s];
                        var vs = t.indexOf('(');
                        var vf = t.indexOf(')');
                        if (vs >= 0 && vf > 0) {
                            var seq_val = t.substring(vs + 1, vf);
                            seq += ' ' + seq_val + '  ';
                        }
                        else {
                            seq += '  ' + t + ' __ ';
                        }
                    }
                    return seq;
                };
                HELMParser.prototype.parse_nucleotides = function (helm) {
                    var seq = "";
                    var chainindex = helm.indexOf("{");
                    var echainindex = helm.indexOf("}");
                    if (chainindex >= 0 && echainindex > 0) {
                        helm = helm.substring(chainindex + 1, echainindex);
                    }
                    var sp = helm.split(".");
                    return sp;
                };
                HELMParser.prototype.parse_sugar_from_nucleotide = function (nuc) {
                    var monomer_index_marker = nuc.indexOf('.');
                    if (monomer_index_marker >= 0) {
                        nuc = nuc.substring(monomer_index_marker);
                    }
                    var vs = nuc.indexOf('(');
                    if (vs >= 0) {
                        var seq_val = nuc.substring(0, vs);
                        return this.removeBrackets(seq_val);
                    }
                };
                HELMParser.prototype.parse_base_from_nucleotide = function (nuc) {
                    var monomer_index_marker = nuc.indexOf('.');
                    if (monomer_index_marker >= 0) {
                        nuc = nuc.substring(monomer_index_marker);
                    }
                    var vs = nuc.indexOf('(');
                    var vf = nuc.indexOf(')');
                    if (vs >= 0 && vf > 0) {
                        var seq_val = nuc.substring(vs + 1, vf);
                        return this.removeBrackets(seq_val);
                    }
                };
                HELMParser.prototype.parse_linker_from_nucleotide = function (nuc) {
                    var monomer_index_marker = nuc.indexOf('.');
                    if (monomer_index_marker >= 0) {
                        nuc = nuc.substring(monomer_index_marker);
                    }
                    var vs = nuc.indexOf(')');
                    if (vs >= 0 && vs < nuc.length) {
                        var seq_val = nuc.substring(vs + 1);
                        return this.removeBrackets(seq_val);
                    }
                };
                HELMParser.prototype.removeBrackets = function (monomer) {
                    var bindex = monomer.indexOf('[');
                    var cindex = monomer.indexOf(']');
                    if (bindex >= 0 && cindex >= 0) {
                        return monomer.substring(bindex + 1, cindex);
                    }
                    else {
                        return monomer;
                    }
                };
                return HELMParser;
            }());
            HELMParser = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], HELMParser);
            exports_1("HELMParser", HELMParser);
        }
    };
});
//# sourceMappingURL=helm_parser.js.map
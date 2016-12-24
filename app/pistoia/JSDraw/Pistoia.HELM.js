﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
// 2.0.0-2016-10-04
//
//////////////////////////////////////////////////////////////////////////////////


// https://github.com/PistoiaHELM/HELMEditor/blob/master/resources/conf/DefaultMonomerCategorizationTemplate.xml
// 

/**
@project HELM Web Editor
@version 2.0.0
@description HELM Web Editor built on JSDraw.Lite
*/

/**
* HELM namespace
* @namespace org.helm.webeditor
*/

/**
* HELM Version
* @property org.helm.webeditor.version
*/


if (typeof (org) == "undefined")
    org = {};
if (org.helm == null)
    org.helm = {};

org.helm.webeditor = {
    kVersion: "2.0.0.2016-10-04",
    atomscale: 2,
    bondscale: 1.6,

    HELM: {
        BASE: "HELM_BASE",
        SUGAR: "HELM_SUGAR",
        LINKER: "HELM_LINKER",
        AA: "HELM_AA",
        CHEM: "HELM_CHEM"
    },

    isHelmNode: function (a) {
        if (a == null)
            return false;

        var biotype = typeof(a) == "string" ? a : a.biotype();
        return biotype == org.helm.webeditor.HELM.BASE || biotype == org.helm.webeditor.HELM.SUGAR || biotype == org.helm.webeditor.HELM.LINKER ||
            biotype == org.helm.webeditor.HELM.AA || biotype == org.helm.webeditor.HELM.CHEM;
    },

    monomerTypeList: function() {
        var monomertypes = { "": "" };
        monomertypes[org.helm.webeditor.HELM.BASE] = "Base";
        monomertypes[org.helm.webeditor.HELM.SUGAR] = "Sugar";
        monomertypes[org.helm.webeditor.HELM.LINKER] = "Linker";
        monomertypes[org.helm.webeditor.HELM.AA] = "Amino Acid";
        monomertypes[org.helm.webeditor.HELM.CHEM] = "Chem";
        return monomertypes;
    },

    about: function () {
        var me = this;
        if (this.about == null) {
            var div = scil.Utils.createElement(null, "div");
            scil.Utils.createElement(div, "img", null, { width: 425, height: 145 }, { src: scil.Utils.imgSrc("img/helm.png") });

            scil.Utils.createElement(div, "div", "Built on <a target=_blank href='http://www.jsdraw.com'>JSDraw.Lite " + JSDraw2.kFileVersion + "</a> (Free Version), by <a target=_blank href='http://www.scillignece.com'>Scilligence</a>", { textAlign: "right", paddingRight: "26px" });
            var tbody = scil.Utils.createTable(div, null, null, { borderTop: "solid 1px gray", width: "100%" });
            var tr = scil.Utils.createElement(tbody, "tr");
            scil.Utils.createElement(tr, "td", this.kVersion);
            scil.Utils.createElement(tr, "td", "&copy; 2016, <a target='_blank' href='http://www.pistoiaalliance.org/'>http://www.pistoiaalliance.org/</a>", { textAlign: "center" });
            scil.Utils.createElement(scil.Utils.createElement(tbody, "tr"), "td", "&nbsp;");
            var btn = scil.Utils.createElement(scil.Utils.createElement(div, "div", null, { textAlign: "center" }), "button", "OK", { width: scil.Utils.buttonWidth + "px" });

            me.about = new JSDraw2.Dialog("About HELM Web Editor", div);
            scil.connect(btn, "onclick", function (e) { me.about.hide(); e.preventDefault(); });
        }
        this.about.show();
    }
};

if (JSDraw2.Security.kEdition == "Lite")
    JSDraw2.Editor.showAbout = org.helm.webeditor.about;

scil.helm = org.helm.webeditor;
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* Interface class
* @class org.helm.webeditor.Interface
*/
org.helm.webeditor.Interface = {
    /**
    * Create the canvas
    * @function createCanvas
    * @param {DOM} div
    * @param {dict} args - check <a href='http://www.scilligence.com/sdk/jsdraw/logical/scilligence/JSDraw2/Editor.html'>JSDraw SDK</a>
    */
    createCanvas: function (div, args) {
        return new JSDraw2.Editor(div, args);
    },

    /**
    * Create a molecule object
    * @function createMol
    * @param {string} molfile
    */
    createMol: function (molfile) {
        var m = new JSDraw2.Mol();
        m.setMolfile(molfile);
        return m;
    },

    /**
    * Create a point
    * @function createPoint
    * @param {number} x
    * @param {number} y
    */
    createPoint: function (x, y) {
        return new JSDraw2.Point(x, y);
    },

    /**
    * Create a rectangle object
    * @function createRect
    * @param {number} l - left
    * @param {number} t - top
    * @param {number} w - width
    * @param {number} h - height
    */
    createRect: function (l, t, w, h) {
        return new JSDraw2.Rect(l, t, w, h);
    },

    /**
    * Create an atom
    * @function createAtom
    * @param {JSDraw2.Mol} m
    * @param {JSDraw2.Point} p - the coordinate
    */
    createAtom: function (m, p) {
        return m.addAtom(new JSDraw2.Atom(p));
    },

    /**
    * Create a bond between two atoms
    * @function createBond
    * @param {JSDraw2.Mol} m
    * @param {JSDraw2.Atom} a1
    * @param {JSDraw2.Atom} a2
    */
    createBond: function (m, a1, a2) {
        return m.addBond(new JSDraw2.Bond(a1, a2, JSDraw2.BONDTYPES.SINGLE));
    },

    /**
    * Get atom counts
    * @function getAtomStats
    * @param {JSDraw2.Mol} m
    * @param {array} atoms
    */
    getAtomStats: function (m, atoms) {
        var mol = { atoms: atoms, bonds: m.bonds };
        var ret = JSDraw2.FormulaParser.getAtomStats(m);
        return ret == null ? null : ret.elements;
    },

    /**
    * Test if two molecules are equal
    * @function molEquals
    * @param {JSDraw2.Mol} m1
    * @param {JSDraw2.Mol} m2
    */
    molEquals: function (m1, m2) {
        var mol1 = m1.mol != null ? m1.mol : (m1.mol = this.createMol(scil.helm.Monomers.getMolfile(m1)));
        var mol2 = m2.mol != null ? m2.mol : (m2.mol = this.createMol(scil.helm.Monomers.getMolfile(m2)));
        return mol2.fullstructureMatch(mol1);
    },

    /**
    * count atoms and bonds to calculate MF and MW
    * @function molStats
    * @param {string} molfile
    */
    molStats: function (molfile) {
        var mol = this.createMol(molfile);
        mol.calcHCount();
        return JSDraw2.FormulaParser.getAtomStats(mol).elements;
    },

    /**
    * Get element mass
    * @function getElementMass
    * @param {string} e - element name
    */
    getElementMass: function (e) {
        return JSDraw2.PT[e].m;
    },

    /**
    * Get the current object
    * @function getCurrentAtom
    * @param {JSDraw2.Editor} jsd - JSDraw Editor
    */
    getCurrentAtom: function (jsd) {
        return JSDraw2.Atom.cast(jsd.curObject)
    },

    /**
    * Scale the canvas
    * @function scaleCanvas
    * @param {JSDraw2.Editor} jsd - JSDraw Editor
    */
    scaleCanvas: function (jsd) {
        var scale = JSDraw2.Editor.BONDLENGTH / jsd.bondlength;
        if (JSDraw2.Editor.BONDLENGTH / jsd.bondlength > 1)
            jsd.scale(JSDraw2.Editor.BONDLENGTH / jsd.bondlength);
    },

    /**
    * called by the canvas to draw a monomer
    * @function drawMonomer
    * @param {SVG} surface
    * @param {JSDraw2.Atom} a - monomer object
    * @param {JSDraw2.Point} p - coordinate
    * @param {number} fontsize
    * @param {number} linewidth
    * @param {string} color
    */
    drawMonomer: function (surface, a, p, fontsize, linewidth, color) {
        color = null;
        var biotype = a.biotype();
        var c = scil.Utils.isNullOrEmpty(color) ? org.helm.webeditor.Monomers.getColor(a) : color;
        var w = fontsize * org.helm.webeditor.atomscale;
        var lw = linewidth / 2;//(c.nature ? 1 : 2);
        if (biotype == org.helm.webeditor.HELM.LINKER)
            JSDraw2.Drawer.drawEllipse(surface, org.helm.webeditor.Interface.createRect(p.x - w / 2, p.y - w / 2, w, w), c.linecolor, lw).setFill(c.backgroundcolor);
        else if (biotype == org.helm.webeditor.HELM.SUGAR)
            JSDraw2.Drawer.drawRect(surface, org.helm.webeditor.Interface.createRect(p.x - w / 2, p.y - w / 2, w, w), c.linecolor, lw, linewidth * 3).setFill(c.backgroundcolor);
        else if (biotype == org.helm.webeditor.HELM.BASE)
            JSDraw2.Drawer.drawDiamond(surface, org.helm.webeditor.Interface.createRect(p.x - w / 2, p.y - w / 2, w, w), c.linecolor, lw).setFill(c.backgroundcolor);
        else if (biotype == org.helm.webeditor.HELM.AA)
            JSDraw2.Drawer.drawHexgon(surface, org.helm.webeditor.Interface.createRect(p.x - w / 2, p.y - w / 2, w, w), c.linecolor, lw, linewidth * 3).setFill(c.backgroundcolor);
        else if (biotype == org.helm.webeditor.HELM.CHEM)
            JSDraw2.Drawer.drawRect(surface, org.helm.webeditor.Interface.createRect(p.x - w / 2, p.y - w / 2, w, w), c.linecolor, lw).setFill(c.backgroundcolor);
        p.offset(0, -1);
        JSDraw2.Drawer.drawLabel(surface, p, a.elem, c.textcolor, fontsize * (a.elem.length > 1 ? 2 / a.elem.length : 1.0), null, null, null, false);

        if (a.bio.id > 0) {
            var p1 = p.clone();
            p1.offset(-fontsize * 1.2, -fontsize * 1.2);
            JSDraw2.Drawer.drawLabel(surface, p1, a.bio.id, "#00FF00", fontsize, null, null, null, false);
        }
        if (!scil.Utils.isNullOrEmpty(a.bio.annotation)) {
            var p1 = p.clone();
            var s = a.bio.annotation;
            if (a.bio.annotationshowright) {
                var c = a.biotype() == org.helm.webeditor.HELM.AA ? 0.7 : 1;
                p1.offset(fontsize * c, -fontsize * 1.5);
                JSDraw2.Drawer.drawLabel(surface, p1, s, "#FFA500", fontsize, null, "start", null, false);
            }
            else {
                var c = a.biotype() == org.helm.webeditor.HELM.AA ? 1.5 : 1;
                p1.offset(-fontsize * c, -fontsize * 1.5);
                JSDraw2.Drawer.drawLabel(surface, p1, s, "#FFA500", fontsize, null, "end", null, false);
            }
        }
    },

    addToolbar: function (buttons, flat, sub, options) {
        var sub = [
                { c: "helm_base", t: "Base", label: "Base" },
                { c: "helm_sugar", t: "Sugar", label: "Sugar" },
                { c: "helm_linker", t: "Linker", label: "Linker" },
                { c: "helm_aa", t: "Peptide", label: "Peptide" },
                { c: "helm_chem", t: "Chemistry", label: "Chemistry" }
        ];

        var main = { c: "helm_nucleotide", t: "Nucleotide", label: "Nucleotide", sub: sub, hidden: true };
        buttons.push(main);

        buttons.push({ c: "new", t: "New", label: "New" });
        buttons.push({ c: "open", t: "Load", label: "Load" });
        buttons.push({ c: "save", t: "Save", label: "Save" });
        buttons.push({ c: "|" });
    },

    /**
    * called when the canvas is creating toolbar
    * @function getHelmToolbar
    * @param {array} buttons
    * @param {array} filesubmenus
    * @param {array} selecttools
    * @param {dict} options
    */
    getHelmToolbar: function (buttons, filesubmenus, selecttools, options) {
        this.addToolbar(buttons, true, null, options);

        buttons.push({ c: "undo", t: "Undo", label: "Undo" });
        buttons.push({ c: "redo", t: "Redo", label: "Redo" });
        buttons.push({ c: "|" });
        buttons.push({ c: "eraser", t: "Eraser", label: "Eraser" });
        buttons.push({ c: "|" });
        buttons.push({ c: "select", t: "Box Selection", label: "Select", sub: selecttools });
        buttons.push({ c: "|" });
        buttons.push({ c: "helm_find", t: "Find/Replace", label: "Find/Replace" });
        buttons.push({ c: "helm_layout", t: "Layout", label: "Layout" });
        buttons.push({ c: "|" });
        buttons.push({ c: "zoomin", t: "Zoom in", label: "Zoom" });
        buttons.push({ c: "zoomout", t: "Zoom out", label: "Zoom" });
        buttons.push({ c: "|" });
        buttons.push({ c: "center", t: "Move to center", label: "Center" });
        buttons.push({ c: "moveview", t: "Move/View", label: "Move" });
    },

    /**
    * called when the canvas is trying to display context menu
    * @function onContextMenu
    * @param {JSDraw2.Editor} ed - JSDraw Editor
    * @param {Event} e - Javascript event
    * @param {bool} viewonly - indicate if this is viewonly mode
    */
    onContextMenu: function (ed, e, viewonly) {
        var items = [];

        if (ed.options.helmtoolbar) {
            var a = JSDraw2.Atom.cast(ed.curObject);
            if (a != null && a.biotype() == scil.helm.HELM.SUGAR && a.bio.annotation != null) {
                items.push({ caption: "Set as Sense", key: "helm_set_sense" });
                items.push({ caption: "Set as Antisense", key: "helm_set_antisense" });
                items.push({ caption: "Clear Annotation", key: "helm_set_clear" });
                items.push("-");
                items.push({ caption: "Create Complementary Strand", key: "helm_complementary_strand" });
            }
        }
        else {
            items.push({ caption: "Copy Molfile V2000", key: "copymolfile2000" });
            items.push({ caption: "Copy Molfile V3000", key: "copymolfile3000" });
            //items.push({ caption: "Paste Mol File", key: "pastemolfile" });
            items.push({ caption: "Copy SMILES", key: "copysmiles" });
        }

        if (items.length > 0)
            items.push("-");
        items.push({ caption: "About HELM Web Editor", key: "about" });

        return items;
    }
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* MonomerColors class
* @class org.helm.webeditor.MonomerColors
*/
org.helm.webeditor.MonomerColors = {
    bases: {
        A: "#A0A0FF",
        G: "#FF7070",
        T: "#A0FFA0",
        C: "#FF8C4B",
        U: "#FF8080"
    },

    linkers: {
        P: "#9aa5e1",
        p: "#9aa5e1"
    },

    sugars: {
        R: "#7a85c1",
        r: "#7a85c1"
    },

    aas: {
        A: "#C8C8C8",
        R: "#145AFF",
        N: "#00DCDC",
        D: "#E60A0A",
        C: "#E6E600",
        E: "#00DCDC",
        Q: "#E60A0A",
        G: "#EBEBEB",
        H: "#8282D2",
        I: "#0F820F",
        L: "#0F820F",
        K: "#145AFF",
        M: "#E6E600",
        F: "#3232AA",
        P: "#DC9682",
        S: "#FA9600",
        T: "#FA9600",
        W: "#B45AB4",
        Y: "#3232AA",
        V: "#0F820F"
    },

    chems: {
        R: "#eeeeee",
    }
};
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////


/**
* Monomers class
* @class org.helm.webeditor.Monomers
*/
org.helm.webeditor.Monomers = {
    defaultmonomers: { HELM_BASE: null, HELM_SUGAR: null, HELM_LINKER: null, HELM_AA: null, HELM_CHEM: null },

    clear: function () {
        this.sugars = {};
        this.linkers = {};
        this.bases = {};
        this.aas = {};
        this.chems = {};
    },

    getDefaultMonomer: function (monomertype) {
        var r = this.defaultmonomers[monomertype];
        if (r != null)
            return r;

        if (monomertype == org.helm.webeditor.HELM.BASE)
            return this._getFirstKey(org.helm.webeditor.Monomers.bases, "a", "A");
        else if (monomertype == org.helm.webeditor.HELM.SUGAR)
            return this._getFirstKey(org.helm.webeditor.Monomers.sugars, "r", "R");
        else if (monomertype == org.helm.webeditor.HELM.LINKER)
            return this._getFirstKey(org.helm.webeditor.Monomers.linkers, "p", "P");
        else if (monomertype == org.helm.webeditor.HELM.AA)
            return this._getFirstKey(org.helm.webeditor.Monomers.aas, "A");
        else if (monomertype == org.helm.webeditor.HELM.CHEM)
            return this._getFirstKey(org.helm.webeditor.Monomers.chems, "R");
        return "?";
    },

    _getFirstKey: function(set, key1, key2) {
        if (key1 != null && set[key1] != null)
            return key1;
        if (key2 != null && set[key2] != null)
            return key2;

        for (var k in set)
            return k;
        return "?";
    },

    saveTextDB: function(url) {
        var cols = ["id", "symbol", "name", "naturalanalog", "molfile", "smiles", "polymertype", "monomertype", "r1", "r2", "r3", "r4", "r5", "author", "createddate"];
        var s = "";
        var n = { n: 0 };
        s += this.saveMonomersAsText(this.aas, "PEPTIDE", "Undefined", cols, n);
        s += this.saveMonomersAsText(this.sugars, "RNA", "Backbone", cols, n);
        s += this.saveMonomersAsText(this.linkers, "RNA", "Backbone", cols, n);
        s += this.saveMonomersAsText(this.bases, "RNA", "Branch", cols, n);
        s += this.saveMonomersAsText(this.chems, "CHEM", "Undefined", cols, n);

        s = n.n + "\n" + s;
        if (url == null)
            return s;

        var args = { client: "jsdraw", wrapper: "none", filename: "monomers.txt", directsave: 1, contents: s };
        scil.Utils.post(url, args, "_blank");
    },

    saveMonomerDB: function(url) {
        var s = "<MONOMER_DB>\n";
        s += "<PolymerList>\n";

        s += "<Polymer polymerType='PEPTIDE'>\n";
        s += this.saveMonomers(this.aas, "PEPTIDE", "Undefined");
        s += "</Polymer>\n";

        s += "<Polymer polymerType='RNA'>\n";
        s += this.saveMonomers(this.sugars, "RNA", "Backbone");
        s += this.saveMonomers(this.linkers, "RNA", "Backbone");
        s += this.saveMonomers(this.bases, "RNA", "Branch");
        s += "</Polymer>\n";

        s += "<Polymer polymerType='CHEM'>\n";
        s += this.saveMonomers(this.chems, "CHEM", "Undefined");
        s += "</Polymer>\n";

        s += "</PolymerList>\n";
        s += "</MONOMER_DB>";

        if (url == null)
            return s;

        var args = { client: "jsdraw", wrapper: "none", filename: "HELMMonomerDB.xml", directsave: 1, contents: s };
        scil.Utils.post(url, args, "_blank");
    },

    saveMonomersAsText: function (set, type, mt, cols, n) {
        var ret = "";
        for (var id in set) {
            var s = this.writeOneAsText({ id: ++n.n, symbol: id, monomertype: mt, polymertype: type, name: set[id].n, naturalanalog: set[id].na, m: set[id] }, cols);
            ret += JSDraw2.Base64.encode(s) + "\n";
        }

        return ret;
    },

    saveMonomers: function (set, type, mt) {
        var s = "";
        for (var id in set)
            s += this.writeOne({ id: id, mt: mt, type: type, m: set[id] });
        return s;
    },

    loadFromUrl: function (url, callback) {
        var fn = function (xml) {
            org.helm.webeditor.monomers.loadFromXml(xml);
            if (callback != null)
                callback();
        };
        scil.Utils.download(url, fn);
    },

    loadFromXml: function (s) {
        var doc = scil.Utils.parseXml(s);
        if (doc == null)
            return false;
        this.loadMonomers(doc);
    },

    loadDB: function (list) {
        this.clear();

        for (var i = 0; i < list.length; ++i) {
            var x = list[i];
            var m = { id: x.symbol, n: x.name, na: x.naturalanalog, type: x.polymertype, mt: x.monomertype, m: x.molfile };

            m.at = {};
            var rs = 0;
            for (var r = 1; r <= 5; ++r) {
                if (x["r" + r]) {
                    m.at["R" + r] = x["r" + r];
                    ++rs;
                }
            }
            m.rs = rs;

            this.addOneMonomer(m);
        }
    },

    loadMonomers: function(doc, callback) {
        var list = doc.getElementsByTagName("Monomer");
        if (list == null || list.length == 0)
            return false;

        if (callback == null) {
            for (var i = 0; i < list.length; ++i) {
                var m = this.readOne(list[i]);
                if (m != null)
                    this.addOneMonomer(m);
            }
            return true;
        }

        var newmonomers = [];
        var overlapped = [];
        for (var i = 0; i < list.length; ++i) {
            var m = this.readOne(list[i]);
            var old = this.getMonomer(this.helm2Type(m), m.id);
            if (old == null)
                newmonomers.push(m);
            else {
                if (!org.helm.webeditor.Interface.molEquals(old, m))
                    overlapped.push(m);
            }
        }

        var me = this;
        this.renameNextMonomer(newmonomers, overlapped, function () {
            var renamed = [];
            for (var i = 0; i < newmonomers.length; ++i) {
                var m = newmonomers[i];
                me.addOneMonomer(m);
                if (m.oldname != null)
                    renamed.push(m);
            }
            callback(renamed);
        });
    },

    renameNextMonomer: function (newmonomers, overlapped, callback) {
        if (overlapped.length == 0) {
            callback();
            return;
        }

        var me = this;
        var m = overlapped[0];

        scil.Utils.prompt2({
            caption: "Duplicate Monomer",
            message: "Monomer name, " + m.id + ", is used. Please enter a new name for it:",
            callback: function (s) {
                if (me.getMonomer(m.type, s) == null) {
                    m.oldname = m.id;
                    m.id = s;
                    newmonomers.push(m);
                    overlapped.splice(0, 1);
                }
                me.renameNextMonomer(newmonomers, overlapped, callback);
            }
        });
    },

    getMonomerSet: function (a) {
        if (a == null)
            return null;
        if (a.T == "ATOM")
            a = a.biotype();
        if (a == org.helm.webeditor.HELM.BASE)
            return org.helm.webeditor.monomers.bases;
        else if (a == org.helm.webeditor.HELM.SUGAR)
            return org.helm.webeditor.monomers.sugars;
        else if (a == org.helm.webeditor.HELM.LINKER)
            return org.helm.webeditor.monomers.linkers;
        else if (a == org.helm.webeditor.HELM.AA)
            return org.helm.webeditor.monomers.aas;
        else if (a == org.helm.webeditor.HELM.CHEM)
            return org.helm.webeditor.monomers.chems;
        return null;
    },

    getMonomerColors: function (a) {
        if (a == null)
            return null;
        if (a.T == "ATOM")
            a = a.biotype();
        if (a == org.helm.webeditor.HELM.BASE)
            return org.helm.webeditor.MonomerColors.bases;
        else if (a == org.helm.webeditor.HELM.SUGAR)
            return org.helm.webeditor.MonomerColors.sugars;
        else if (a == org.helm.webeditor.HELM.LINKER)
            return org.helm.webeditor.MonomerColors.linkers;
        else if (a == org.helm.webeditor.HELM.AA)
            return org.helm.webeditor.MonomerColors.aas;
        else if (a == org.helm.webeditor.HELM.CHEM)
            return org.helm.webeditor.MonomerColors.chems;
        return null;
    },

    getMonomerList: function(a) {
        var set = this.getMonomerSet(a);
        return set == null ? null : scil.Utils.getDictKeys(set);
    },

    getMonomer: function (a, name) {
        if (a == null && name == null)
            return null;

        var set = this.getMonomerSet(a);
        var s = name == null ? a.elem : org.helm.webeditor.IO.trimBracket(name);
        return set == null ? null : set[s];
    },

    hasR: function(type, name, r) {
        var m = this.getMonomer(type, name);
        return m != null && m.at != null && m.at[r] != null;
    },

    getColor: function (a) {
        var m = this.getMonomer(a, a.elem);
        if (m == null)
            m = {};

        var mc = this.getMonomerColors(a);
        if (mc == null)
            mc = {};
        var color = mc[m.na];

        return {
            linecolor: m.linecolor == null ? "#000" : m.linecolor,
            backgroundcolor: m.backgroundcolor == null ? (color == null ? "#eee" : color) : m.backgroundcolor,
            textcolor: m.textcolor == null ? "#000" : m.textcolor,
            nature: m.nature
        };
    },

    getColor2: function (type, name) {
        var m = this.getMonomer(type, name);
        if (m == null)
            m = {};

        var mc = this.getMonomerColors(type);
        if (mc == null)
            mc = {};
        var color = mc[m.na];

        return {
            linecolor: m.linecolor == null ? "#000" : m.linecolor,
            backgroundcolor: m.backgroundcolor == null ? (color == null ? "#eee" : color) : m.backgroundcolor,
            textcolor: m.textcolor == null ? "#000" : m.textcolor,
            nature: m.nature
        };
    },

    getMolfile: function (m) {
        if (m != null && m.m == null && m.mz != null)
            m.m = org.helm.webeditor.IO.uncompressGz(m.mz);
        return m == null ? null : m.m;
    },

    helm2Type: function (m) {
        if (m.type == "PEPTIDE")
            return org.helm.webeditor.HELM.AA;
        else if (m.type == "CHEM")
            return org.helm.webeditor.HELM.CHEM;
        else if (m.type == "RNA") {
            if (m.mt == "Branch")
                return org.helm.webeditor.HELM.BASE;
            if (m.mt == "Backbone") {
                if (m.na == "P" || m.na == "p")
                    return org.helm.webeditor.HELM.LINKER;
                else
                    return org.helm.webeditor.HELM.SUGAR;
            }
        }
        return null;
    },

    addOneMonomer: function (m) {
        var set = this.getMonomerSet(this.helm2Type(m));
        if (set == null)
            return false;

        delete m.type;
        delete m.mt;

        set[m.id] = m;
        return true;
    },

    writeOneAsText: function (m, cols) {
        var molfile = m.m.mz;
        if (scil.Utils.isNullOrEmpty(molfile) && m.m.m != null)
            molfile = m.m.m;

        m.molfile = molfile;
        if (m.m.at != null) {
            for (var x in m.m.at)
                m[x.toLowerCase()] = m.m.at[x];
        }

        var s = "";
        for (var i = 0; i < cols.length; ++i) {
            if (i > 0)
                s += "|";
            var k = cols[i];
            s += m[k] == null ? "" : m[k];
        }
        return s;
    },

    writeOne: function (m) {
        var molfile = m.m.mz;
        if (scil.Utils.isNullOrEmpty(molfile) && m.m.m != null)
            molfile = org.helm.webeditor.IO.compressGz(m.m.m); // compress molfile

        var s = "<Monomer>\n";
        s += "<MonomerID>" + scil.Utils.escXmlValue(m.id) + "</MonomerID>\n";
        s += "<MonomerSmiles>" + scil.Utils.escXmlValue(m.smiles) + "</MonomerSmiles>\n";
        s += "<MonomerMolFile>" + scil.Utils.escXmlValue(molfile) + "</MonomerMolFile>\n";
        s += "<NaturalAnalog>" + scil.Utils.escXmlValue(m.m.na) + "</NaturalAnalog>\n";
        s += "<MonomerType>" + scil.Utils.escXmlValue(m.mt) + "</MonomerType>\n";
        s += "<PolymerType>" + scil.Utils.escXmlValue(m.type) + "</PolymerType>\n";
        if (m.m.at != null) {
            s += "<Attachments>\n";
            for (var r in m.m.at) {
                var cap = m.m.at[r];
                s += "<Attachment>\n";
                s += "<AttachmentID>" + r + "-" + cap + "</AttachmentID>\n";
                s += "<AttachmentLabel>" + r + "</AttachmentLabel>\n";
                s += "<CapGroupName>" + cap + "</CapGroupName>\n";
                s += "<CapGroupSmiles></CapGroupSmiles>\n";
                s += "</Attachment>\n";
            }
            s += "</Attachments>\n";
        }
        s += "</Monomer>\n";
        return s;
    },

    readOne: function (e) {
        var s = this.readValue(e, "MonomerMolFile");
        var m = null;
        var mz = null;
        if (s != null) {
            if (s.indexOf("M  END") > 0)
                m = s; // uncompressed molfile
            else
                mz = s; // compressed molfile
        }

        var m = {
            type: this.readValue(e, "PolymerType"),
            mt: this.readValue(e, "MonomerType"),
            id: this.readValue(e, "MonomerID"),
            n: this.readValue(e, "MonomerName"),
            na: this.readValue(e, "NaturalAnalog"),
            mz: mz,
            m: m,
            at: {}
        };

        var rs = 0;
        var list = e.getElementsByTagName("Attachment");
        if (list != null) {
            for (var i = 0; i < list.length; ++i) {
                var a = list[i];
                var r = this.readValue(a, "AttachmentLabel");
                var cap = this.readValue(a, "CapGroupName");
                if (m.at[r] == null)
                    ++rs;
                m.at[r] = cap;
            }
        }

        m.rs = rs;
        return m;
    },

    readValue: function(e, name) {
        var list = e.getElementsByTagName(name);
        if (list == null || list.length == 0)
            return null;
        return scil.Utils.getInnerText(list[0]);
    }
};

org.helm.webeditor.monomers = org.helm.webeditor.Monomers;


org.helm.webeditor.Monomers.sugars = {
    'mph': { n: 'morpholino', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 11 11  0  0  0  0            999 V2000\n    2.8579    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3163    2.4751    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0626    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.4751    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  1  6  1  0  0  0  0\n  2  7  1  1  0  0  0\n  6  8  1  1  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  4 11  1  0  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    'MOE': { n: '2\'-O-Methoxyethyl ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 16 16  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3772    0.1429    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.0916    0.5554    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8061    0.1429    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5206    0.5554    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  7 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'LR': { n: '2,\'4\'-locked-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 13 14  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2315    1.3786    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2406    0.7893    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  6 11  1  0  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  2 12  1  6  0  0  0\n 12 13  1  0  0  0  0\n  5 13  1  6  0  0  0\n  4  6  1  6  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    'SGNA': { n: 'S Propanetriol (GNA sugar)', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    1.4106    1.2465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2061    1.6958    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2061    2.5208    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4000    0.4216    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1092    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7007    1.6669    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7099    2.4919    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.9123    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  6  0  0  0\n  2  3  1  0  0  0  0\n  1  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\nA    3\nR3\nA    5\nR2\nA    8\nR1\nM  END\n' },
    'tR': { n: 'Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    0.7138    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2146    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2165    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2158    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2177    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4277    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9171    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9322    0.1429    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  1  0  0  0\n  5  7  1  6  0  0  0\n  6  9  1  0  0  0  0\n  7 10  1  0  0  0  0\nA    8\nR3\nA    9\nR1\nA   10\nR2\nM  END\n' },
    'dR': { n: 'Deoxy-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 11 11  0  0  0  0            999 V2000\n    2.1588    2.5889    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1754    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1774    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3789    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3803    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5539    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5380    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  6 11  1  0  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    'lLR': { n: '2,\'4\'-locked-Ribose (alpha-L-LNA)', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 13 14  0  0  0  0            999 V2000\n    2.1648    1.9249    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4510    1.5114    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8799    1.5134    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6656    0.7149    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6675    0.7163    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9025    1.4515    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3025    2.3658    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8787    2.5446    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4860    0.2493    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2375    0.7145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5512    1.4326    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4125    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  6  9  1  0  0  0  0\n  2 10  1  0  0  0  0\n  5 11  1  1  0  0  0\n  4  6  1  1  0  0  0\n 10 12  1  0  0  0  0\n  7 11  1  0  0  0  0\n 12 13  1  0  0  0  0\nA    8\nR3\nA    9\nR2\nA   13\nR1\nM  END\n' },
    'FMOE': { n: '2\'-O-Tris-trifluoromethoxyethyl ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 28 28  0  0  0  0            999 V2000\n    2.1588    3.6555    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    3.2420    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    3.2440    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    2.4455    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    2.4469    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    1.6205    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    1.6219    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    4.0964    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    4.2752    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    4.4500    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    4.6046    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    1.0665    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3772    1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.0916    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8061    1.2094    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5206    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5206    2.4469    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.3456    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7341    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.7237    2.2334    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    5.3071    3.2438    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    6.1039    3.0303    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    6.5591    2.4188    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1706    1.6219    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    6.7581    0.9074    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0196    0.4125    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4486    0.4125    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7341    0.0000    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  7 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  1  0  0  0  0\n 16 18  1  0  0  0  0\n 16 19  1  0  0  0  0\n 17 20  1  0  0  0  0\n 17 21  1  0  0  0  0\n 17 22  1  0  0  0  0\n 18 23  1  0  0  0  0\n 18 24  1  0  0  0  0\n 18 25  1  0  0  0  0\n 19 26  1  0  0  0  0\n 19 27  1  0  0  0  0\n 19 28  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'UNA': { n: '2\'-3\'-Unlocked-ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 11  0  0  0  0            999 V2000\n    2.5201    2.0594    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4971    1.6574    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5702    1.6841    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0222    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9621    1.2055    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4971    2.4824    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5702    2.5091    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8558    2.9216    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.7376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0222    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9621    0.3805    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3077    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  3  4  1  1  0  0  0\n  2  5  1  1  0  0  0\n  2  6  1  0  0  0  0\n  3  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  4 10  1  0  0  0  0\n  5 11  1  0  0  0  0\n 10 12  1  0  0  0  0\nA    6\nR3\nA    9\nR1\nA   12\nR2\nM  END\n' },
    '25R': { n: '2,5-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.6170    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.2035    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.2055    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.4070    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5820    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5834    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0579    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2367    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.4115    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5661    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.2461    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  7 12  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'mR': { n: '2\'-O-Methyl-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 13 13  0  0  0  0            999 V2000\n    2.1588    2.5889    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1754    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1774    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3789    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3803    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5539    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5553    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5380    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4596    0.3418    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  7 13  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'aR': { n: '3-Amino-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    '4sR': { n: '4-Thio-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'FR': { n: 'FANA', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3509    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4493    2.0522    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  6 11  1  0  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  5 12  1  1  0  0  0\n  1  3  1  0  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    'R': { n: 'Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'hx': { n: 'hexitol', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.8579    2.4469    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0344    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.7968    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.2094    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    2.0344    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.4469    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0344    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.4469    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.7969    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    0.7969    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2154    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  1  6  1  0  0  0  0\n  2  7  1  1  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  3 10  1  6  0  0  0\n  5 11  1  1  0  0  0\n 10 12  1  0  0  0  0\nA    9\nR1\nA   11\nR3\nA   12\nR2\nM  END\n' },
    'eR': { n: '2\'-O,4\'-ethylene bridged Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 14 15  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0740    0.6659    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0325    1.4610    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1300    0.7244    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  1  0  0  0\n  4  5  1  0  0  0  0\n  6 11  1  0  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5 12  1  6  0  0  0\n  2 13  1  6  0  0  0\n 13 14  1  0  0  0  0\n 14 12  1  0  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    'aFR': { n: 'alpha-FANA', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.0869    2.5027    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3969    2.1030    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7781    2.1049    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6043    1.3330    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5728    1.3058    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6055    0.5355    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2533    2.9289    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7770    3.1017    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7975    3.2707    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.4201    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2834    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3677    1.9838    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  8  1  6  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  6 11  1  0  0  0  0\n  7  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  5 12  1  1  0  0  0\n  1  3  1  0  0  0  0\nA    8\nR3\nA   10\nR1\nA   11\nR2\nM  END\n' },
    '5A6': { n: '6-amino-hexanol (5\' end)', na: 'R', rs: 3, at: { R1: 'H', R2: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    5.0119    0.4351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2846    0.0457    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5837    0.4808    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8564    0.0914    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1555    0.5265    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4282    0.1370    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7272    0.5721    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1827    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7128    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4401    0.3895    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7536    1.3967    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  7 11  1  0  0  0  0\nA    8\nR1\nA   10\nR2\nA   11\nR3\nM  END\n' },
    'PONA': { n: '2-(methylamino)ethanol (PHONA sugar)', na: 'R', rs: 3, at: { R1: 'H', R2: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    1.4106    1.2465    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4000    0.4216    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1092    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7007    1.6669    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7099    2.4919    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.9123    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.7373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1251    1.6590    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  1  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  1  8  1  0  0  0  0\nA    3\nR2\nA    7\nR1\nA    8\nR3\nM  END\n' },
    'RGNA': { n: 'R Propanetriol (GNA sugar)', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    1.4106    1.2465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2061    1.6958    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2061    2.5208    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4000    0.4216    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1092    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7007    1.6669    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7099    2.4919    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.9123    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  1  0  0  0\n  2  3  1  0  0  0  0\n  1  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\nA    3\nR3\nA    5\nR2\nA    8\nR1\nM  END\n' },
    '3A6': { n: '6-amino-hexanol (3\' end)', na: 'R', rs: 3, at: { R1: 'H', R2: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    1.4289    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7157    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4302    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2375    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7157    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  7 11  1  0  0  0  0\nA    8\nR2\nA   10\nR1\nA   11\nR3\nM  END\n' },
    'qR': { n: '2-O-beta-hydroxy-ethoxy-methyl Ribose (Qiagen)', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 17 17  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3772    0.1429    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.0916    0.5554    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8061    0.1429    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5206    0.5554    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.2351    0.1429    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  7 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    'fR': { n: '2\'-Flu0ro-Ribose', na: 'R', rs: 3, at: { R3: 'OH', R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    2.1588    2.5890    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3790    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3804    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5540    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6627    0.5554    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8727    3.2087    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5381    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  8  1  1  0  0  0\n  3  5  1  0  0  0  0\n  3  9  1  1  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  5  7  1  6  0  0  0\n  6 12  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\nA    9\nR3\nA   11\nR1\nA   12\nR2\nM  END\n' },
    '3SS6': { n: '3\'-Thiol-Modifier 6 S-S from Glen Research', na: 'R', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 18 17  0  0  0  0            999 V2000\n    1.4290    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7158    0.0000    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4303    0.4125    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1447    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8592    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5737    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.2882    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   10.0026    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   10.7171    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   11.4316    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n   12.1460    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n  3 17  1  0  0  0  0\n 16 18  1  0  0  0  0\nA   17\nR1\nA   18\nR2\nM  END\n' },
    '12ddR': { n: '1\',2\'-Di-Deoxy-Ribose', na: 'R', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    2.1588    2.5889    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4450    2.1754    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8739    2.1774    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6596    1.3789    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6615    1.3803    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6608    0.5539    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2965    3.0299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    3.3835    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.5380    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3621    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  2  7  1  1  0  0  0\n  3  5  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  6  0  0  0\n  6 10  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\nA    9\nR1\nA   10\nR2\nM  END\n' },
    '3FAM': { n: '3-FAM', na: 'R', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 38 42  0  0  0  0            999 V2000\n    0.0000    1.3200    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8545    1.3200    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2670    2.0344    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9814    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9814    0.7969    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6959    2.0344    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7679    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4104    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1249    2.0344    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8393    1.6219    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5538    2.0344    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5538    2.8594    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.2683    3.2719    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8393    3.2719    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.9827    4.5095    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.2683    4.0969    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.9827    2.8594    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.6972    3.2719    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.6972    4.0969    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.9747    5.4026    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1543    5.3164    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.3103    4.6489    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.1072    4.4354    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1502    6.9664    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4368    6.5522    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4388    5.7271    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8677    5.7306    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8657    6.5557    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5792    6.9699    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5832    5.3199    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.2966    5.7341    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.2946    6.5591    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7213    6.9629    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0078    6.5487    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0099    5.7237    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7253    5.3129    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   10.0091    6.9716    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2934    6.9612    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  6  1  0  0  0  0\n  5  7  1  0  0  0  0\n  6  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 12 14  2  0  0  0  0\n 16 13  2  0  0  0  0\n 13 17  1  0  0  0  0\n 15 16  1  0  0  0  0\n 17 18  2  0  0  0  0\n 18 19  1  0  0  0  0\n 19 22  1  0  0  0  0\n 15 19  2  0  0  0  0\n 21 15  1  0  0  0  0\n 20 21  1  0  0  0  0\n 20 22  1  0  0  0  0\n 22 23  2  0  0  0  0\n 26 21  1  0  0  0  0\n 21 27  1  0  0  0  0\n 24 25  1  0  0  0  0\n 24 28  1  0  0  0  0\n 27 30  2  0  0  0  0\n 28 27  1  0  0  0  0\n 29 28  2  0  0  0  0\n 30 31  1  0  0  0  0\n 31 32  2  0  0  0  0\n 29 32  1  0  0  0  0\n 33 25  2  0  0  0  0\n 26 25  1  0  0  0  0\n 36 26  2  0  0  0  0\n 33 34  1  0  0  0  0\n 34 35  2  0  0  0  0\n 35 36  1  0  0  0  0\n 32 37  1  0  0  0  0\n 34 38  1  0  0  0  0\nA    1\nR1\nA    7\nR2\nM  END\n' },
    'am12': { n: '5\'-12-amino-dodecanol', na: 'R', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 16 15  0  0  0  0            999 V2000\n   10.0026    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    9.2881    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5737    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8592    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1447    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4303    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7158    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   10.7171    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\nA    9\nR1\nA   16\nR2\nM  END\n' },
    'am6': { n: '5\'-6-amino-hexanol', na: 'R', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    0.7145    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7158    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4302    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  2  1  1  0  0  0  0\nA    3\nR1\nA   10\nR2\nM  END\n' }
};

org.helm.webeditor.Monomers.linkers = {
    'naP': { n: 'Sodium Phosphate', na: 'P', rs: 2, at: { R1: 'OH', R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  6  4  0  0  0  0            999 V2000\n    0.8250    1.4732    0.0000 P   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.4732    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    2.2982    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6500    1.4732    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    0.6482    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n    0.8839    0.0000    0.0000 Na  0  3  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  5  1  0  0  0  0\nA    2\nR1\nA    4\nR2\nM  CHG  1   5  -1\nM  CHG  1   6   1\nM  END\n' },
    'sP': { n: 'Phosporothioate', na: 'P', rs: 2, at: { R1: 'OH', R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  5  4  0  0  0  0            999 V2000\n    0.8250    0.8250    0.0000 P   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    1.6500    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6500    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    0.0000    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  5  1  0  0  0  0\nA    2\nR1\nA    4\nR2\nM  END\n' },
    'P': { n: 'Phosphate', na: 'P', rs: 2, at: { R1: 'OH', R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  5  4  0  0  0  0            999 V2000\n    0.8250    0.8250    0.0000 P   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    1.6500    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6500    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  5  1  0  0  0  0\nA    2\nR1\nA    4\nR2\nM  END\n' },
    'bP': { n: 'Boranophosphate', na: 'P', rs: 2, at: { R1: 'OH', R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  5  4  0  0  0  0            999 V2000\n    0.8250    0.8250    0.0000 P   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    1.6500    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6500    0.8250    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    0.0000    0.0000 B   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  5  1  0  0  0  0\nA    2\nR1\nA    4\nR2\nM  END\n' },
    'nasP': { n: 'Sodium Phosporothioate', na: 'P', rs: 2, at: { R1: 'OH', R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  6  4  0  0  0  0            999 V2000\n    0.8250    1.3848    0.0000 P   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.3848    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    2.2098    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6500    1.3848    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8250    0.5598    0.0000 S   0  5  0  0  0  0  0  0  0  0  0  0\n    0.9428    0.0000    0.0000 Na  0  3  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  5  1  0  0  0  0\nA    2\nR1\nA    4\nR2\nM  CHG  1   5  -1\nM  CHG  1   6   1\nM  END\n' }
};

org.helm.webeditor.Monomers.bases = {
    'cpU': { n: '5-cyclopropyl-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 13  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9446    3.2246    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6829    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  1  0  0  0  0\n 12 11  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'dabA': { n: '7-deaza-8-aza-7-bromo-2-amino-Adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 14  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.2375    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1557    2.6459    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n  5 12  1  0  0  0  0\n  9 13  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    '5eU': { n: '5-ethynyl-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 11  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6829    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  3  0  0  0  0\nA    9\nR1\nM  END\n' },
    '5tpU': { n: '5-tris-propynyl-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 19 19  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6829    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1911    3.1836    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8964    4.0970    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1100    4.8939    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.7214    4.0970    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8244    5.3064    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.1339    3.3825    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.6494    5.3064    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.9308    3.5960    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  3  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 15  1  0  0  0  0\n 14 16  1  0  0  0  0\n 15 17  1  0  0  0  0\n 16 18  3  0  0  0  0\n 17 19  3  0  0  0  0\nA    9\nR1\nM  END\n' },
    'meA': { n: 'N-Methyl-Adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 13  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7365    4.0955    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n 10 12  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    'cdaC': { n: '5-cyclopropyl-4-dimethylamino-cytosine', na: 'C', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 14 15  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6829    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0714    3.2719    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  1  0  0  0  0\n 12 11  1  0  0  0  0\n  7 13  1  0  0  0  0\n  7 14  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'cpmA': { n: 'N-cyclopropylmethyl-adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 15 17  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    3.3000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9402    3.5135    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5558    2.5855    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n 10 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 15  1  0  0  0  0\n 15 14  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    '5fU': { n: '5-fluoro-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'tfU': { n: '5-trifluoromethyl-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 13  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    2.0626    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    3.3001    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    2.8876    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  1  0  0  0  0\n 10 13  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'baA': { n: 'N-benzyl-adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 18 20  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    4.5375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    6.1875    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    5.7750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    4.9500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    4.9500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    5.7750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n 10 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 16 13  2  0  0  0  0\n 13 17  1  0  0  0  0\n 14 15  2  0  0  0  0\n 15 16  1  0  0  0  0\n 17 18  2  0  0  0  0\n 14 18  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    'eaA': { n: 'N-ethyl-adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 14  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    4.5375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n 10 12  1  0  0  0  0\n 12 13  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    'In': { n: 'Inosine', na: 'X', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 12  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\nA   11\nR1\nM  END\n' },
    'G': { n: 'Guanine', na: 'G', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 13  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  5 11  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 12  1  0  0  0  0\n  8  9  2  0  0  0  0\nA   12\nR1\nM  END\n' },
    'A': { n: 'Adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 12  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\nA   11\nR1\nM  END\n' },
    'C': { n: 'Cytosine', na: 'C', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  9  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  6  1  0  0  0  0\n  5  8  2  0  0  0  0\nA    9\nR1\nM  END\n' },
    'daA': { n: 'N,N-dimethyl-Adenine', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 14  0  0  0  0            999 V2000\n    0.7145    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0001    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0001    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.7125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1 10  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  2  1  0  0  0  0\n  9  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  7  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  8  9  2  0  0  0  0\n 10 12  1  0  0  0  0\n 10 13  1  0  0  0  0\nA   11\nR1\nM  END\n' },
    'U': { n: 'Uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  9  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'dfB': { n: '2,4-Difluoro-Benzene', na: 'X', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  9  0  0  0  0            999 V2000\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    3.3000    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8250    0.0000 F   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  5  8  1  0  0  0  0\n  4  9  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'T': { n: 'Thymine', na: 'T', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    1.4173    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1347    2.0676    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1405    1.2426    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7115    1.2326    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7057    2.0576    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4116    3.3000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8151    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4347    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9316    2.2811    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'prpC': { n: '5-Propynyl-Cytosine', na: 'C', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7268    2.6459    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3101    3.2292    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8935    3.8126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  3  0  0  0  0\n 11 12  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    '5iU': { n: '5-iodo-uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 I   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'prpU': { n: '5-propynyl Uracil', na: 'U', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    1.4289    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.0626    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3001    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8251    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    2.8876    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    3.3001    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  2  0  0  0  0\n  1  6  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5  6  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  3  0  0  0  0\n 11 12  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'clA': { n: 'T-clamp OMe', na: 'A', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 20 23  0  0  0  0            999 V2000\n    1.9621    0.6913    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5118    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6675    1.4619    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7860    0.7333    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0007    1.5299    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3094    1.9802    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1815    2.7952    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4117    3.0920    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7698    2.5737    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8977    1.7586    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0893    3.1775    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7363    1.9034    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7806    2.7272    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5162    3.1007    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2075    2.6505    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.1632    1.8266    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.4276    1.4531    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5605    3.9246    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2961    4.2981    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.8704    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  1  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  6  3  2  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  2  0  0  0  0\n  8  9  1  0  0  0  0\n  9 10  2  0  0  0  0\n 10  3  1  0  0  0  0\n  7 11  1  0  0  0  0\n  5 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 11  1  0  0  0  0\n 13 14  2  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  2  0  0  0  0\n 16 17  1  0  0  0  0\n 17 12  2  0  0  0  0\n 14 18  1  0  0  0  0\n 18 19  1  0  0  0  0\n  9 20  1  0  0  0  0\nA    2\nR1\nM  END\n' },
    '5meC': { n: '5-methyl-cytidine', na: 'C', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10 10  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR1\nM  END\n' },
    'cpC': { n: '5-cyclopropyl-cytosine', na: 'C', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 13  0  0  0  0            999 V2000\n    1.4289    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.0625    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    3.3000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6829    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0714    3.2719    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  1  7  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  1  0  0  0  0\n 12 11  1  0  0  0  0\nA    9\nR1\nM  END\n' }
};

org.helm.webeditor.Monomers.aas = {
    'dA': { n: 'D-Alanine', na: 'A', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  7  6  0  0  0  0            999 V2000\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  6  0  0  0\n  4  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  5  2  0  0  0  0\n  3  6  1  0  0  0  0\n  4  7  1  0  0  0  0\nA    6\nR2\nA    7\nR1\nM  END\n' },
    'dC': { n: 'D-Cysteine', na: 'C', rs: 3, at: { R2: 'OH', R1: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.8578    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2374    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1432    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4748    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4287    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6500    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  7  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  4  9  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nA    9\nR3\nM  END\n' },
    'seC': { n: 'SelenoCysteine', na: 'C', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    2.1433    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.2373    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 Se  0  0  0  0  0  0  0  0  0  0  0  0\n    1.4287    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.4747    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8577    1.2372    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7142    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  7  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nM  END\n' },
    'meC': { n: 'N-Methyl-Cysteine', na: 'C', rs: 3, at: { R2: 'OH', R1: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.8578    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2374    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1432    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4748    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4287    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6500    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8577    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  7  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  4  9  1  0  0  0  0\n  5 10  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nA    9\nR3\nM  END\n' },
    'meA': { n: 'N-Methyl-Alanine', na: 'A', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  1  0  0  0\n  4  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  5  2  0  0  0  0\n  3  6  1  0  0  0  0\n  4  7  1  0  0  0  0\n  4  8  1  0  0  0  0\nA    6\nR2\nA    7\nR1\nM  END\n' },
    'meF': { n: 'N-Methyl-Phenylalanine', na: 'F', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 14 14  0  0  0  0            999 V2000\n    0.7145    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0001    1.2379    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.4129    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0003    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5727    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8  7  1  1  0  0  0\n  8  9  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  2  0  0  0  0\n 10 12  1  0  0  0  0\n  9 13  1  0  0  0  0\n  9 14  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'meG': { n: 'N-Methyl-Glycine', na: 'G', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  7  6  0  0  0  0            999 V2000\n    0.7146    1.2374    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4292    2.4747    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1436    1.2372    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  4  1  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  2  5  1  0  0  0  0\n  4  6  1  0  0  0  0\n  4  7  1  0  0  0  0\nA    5\nR2\nA    6\nR1\nM  END\n' },
    'meD': { n: 'N-Methyl-Aspartic acid', na: 'D', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    2.8580    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8581    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  6  1  0  0  0  0\n  4  5  2  0  0  0  0\n  8 10  1  0  0  0  0\n  8 11  1  0  0  0  0\nA    6\nR3\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meE': { n: 'N-Methyl-Glutamic acid', na: 'E', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 11  0  0  0  0            999 V2000\n    2.8579    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2379    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7147    2.4753    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5726    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  1  0  0  0  0\n  1  9  1  0  0  0  0\n  1  2  1  1  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  7  2  0  0  0  0\n  4  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5 10  1  0  0  0  0\n  9 11  1  0  0  0  0\n  9 12  1  0  0  0  0\nA    6\nR3\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'fmoc': { n: 'fmoc N-Terminal Protection Group', na: 'X', rs: 1, at: { R2: 'OH' }, m: '\nMolEngine04211615442D\n\n 18 20  0  0  0  0            999 V2000\n    0.6994    2.4558    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6470    1.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4137    1.3281    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9401    1.9634    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4986    2.6603    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7211    3.4547    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1442    4.0446    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3451    3.8401    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1225    3.0456    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.1205    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1198    0.3043    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8867    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5336    0.5118    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7564    2.5039    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5809    2.0410    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2201    2.4003    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2472    3.2248    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.9052    1.9407    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  1  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  2  0  0  0  0\n  1  9  1  0  0  0  0\n  2 10  1  0  0  0  0\n 10 11  2  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  2  0  0  0  0\n  3 13  1  0  0  0  0\n  4 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  2  0  0  0  0\n 16 18  1  0  0  0  0\nA   18\nR2\nM  END\n' },
    'dY': { n: 'D-Tyrosine', na: 'Y', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 14 14  0  0  0  0            999 V2000\n    4.2870    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2871    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0002    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0003    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0015    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 13  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  6  0  0  0\n  5  6  1  0  0  0  0\n 10  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  7  8  1  0  0  0  0\n  8 11  2  0  0  0  0\n 11  9  1  0  0  0  0\n  9 10  2  0  0  0  0\n 11 12  1  0  0  0  0\n  2 14  1  0  0  0  0\nA   13\nR2\nA   14\nR1\nM  END\n' },
    'dW': { n: 'D-Tryptophan', na: 'W', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 16 17  0  0  0  0            999 V2000\n    4.5615    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5615    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4180    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4042    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6378    1.5058    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1418    0.8465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3149    2.2649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4960    2.3649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.7057    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3229    0.9465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6154    0.1711    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2760    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 15  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  6  0  0  0\n  5  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  8  6  1  0  0  0  0\n 14  7  1  0  0  0  0\n  8  9  2  0  0  0  0\n  8 10  1  0  0  0  0\n  9 14  1  0  0  0  0\n 13  9  1  0  0  0  0\n 10 11  2  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  2  0  0  0  0\n  3 16  1  0  0  0  0\nA   15\nR2\nA   16\nR1\nM  END\n' },
    'dV': { n: 'D-Valine', na: 'V', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.1433    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  8  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  4  1  6  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  0  0  0  0\n  7  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'meS': { n: 'N-Methyl-Serine', na: 'S', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  7  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  3  8  1  0  0  0  0\n  3  9  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nM  END\n' },
    'dR': { n: 'D-Arginine', na: 'R', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 12  0  0  0  0            999 V2000\n    5.0012    1.3997    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2867    0.9871    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.9872    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2866    0.2135    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0012    2.2247    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.9872    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.2248    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.9872    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7157    0.9872    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4898    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 12  1  0  0  0  0\n  2  6  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 11  1  0  0  0  0\n  9 10  2  0  0  0  0\n  6 13  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'dS': { n: 'D-Serine', na: 'S', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  7  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  6  0  0  0\n  5  6  1  0  0  0  0\n  3  8  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nM  END\n' },
    'meR': { n: 'N-Methyl-Arginine', na: 'R', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 14 13  0  0  0  0            999 V2000\n    5.0012    1.6885    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2867    1.2759    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.6886    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2760    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.6886    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2866    0.5023    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0012    2.5135    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2760    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6886    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.5136    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2760    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7157    1.2760    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4898    0.2888    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.9411    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 12  1  0  0  0  0\n  2  6  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 11  1  0  0  0  0\n  9 10  2  0  0  0  0\n  6 13  1  0  0  0  0\n  6 14  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'meQ': { n: 'N-Methyl-Glutamine', na: 'Q', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 11  0  0  0  0            999 V2000\n    3.5723    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    2.4752    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9  6  1  0  0  0  0\n  9  8  2  0  0  0  0\n  7 11  1  0  0  0  0\n  7 12  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'dP': { n: 'D-Proline', na: 'P', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  9  0  0  0  0            999 V2000\n    0.4821    1.6599    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.9903    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4878    0.3251    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2713    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2677    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9822    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9822    2.6459    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6967    1.4084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8547    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  5  1  1  6  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  6  8  1  0  0  0  0\n  4  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'dQ': { n: 'D-Glutamine', na: 'Q', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    3.5723    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    2.4752    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9  6  1  0  0  0  0\n  9  8  2  0  0  0  0\n  7 11  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'dN': { n: 'D-Asparagine', na: 'N', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.8578    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.6459    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.8208    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.4084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  4  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6  7  2  0  0  0  0\n  5 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meW': { n: 'N-Methyl-Tryptophan', na: 'W', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 17 18  0  0  0  0            999 V2000\n    4.5615    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5615    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4180    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4042    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6378    1.5058    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1418    0.8465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3149    2.2649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4960    2.3649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.7057    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3229    0.9465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6154    0.1711    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2760    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5615    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 15  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  8  6  1  0  0  0  0\n 14  7  1  0  0  0  0\n  8  9  2  0  0  0  0\n  8 10  1  0  0  0  0\n  9 14  1  0  0  0  0\n 13  9  1  0  0  0  0\n 10 11  2  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  2  0  0  0  0\n  3 16  1  0  0  0  0\n  3 17  1  0  0  0  0\nA   15\nR2\nA   16\nR1\nM  END\n' },
    'meV': { n: 'N-Methyl-Valine', na: 'V', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.1433    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  8  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  4  1  1  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  0  0  0  0\n  7  9  1  0  0  0  0\n  7 10  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'dL': { n: 'D-Leucine', na: 'L', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  1  0  0  0  0\n  5  1  1  6  0  0  0\n  3  2  1  0  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  6  9  1  0  0  0  0\n  8 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meT': { n: 'N-Methyl-Threonine', na: 'T', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8577    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1432    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  4  1  1  1  0  0  0\n  1  8  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  6  1  0  0  0  0\n  6  5  1  0  0  0  0\n  6  7  1  1  0  0  0\n  2  9  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'dM': { n: 'D-Methionine', na: 'M', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    3.5724    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  9  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  6  0  0  0\n  5  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  8  7  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meK': { n: 'N-Methyl-Lysine', na: 'K', rs: 3, at: { R2: 'OH', R1: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 13 12  0  0  0  0            999 V2000\n    5.0015    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0015    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7159    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2377    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0014    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  9  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8 11  1  0  0  0  0\n  7 12  1  0  0  0  0\n  8 13  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nA   12\nR3\nM  END\n' },
    'dK': { n: 'D-Lysine', na: 'K', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    4.2870    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6502    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2870    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0014    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  9  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8 11  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'mA': { n: 'alpha amino iso-butyric acid', na: 'A', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6334    2.1214    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  4  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  5  2  0  0  0  0\n  3  6  1  0  0  0  0\n  4  7  1  0  0  0  0\n  8  2  1  0  0  0  0\nA    6\nR2\nA    7\nR1\nM  END\n' },
    'meI': { n: 'N-Methyl-Isoleucine', na: 'I', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    0.7145    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8581    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8577    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  1  0  0  0  0\n  1  2  1  0  0  0  0\n  3  7  1  0  0  0  0\n  3  6  1  0  0  0  0\n  3  4  1  1  0  0  0\n  4  5  2  0  0  0  0\n  4  9  1  0  0  0  0\n  7  8  1  6  0  0  0\n  6 10  1  0  0  0  0\n  6 11  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'dH': { n: 'D-Histidine', na: 'H', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    3.4242    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7097    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2807    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2571    0.4130    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5037    1.5149    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4656    0.1805    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7096    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4243    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1387    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n 10  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 11  1  0  0  0  0\n  2  9  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  6  4  2  0  0  0  0\n  7  4  1  0  0  0  0\n  7  5  2  0  0  0  0\n  5  8  1  0  0  0  0\n  8  6  1  0  0  0  0\n  9 12  1  0  0  0  0\nA   11\nR2\nA   12\nR1\nM  END\n' },
    'meH': { n: 'N-Methyl-Histidine', na: 'H', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 13  0  0  0  0            999 V2000\n    3.4242    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7097    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2807    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2571    0.4130    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5037    1.5149    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4656    0.1805    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7096    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4243    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1387    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4241    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n 10  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 11  1  0  0  0  0\n  2  9  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  6  4  2  0  0  0  0\n  7  4  1  0  0  0  0\n  7  5  2  0  0  0  0\n  5  8  1  0  0  0  0\n  8  6  1  0  0  0  0\n  9 12  1  0  0  0  0\n  9 13  1  0  0  0  0\nA   11\nR2\nA   12\nR1\nM  END\n' },
    'dF': { n: 'D-Phenylalanine', na: 'F', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 13  0  0  0  0            999 V2000\n    0.7145    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0001    1.2379    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.4129    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0003    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5727    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8  7  1  6  0  0  0\n  8  9  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  2  0  0  0  0\n 10 12  1  0  0  0  0\n  9 13  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'meN': { n: 'N-Methyl-Asparagine', na: 'N', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    2.8578    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.6459    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.8208    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.4084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9055    0.2677    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  4  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6  7  2  0  0  0  0\n  5 10  1  0  0  0  0\n  5 11  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'dD': { n: 'D-Aspartic acid', na: 'D', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.8580    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8581    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  6  0  0  0\n  3  4  1  0  0  0  0\n  4  6  1  0  0  0  0\n  4  5  2  0  0  0  0\n  8 10  1  0  0  0  0\nA    6\nR3\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meM': { n: 'N-Methyl-Methionine', na: 'M', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    3.5724    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  9  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  8  7  1  0  0  0  0\n  2 10  1  0  0  0  0\n  2 11  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'dE': { n: 'D-Glutamic acid', na: 'E', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    2.8579    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2379    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7147    2.4753    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5726    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  1  0  0  0  0\n  1  9  1  0  0  0  0\n  1  2  1  6  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  7  2  0  0  0  0\n  4  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5 10  1  0  0  0  0\n  9 11  1  0  0  0  0\nA    6\nR3\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'meL': { n: 'N-Methyl-Leucine', na: 'L', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  1  0  0  0  0\n  5  1  1  1  0  0  0\n  3  2  1  0  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  6  9  1  0  0  0  0\n  8 10  1  0  0  0  0\n  8 11  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'D': { n: 'Aspartic acid', na: 'D', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.8580    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8581    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  6  1  0  0  0  0\n  4  5  2  0  0  0  0\n  8 10  1  0  0  0  0\nA    6\nR3\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'E': { n: 'Glutamic acid', na: 'E', rs: 3, at: { R2: 'OH', R3: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    2.8579    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2379    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7147    2.4753    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5726    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  1  0  0  0  0\n  1  9  1  0  0  0  0\n  1  2  1  1  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  7  2  0  0  0  0\n  4  6  1  0  0  0  0\n  5  8  2  0  0  0  0\n  5 10  1  0  0  0  0\n  9 11  1  0  0  0  0\nA    6\nR3\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'F': { n: 'Phenylalanine', na: 'F', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 13  0  0  0  0            999 V2000\n    0.7145    1.6503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0001    1.2379    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.4129    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0003    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5727    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  6  2  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  2  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8  7  1  1  0  0  0\n  8  9  1  0  0  0  0\n  8 10  1  0  0  0  0\n 10 11  2  0  0  0  0\n 10 12  1  0  0  0  0\n  9 13  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'G': { n: 'Glycine', na: 'G', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  6  5  0  0  0  0            999 V2000\n    0.7146    1.2374    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4292    2.4747    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1436    1.2372    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  4  1  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  2  5  1  0  0  0  0\n  4  6  1  0  0  0  0\nA    5\nR2\nA    6\nR1\nM  END\n' },
    'A': { n: 'Alanine', na: 'A', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  7  6  0  0  0  0            999 V2000\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  1  0  0  0\n  4  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  5  2  0  0  0  0\n  3  6  1  0  0  0  0\n  4  7  1  0  0  0  0\nA    6\nR2\nA    7\nR1\nM  END\n' },
    'C': { n: 'Cysteine', na: 'C', rs: 3, at: { R2: 'OH', R1: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.8578    1.6498    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2374    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.2375    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1432    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    2.4748    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4287    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6500    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  7  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  4  9  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nA    9\nR3\nM  END\n' },
    'L': { n: 'Leucine', na: 'L', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    1.4289    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  1  0  0  0  0\n  5  1  1  1  0  0  0\n  3  2  1  0  0  0  0\n  3  4  1  0  0  0  0\n  5  8  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  6  9  1  0  0  0  0\n  8 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'pnT': { n: 'PNA Thymine', na: 'X', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 21 21  0  0  0  0            999 V2000\n    0.0000    4.7084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    5.1209    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    4.7084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    5.1209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    4.7084    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    5.1209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    4.7084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    5.1209    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    3.8834    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    3.8834    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    3.3001    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6201    3.5677    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    2.4751    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5601    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5601    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9890    1.2375    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9890    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7035    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8456    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7  9  2  0  0  0  0\n  5 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  2  0  0  0  0\n 11 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 18  1  0  0  0  0\n 14 15  2  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  1  0  0  0  0\n 17 18  1  0  0  0  0\n 16 19  2  0  0  0  0\n 18 20  2  0  0  0  0\n 15 21  1  0  0  0  0\nA    1\nR1\nA    8\nR2\nM  END\n' },
    'M': { n: 'Methionine', na: 'M', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    3.5724    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  9  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  8  7  1  0  0  0  0\n  2 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'N': { n: 'Asparagine', na: 'N', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.8578    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    2.6459    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.8208    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    1.4084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  4  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2  5  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  6  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6  7  2  0  0  0  0\n  5 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'H': { n: 'Histidine', na: 'H', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 12 12  0  0  0  0            999 V2000\n    3.4242    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7097    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2807    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2571    0.4130    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5037    1.5149    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4656    0.1805    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7096    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4243    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1387    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9952    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n 10  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 11  1  0  0  0  0\n  2  9  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  6  4  2  0  0  0  0\n  7  4  1  0  0  0  0\n  7  5  2  0  0  0  0\n  5  8  1  0  0  0  0\n  8  6  1  0  0  0  0\n  9 12  1  0  0  0  0\nA   11\nR2\nA   12\nR1\nM  END\n' },
    'I': { n: 'Isoleucine', na: 'I', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    0.7145    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8581    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    2.4751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  7  1  0  0  0  0\n  1  2  1  0  0  0  0\n  3  7  1  0  0  0  0\n  3  6  1  0  0  0  0\n  3  4  1  1  0  0  0\n  4  5  2  0  0  0  0\n  4  9  1  0  0  0  0\n  7  8  1  6  0  0  0\n  6 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'meY': { n: 'N-Methyl-Tyrosine', na: 'Y', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 15 15  0  0  0  0            999 V2000\n    4.2870    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2871    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0002    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0003    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0015    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 13  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n 10  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  7  8  1  0  0  0  0\n  8 11  2  0  0  0  0\n 11  9  1  0  0  0  0\n  9 10  2  0  0  0  0\n 11 12  1  0  0  0  0\n  2 14  1  0  0  0  0\n  2 15  1  0  0  0  0\nA   13\nR2\nA   14\nR1\nM  END\n' },
    'K': { n: 'Lysine', na: 'K', rs: 3, at: { R2: 'OH', R1: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 12 11  0  0  0  0            999 V2000\n    5.0015    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0015    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7159    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2377    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  9  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8 11  1  0  0  0  0\n  7 12  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nA   12\nR3\nM  END\n' },
    'T': { n: 'Threonine', na: 'T', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8577    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  4  1  1  1  0  0  0\n  1  8  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  6  1  0  0  0  0\n  6  5  1  0  0  0  0\n  6  7  1  1  0  0  0\n  2  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'W': { n: 'Tryptophan', na: 'W', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 16 17  0  0  0  0            999 V2000\n    4.5615    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5615    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8470    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4180    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4042    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6378    1.5058    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1418    0.8465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3149    2.2649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4960    2.3649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.7057    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3229    0.9465    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6154    0.1711    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2760    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1325    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 15  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  8  6  1  0  0  0  0\n 14  7  1  0  0  0  0\n  8  9  2  0  0  0  0\n  8 10  1  0  0  0  0\n  9 14  1  0  0  0  0\n 13  9  1  0  0  0  0\n 10 11  2  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  2  0  0  0  0\n  3 16  1  0  0  0  0\nA   15\nR2\nA   16\nR1\nM  END\n' },
    'V': { n: 'Valine', na: 'V', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    2.1433    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.4750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1  8  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  4  1  1  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  0  0  0  0\n  7  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'Q': { n: 'Glutamine', na: 'Q', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 11 10  0  0  0  0            999 V2000\n    3.5723    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    2.4752    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  5  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 10  1  0  0  0  0\n  2  7  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9  6  1  0  0  0  0\n  9  8  2  0  0  0  0\n  7 11  1  0  0  0  0\nA   10\nR2\nA   11\nR1\nM  END\n' },
    'P': { n: 'Proline', na: 'P', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  9  9  0  0  0  0            999 V2000\n    0.4821    1.6599    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.9903    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4878    0.3251    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2713    0.5834    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2677    1.4084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9822    1.8209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9822    2.6459    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6967    1.4084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8547    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  5  1  1  1  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  6  8  1  0  0  0  0\n  4  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'S': { n: 'Serine', na: 'S', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    2.1433    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4288    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2376    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7143    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1  7  1  0  0  0  0\n  4  3  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n  3  8  1  0  0  0  0\nA    7\nR2\nA    8\nR1\nM  END\n' },
    'R': { n: 'Arginine', na: 'R', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 13 12  0  0  0  0            999 V2000\n    5.0012    1.3997    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2867    0.9871    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5722    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.9872    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2866    0.2135    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0012    2.2247    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.9872    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    1.3998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    2.2248    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.9872    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7157    0.9872    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4898    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  7  1  2  0  0  0  0\n  1  2  1  0  0  0  0\n  1 12  1  0  0  0  0\n  2  6  1  0  0  0  0\n  2  3  1  1  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  9 11  1  0  0  0  0\n  9 10  2  0  0  0  0\n  6 13  1  0  0  0  0\nA   12\nR2\nA   13\nR1\nM  END\n' },
    'pnG': { n: 'PNA Guanine', na: 'X', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 23 24  0  0  0  0            999 V2000\n    0.5488    4.8305    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2633    5.2430    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9777    4.8305    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6922    5.2430    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4067    4.8305    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1212    5.2430    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8356    4.8305    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5501    5.2430    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8356    4.0055    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4067    4.0055    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8233    3.4222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1689    3.6898    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8233    2.5972    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1559    2.1122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4108    1.3277    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.2358    1.3277    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4908    2.1122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8588    0.7145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0518    0.8860    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7969    1.6706    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3489    2.2837    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2713    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.8842    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7  9  2  0  0  0  0\n  5 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  2  0  0  0  0\n 11 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 17  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  2  0  0  0  0\n 14 21  1  0  0  0  0\n 14 15  2  0  0  0  0\n 15 18  1  0  0  0  0\n 18 19  1  0  0  0  0\n 19 20  1  0  0  0  0\n 20 21  2  0  0  0  0\n 18 22  2  0  0  0  0\n 20 23  1  0  0  0  0\nA    1\nR1\nA    8\nR2\nM  END\n' },
    'pnC': { n: 'PNA Cytosine', na: 'X', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 20 20  0  0  0  0            999 V2000\n    0.0000    4.7084    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    5.1209    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    4.7084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    5.1209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    4.7084    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    5.1209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    4.7084    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    5.1209    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    3.8834    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    3.8834    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    3.3001    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6201    3.5677    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    2.4751    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5601    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5601    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9890    1.2375    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9890    2.0626    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7035    2.4751    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7  9  2  0  0  0  0\n  5 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  2  0  0  0  0\n 11 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 18  1  0  0  0  0\n 14 15  2  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  2  0  0  0  0\n 17 18  1  0  0  0  0\n 18 19  2  0  0  0  0\n 16 20  1  0  0  0  0\nA    1\nR1\nA    8\nR2\nM  END\n' },
    'nL': { n: 'Norleucine', na: 'L', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    2.1434    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.6500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2870    1.2374    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1433    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  4  1  1  1  0  0  0\n  2  3  1  0  0  0  0\n  4  7  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  5  8  1  0  0  0  0\n  7  9  1  0  0  0  0\n  3 10  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'Y': { n: 'Tyrosine', na: 'Y', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 14 14  0  0  0  0            999 V2000\n    4.2870    1.6499    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2871    2.4749    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5725    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    1.6501    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    1.2376    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4291    1.6502    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7146    1.2377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0002    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4126    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4127    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0003    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0015    1.2373    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8580    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  3  1  2  0  0  0  0\n  1  4  1  0  0  0  0\n  1 13  1  0  0  0  0\n  4  2  1  0  0  0  0\n  4  5  1  1  0  0  0\n  5  6  1  0  0  0  0\n 10  6  1  0  0  0  0\n  7  6  2  0  0  0  0\n  7  8  1  0  0  0  0\n  8 11  2  0  0  0  0\n 11  9  1  0  0  0  0\n  9 10  2  0  0  0  0\n 11 12  1  0  0  0  0\n  2 14  1  0  0  0  0\nA   13\nR2\nA   14\nR1\nM  END\n' },
    'pnA': { n: 'PNA Adenine', na: 'X', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n 22 23  0  0  0  0            999 V2000\n    0.0000    4.8305    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    5.2430    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    4.8305    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    5.2430    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    4.8305    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    5.2430    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    4.8305    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    5.2430    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    4.0055    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    4.0055    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    3.4222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6201    3.6898    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2745    2.5972    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6071    2.1122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8620    1.3277    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6870    1.3277    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9420    2.1122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3100    0.7145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5030    0.8860    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2481    1.6706    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8001    2.2837    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7225    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  7  9  2  0  0  0  0\n  5 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 10 12  2  0  0  0  0\n 11 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 13 17  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  2  0  0  0  0\n 14 21  1  0  0  0  0\n 14 15  2  0  0  0  0\n 15 18  1  0  0  0  0\n 18 19  2  0  0  0  0\n 19 20  1  0  0  0  0\n 20 21  2  0  0  0  0\n 18 22  1  0  0  0  0\nA    1\nR1\nA    8\nR2\nM  END\n' }//,
    //        'am': { n: 'C-Terminal amine', na: 'X', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  2  1  0  0  0  0            999 V2000\n    0.8250    0.0001    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\nA    2\nR1\nM  END\n' },
    //        'ac': { n: 'N-Terminal Acetic Acid', na: 'X', rs: 1, at: { R2: 'OH' }, m: '\nMolEngine04211615442D\n\n  4  3  0  0  0  0            999 V2000\n    0.0000    1.4289    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4125    0.7145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2375    0.7145    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  2  4  1  0  0  0  0\nA    4\nR2\nM  END\n' }
};

org.helm.webeditor.Monomers.chems= {
    R: { backgroundcolor: "#eeeeee", rs: 1 },
    'sDBL': { n: 'Symmetric Doubler', rs: 3, at: { R1: 'H', R2: 'H', R3: 'H' }, m: '\nMolEngine04211615442D\n\n 23 22  0  0  0  0            999 V2000\n    2.1434    2.7770    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.9520    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    1.5395    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    1.9520    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    1.5395    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    1.9520    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.7158    1.5395    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4303    1.9520    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4303    2.7770    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1447    3.1895    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1447    4.0145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8592    4.4270    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8592    5.2520    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    3.1895    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    4.0145    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    4.4270    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    5.2520    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    7.1447    1.5395    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.5395    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8744    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    5.6645    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5737    5.6645    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\n  9 11  1  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n  1 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  1  0  0  0  0\n 17 18  1  0  0  0  0\n  8 19  2  0  0  0  0\n  2 20  2  0  0  0  0\n 10 21  1  0  0  0  0\n 18 22  1  0  0  0  0\n 14 23  1  0  0  0  0\nA   21\nR1\nA   22\nR2\nA   23\nR3\nM  END\n' },
    'N-BLOCK': { n: 'N-BLOCK', na: '', rs: 1, at: { R1: 'OH' }, m: '\nMolEngine04211615442D\n\n  2  1  0  0  0  0            999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\nA    2\nR1\nM  END\n' },
    'Alexa': { n: 'Alexa Fluor 488', rs: 1, at: { R1: 'X' } },
    'Az': { n: 'Azide', rs: 1, at: { R1: 'OH' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    4.2868    1.6500    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2868    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8578    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7144    0.4125    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 N   0  5  0  0  0  0  0  0  0  0  0  0\n    5.0012    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  2  0  0  0  0\n  7  8  2  0  0  0  0\n  2  9  1  0  0  0  0\nA    9\nR1\nM  CHG  1   7   1\nM  CHG  1   8  -1\nM  END\n' },
    'hxy': { n: 'Hexynyl alcohol', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  8  7  0  0  0  0            999 V2000\n    4.2869    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0014    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  3  0  0  0  0\nA    3\nR1\nM  END\n' },
    'SMPEG2': { n: 'SM(PEG)2 linker from Pierce', rs: 2, at: { R1: 'OH', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 24 24  0  0  0  0            999 V2000\n    7.0960    1.2375    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8105    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    8.5250    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.2395    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.8228    1.4084    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   10.2708    2.6658    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    9.5900    2.1998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   10.6475    1.3852    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   10.9243    2.1624    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   11.0600    0.6708    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    8.7931    2.4133    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   11.7212    2.3759    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    7.8105    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.3815    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.6671    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.9526    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2381    1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.6548    0.6541    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9403    1.0666    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.8531    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    1.2656    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.8531    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.2656    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.0281    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  7  5  1  0  0  0  0\n  5  8  1  0  0  0  0\n  6  7  1  0  0  0  0\n  8  9  1  0  0  0  0\n  6  9  1  0  0  0  0\n  8 10  2  0  0  0  0\n  7 11  2  0  0  0  0\n  9 12  1  0  0  0  0\n  2 13  2  0  0  0  0\n  1 14  1  0  0  0  0\n 14 15  1  0  0  0  0\n 15 16  1  0  0  0  0\n 16 17  1  0  0  0  0\n 17 18  1  0  0  0  0\n 18 19  1  0  0  0  0\n 19 20  1  0  0  0  0\n 20 21  1  0  0  0  0\n 21 22  1  0  0  0  0\n 22 23  1  0  0  0  0\n 22 24  2  0  0  0  0\nA   12\nR2\nA   23\nR1\nM  END\n' },
    'SS3': { n: 'Dipropanol-disulfide', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 12 11  0  0  0  0            999 V2000\n    0.0082    7.0297    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    6.2083    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7103    5.7886    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7042    4.9666    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4156    4.5488    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4084    3.7249    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1209    3.3124    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1167    2.4874    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8275    2.0687    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8203    1.2437    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5312    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5240    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  6  7  1  0  0  0  0\n  2  3  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  3  4  1  0  0  0  0\n  9 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n  4  5  1  0  0  0  0\n 11 12  1  0  0  0  0\n  1  2  1  0  0  0  0\n  5  6  1  0  0  0  0\nA    1\nR1\nA   12\nR2\nM  END\n' },
    'Cys-BLOCK': { n: 'Cys-BLOCK', na: '', rs: 1, at: { R1: 'X' }, m: '\nMolEngine04211615442D\n\n  2  1  0  0  0  0            999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\nA    2\nR1\nM  END\n' },
    'EG': { n: 'Ethylene Glycol', rs: 2, at: { R2: 'OH', R1: 'H' }, m: '\nMolEngine04211615442D\n\n  5  4  0  0  0  0            999 V2000\n    0.7145    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\n  4  5  1  0  0  0  0\nA    3\nR1\nA    5\nR2\nM  END\n' },
    'MCC': { n: '4-(N-maleimidomethyl)cyclohexane-1-carboxylate', rs: 1, at: { R1: 'OH' }, m: '\nMolEngine04211615442D\n\n 17 18  0  0  0  0            999 V2000\n    1.9488    0.5948    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3745    1.1870    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6002    1.9805    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4003    2.1818    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9746    1.5896    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7489    0.7960    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5744    0.9857    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.5780    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3487    0.1922    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7747    1.7908    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3490    1.1986    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2075    0.3858    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.1657    1.3151    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5290    0.5744    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.9367    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4667    0.0226    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5515    2.0444    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  1  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  7  8  2  0  0  0  0\n  7  9  1  0  0  0  0\n  5 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 12 11  1  0  0  0  0\n 11 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 14 15  2  0  0  0  0\n 12 15  1  0  0  0  0\n 12 16  2  0  0  0  0\n 13 17  2  0  0  0  0\nA    9\nR1\nM  END\n' },
    'C-BLOCK': { n: 'C-BLOCK', na: '', rs: 1, at: { R1: 'H' }, m: '\nMolEngine04211615442D\n\n  2  1  0  0  0  0            999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\nA    2\nR1\nM  END\n' },
    'PEG2': { n: 'Diethylene Glycol', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n  9  8  0  0  0  0            999 V2000\n    0.7144    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4289    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5723    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1557    0.5833    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.8702    0.1708    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5846    0.5833    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  1  9  1  0  0  0  0\nA    8\nR2\nA    9\nR1\nM  END\n' },
    'A6OH': { n: '6-amino-hexanol', rs: 2, at: { R1: 'H', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 10  9  0  0  0  0            999 V2000\n    5.7158    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    5.0013    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2869    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1435    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4303    0.4125    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  8 10  1  0  0  0  0\nA    9\nR2\nA   10\nR1\nM  END\n' },
    'SMCC': { n: 'SMCC linker from Pierce', rs: 2, at: { R1: 'OH', R2: 'H' }, m: '\nMolEngine04211615442D\n\n 18 19  0  0  0  0            999 V2000\n    2.8579    0.5667    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5724    0.1542    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1557    0.7376    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6037    1.9950    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.9229    1.5290    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.9804    0.7144    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.2572    1.4916    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.3929    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1260    1.7425    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    6.0541    1.7051    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    1.8042    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    1.3917    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4290    0.5667    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1434    0.1542    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8579    1.3917    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    1.8042    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7145    2.6292    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.3917    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  5  3  1  0  0  0  0\n  3  6  1  0  0  0  0\n  4  5  1  0  0  0  0\n  6  7  1  0  0  0  0\n  4  7  1  0  0  0  0\n  6  8  2  0  0  0  0\n  5  9  2  0  0  0  0\n  7 10  1  0  0  0  0\n 14  1  1  0  0  0  0\n  1 15  1  0  0  0  0\n 11 12  1  0  0  0  0\n 12 13  1  0  0  0  0\n 13 14  1  0  0  0  0\n 11 15  1  0  0  0  0\n 12 16  1  0  0  0  0\n 16 17  2  0  0  0  0\n 16 18  1  0  0  0  0\nA   10\nR2\nA   18\nR1\nM  END\n' }
};
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* HELM Editor Plugin class
* @class org.helm.webeditor.Plugin
*/
org.helm.webeditor.Plugin = scil.extend(scil._base, {
    /**
    @property {MonomerExplorer} monomerexplorer - Monomer Explorer
    **/
    /**
    @property {JSDraw2.Editor} jsd - Drawing Canvas
    **/

    /**
    * @constructor Plugin
    * @param {JSDraw2.Editor} jsd - The JSDraw canvas
    **/
    constructor: function (jsd) {
        this.jsd = jsd;
        this.monomerexplorer = null;
    },

    /**
    * Get the molecule formula
    * @function getMF
    * @param {bool} html - indicate if html format is needed
    * @returns the molecular formula as a string
    */
    getMF: function (html) {
        return org.helm.webeditor.Formula.getMF(this.jsd.m, html);
    },

    /**
    * Get the molecule weight
    * @function getMW
    * @returns the molecular weight as a number
    */
    getMW: function () {
        return org.helm.webeditor.Formula.getMW(this.jsd.m);
    },

    /**
    * Get the Extinction Coefficient
    * @function getExtinctionCoefficient
    * @returns the Extinction Coefficient as a number
    */
    getExtinctionCoefficient: function () {
        return org.helm.webeditor.ExtinctionCoefficient.calculate(this.jsd.m);
    },

    getSpareRs: function (a, rs) {
        if (a.bio == null) // not bio
            return [];

        var m = org.helm.webeditor.Monomers.getMonomer(a);
        if (m == null)
            return null;

        if (rs == null)
            rs = [];
        else
            rs.splice(0, rs.length);

        for (var r in m.at) {
            var i = parseInt(r.substr(1));
            rs[i] = true;
        }

        var bonds = this.jsd.m.getNeighborBonds(a);
        for (var i = 0; i < bonds.length; ++i) {
            var b = bonds[i];
            if (b.a1 == a && rs[b.r1] != null)
                rs[b.r1] = false;
            else if (b.a2 == a && rs[b.r2] != null)
                rs[b.r2] = false;
        }

        var ret = [];
        for (var i = 1; i <= rs.length; ++i) {
            if (rs[i])
                ret.push(i);
        }
        return ret.length == 0 ? null : ret;
    },

    hasSpareR: function (a, r) {
        if (a == null)
            return false;
        if (a.bio == null)
            return true;

        if (typeof (r) == "string" && scil.Utils.startswith(r, "R"))
            r = parseInt(r.substr(1));

        var rs = this.getSpareRs(a);
        if (rs == null || rs.indexOf(r) < 0) {
            //scil.Utils.alert("The monomer, " + a.elem + ", does define R" + r);
            return false;
        }

        var bonds = this.jsd.m.getNeighborBonds(a);
        for (var i = 0; i < bonds.length; ++i) {
            var b = bonds[i];
            if (b.a1 == a && b.r1 == r)
                return false;
            else if (b.a2 == a && b.r2 == r)
                return false;
        }

        return true;
    },

    getDefaultNodeType: function (a, c) {
        var s = null;
        if (this.monomerexplorer != null)
            s = this.monomerexplorer.selected[a];
        if (!scil.Utils.isNullOrEmpty(s))
            return s;

        var set = org.helm.webeditor.Monomers.getMonomerSet(a);
        var m = set == null || this.jsd._keypresschar == null ? null : set[this.jsd._keypresschar];
        if (m != null)
            return this.jsd._keypresschar;

        if (c != null)
            return c;

        return org.helm.webeditor.Monomers.getDefaultMonomer(a);
    },

    setNodeType: function (a, biotype, elem) {
        var mon = org.helm.webeditor.Monomers.getMonomer(biotype, elem);
        if (mon == null)
            return false;

        var id = a.bio == null ? null : a.bio.id;
        a.bio = { type: biotype, id: id };
        a.elem = elem;
        return true;
    },

    cancelDnD: function() {
        if (this.monomerexplorer != null)
            this.monomerexplorer.dnd.cancel();
    },

    /**
    * Replace monomers
    * @function replaceMonomer
    * @param {enum} monomertype - org.helm.webeditor.HELM.BASE/SUGAR/LINKER/AA/CHEM
    * @param {string} find - the monomer name to be found
    * @param {string} replacedwith - the monomer name to be replaced with
    * @param {bool} selectedonly - indicate if seaching the selected part only
    * @returns the count replaced
    */
    replaceMonomer: function (monomertype, find, replacedwith, selectedonly) {
        var n = 0;
        var atoms = this.jsd.m.atoms;
        for (var i = 0; i < atoms.length; ++i) {
            var a = atoms[i];
            if ((selectedonly && a.selected || !selectedonly) &&
                find == a.elem &&
                (monomertype == "" || monomertype == a.biotype())) {
                if (this.setNodeType(a, a.biotype(), replacedwith))
                    ++n;
            }
        }
        return n;
    },

    makeComplementaryStand: function (a) {
        var chain = org.helm.webeditor.Chain.getChain(this.jsd.m, a);
        if (chain == null)
            return false;

        return chain.makeComplementaryStrand(this.jsd.m, this.jsd.bondlength);
    },

    /**
    * Apply a rule
    * @function applyRule
    * @param {function} rulefun - a rule function to be called: function(plugin) {}
    */
    applyRule: function (rulefun) {
        org.helm.webeditor.RuleSet.applyRule(this, rulefun);
    },

    applyRules: function (funs) {
        org.helm.webeditor.RuleSet.applyRules(this, funs);
    },

    addNode: function (p, biotype, elem) {
        elem = org.helm.webeditor.IO.trimBracket(elem);

        var m = org.helm.webeditor.Monomers.getMonomer(biotype, elem);
        if (m == null) {
            scil.Utils.alert("Unknown " + biotype + " monomer name: " + elem);
            return null;
        }

        var a = org.helm.webeditor.Interface.createAtom(this.jsd.m, p);
        this.setNodeType(a, biotype, elem);
        return a;
    },

    addBond: function (a1, a2, r1, r2) {
        if (a1 == null || a2 == null || a1 == a2 || !this.hasSpareR(a1, r1) || !this.hasSpareR(a2, r2))
            return null;
        //if (a1.biotype() == org.helm.webeditor.HELM.SUGAR && a2.biotype() == org.helm.webeditor.HELM.SUGAR || a1.biotype() == org.helm.webeditor.HELM.AA && a2.biotype() == org.helm.webeditor.HELM.AA) {
        //    if ((r1 == 1 || r1 == 2) && r1 == r2)
        //        return null;
        //}
        var b = org.helm.webeditor.Interface.createBond(this.jsd.m, a1, a2);
        b.r1 = r1;
        b.r2 = r2;
        return b;
    },

    addHydrogenBond: function (a1, a2) {
        if (a1 == null || a2 == null || a1 == a2)
            return null;
        var b = org.helm.webeditor.Interface.createBond(this.jsd.m, a1, a2);
        b.type = JSDraw2.BONDTYPES.UNKNOWN;
        return b;
    },

    connectFragment: function (a1, a2, extendchain) {
        var b = null;
        var a = null;
        var frag = null;

        var left = a1.p.x < a2.p.x ? a1 : a2;
        if (a1.p.x > a2.p.x) {
            var t = a1;
            a1 = a2;
            a2 = t;
        }

        var delta = org.helm.webeditor.bondscale * this.jsd.bondlength;

        var bt1 = a1.biotype();
        var bt2 = a2.biotype();
        if (bt1 == org.helm.webeditor.HELM.LINKER && bt2 == org.helm.webeditor.HELM.SUGAR || bt1 == org.helm.webeditor.HELM.SUGAR && bt2 == org.helm.webeditor.HELM.LINKER || bt1 == org.helm.webeditor.HELM.SUGAR && bt2 == org.helm.webeditor.HELM.SUGAR ||
            bt1 == org.helm.webeditor.HELM.AA && bt2 == org.helm.webeditor.HELM.AA) {
            var f = false;
            if (this.hasSpareR(a1, 2) && this.hasSpareR(a2, 1)) {
                f = true;
            }
            else if (this.hasSpareR(a2, 2) && this.hasSpareR(a1, 1)) {
                var t = a1;
                a1 = a2;
                a2 = t;

                f = true;
            }

            if (f) {
                frag = this.jsd.getFragment(a2);
                if (bt1 == org.helm.webeditor.HELM.AA) {
                    b = this.addBond(a1, a2, 2, 1);
                }
                else {
                   if (bt1 != bt2 || !this.needLinker()) {
                        b = this.addBond(a1, a2, 2, 1);
                    }
                    else {
                        a = this.addNode(org.helm.webeditor.Interface.createPoint(left.p.x + delta, left.p.y), org.helm.webeditor.HELM.LINKER, this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER));
                        b = this.addBond(a1, a, 2, 1);
                        if (b != null)
                            b = this.addBond(a, a2, 2, 1);
                    }
                }

                this.finishConnect(extendchain, b, a, a1, a2, frag, delta);
                return;
            }
        }
        else if (bt1 == org.helm.webeditor.HELM.SUGAR && bt2 == org.helm.webeditor.HELM.BASE || bt2 == org.helm.webeditor.HELM.SUGAR && bt1 == org.helm.webeditor.HELM.BASE) {
            if (bt2 == org.helm.webeditor.HELM.SUGAR) {
                var t = a1;
                a1 = a2;
                a2 = t;
            }
            var b = this.addBond(a1, a2, 3, 1);
            if (b != null) {
                a2.p = org.helm.webeditor.Interface.createPoint(a1.p.x, a1.p.y + Math.abs(delta));
                this.finishConnect(false, b, null, b.a1);
            }
            return;
        }

        var rs1 = this.getSpareRs(a1);
        var rs2 = this.getSpareRs(a2);
        if (rs1 == null || rs2 == null) {
            scil.Utils.alert("Either atom doesn't have any connecting point available");
            this.finishConnect(extendchain);
            return;
        }

        if (rs1.length <= 1 && rs2.length <= 1) {
            if (bt1 == org.helm.webeditor.HELM.LINKER)
                bt1 = org.helm.webeditor.HELM.SUGAR;
            if (bt2 == org.helm.webeditor.HELM.LINKER)
                bt2 = org.helm.webeditor.HELM.SUGAR;
            // prevent head-to-head and tail-to-tail connection
            if (bt1 == bt2 && (bt1 == org.helm.webeditor.HELM.SUGAR || bt1 == org.helm.webeditor.HELM.AA) && rs1[0] == rs2[0] && (rs1[0] == 1 || rs1[0] == 2)) {
                scil.Utils.alert("head-to-head / tail-to-tail connection is not allowed");
                return;
            }

            frag = this.jsd.getFragment(a2);
            b = this.addBond(a1, a2, rs1[0], rs2[0]);
        }
        else {
            if (extendchain)
                this.jsd.refresh();
            var me = this;
            this.chooseRs(rs1, rs2, function (r1, r2) {
                frag = me.jsd.getFragment(a2);
                b = me.addBond(a1, a2, r1, r2);
                me.finishConnect(extendchain, b, a1, a1, a2, frag, delta);
            });
            return;
        }

        this.finishConnect(extendchain, b, a, a1, a2, frag, delta);
    },

    needLinker: function() {
        var linker = this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER);
        return linker != "null";
    },

    finishConnect: function (extendchain, b, a, a1, a2, frag, delta) {
        var cleaned = false;
        if (b != null && b.r1 > 2 && b.r2 > 2) {
            this.clean();
        }
        else {
            if (b != null && !extendchain) {
                if (frag != null) {
                    var p = a1.p.clone().offset(delta, 0);
                    if (a == null)
                        a = a1;

                    if (a != a1) {
                        a.p = p.clone();
                        p.offset(delta, 0);
                    }

                    if (frag.containsAtom(a1)) {
                        this.clean(a1);
                        cleaned = true;
                    }
                    else {
                        frag.offset(p.x - a2.p.x, p.y - a2.p.y);
                    }
                }
            }

            if (!cleaned) {
                var chain = org.helm.webeditor.Chain.getChain(this.jsd.m, a1);
                if (chain != null)
                    chain.resetIDs();
            }
        }

        this.jsd.refresh(extendchain || b != null);
    },

    chooseRs: function (rs1, rs2, callback) {
        if (this.chooseRDlg == null) {
            var me = this;
            var fields = { r1: { label: "Monomer 1 (left)", type: "select", width: 120 }, r2: { label: "Monomer 2 (right)", type: "select", width: 120 } };
            this.chooseRDlg = scil.Form.createDlgForm("Choose Connecting Points", fields, { label: "OK", onclick: function () { me.chooseRs2(); } });
        }

        this.chooseRDlg.callback = callback;
        this.chooseRDlg.show2({ owner: this.jsd });
        this._listRs(this.chooseRDlg.form.fields.r1, rs1, 2);
        this._listRs(this.chooseRDlg.form.fields.r2, rs2, 1);

        this.chooseRDlg.form.fields.r1.disabled = rs1.length <= 1;
        this.chooseRDlg.form.fields.r2.disabled = rs2.length <= 1;

        this.chooseRDlg.rs1 = rs1;
        this.chooseRDlg.rs2 = rs2;
    },

    _listRs: function (sel, list, v) {
        var ss = {};
        for (var i = 0; i < list.length; ++i)
            ss[list[i] + ""] = "R" + list[i];
        scil.Utils.listOptions(sel, ss, v == null ? null : (v+""), true, false);
    },

    chooseRs2: function () {
        var d = this.chooseRDlg.form.getData();
        if (scil.Utils.isNullOrEmpty(d.r1) && this.chooseRDlg.rs1.length > 0 || scil.Utils.isNullOrEmpty(d.r2) && this.chooseRDlg.rs2.length > 0) {
            scil.Utils.alter("Please select Rs for both Nodes");
            return;
        }

        this.chooseRDlg.hide();
        this.chooseRDlg.callback(d.r1 == null ? null : parseInt(d.r1), d.r2 == null ? null : parseInt(d.r2));
    },

    changeMonomer: function (a, cloned) {
        var s = this.getDefaultNodeType(a.biotype());
        if (!scil.Utils.isNullOrEmpty(s) && a.elem != s && s != "null") {
            this.jsd.pushundo(cloned);
            this.setNodeType(a, a.biotype(), s);
            this.jsd.refresh(true);
        }
        else {
            scil.Utils.beep();
        }
    },

    extendChain: function (a1, cmd, p1, p2, cloned) {
        var rs = [];
        var rgroups = this.getSpareRs(a1, rs);
        if (rgroups == null) {
            scil.Utils.alert("No connecting points available");
            this.jsd.redraw();
            return;
        }

        var delta = p2.x > p1.x ? org.helm.webeditor.bondscale * this.jsd.bondlength : -org.helm.webeditor.bondscale * this.jsd.bondlength;
        var p = org.helm.webeditor.Interface.createPoint(a1.p.x + delta, a1.p.y);

        var a2 = null;
        var r1 = null;
        var r2 = null;
        var bond = null;
        if (cmd == "helm_chem") {
            if (Math.abs(p2.y - p1.y) / Math.abs(p2.x - p1.x) > 5)
                p = org.helm.webeditor.Interface.createPoint(a1.p.x, a1.p.y + Math.abs(delta) * (p2.y > p1.y ? 1 : -1));
            a2 = this.addNode(p, org.helm.webeditor.HELM.CHEM, this.getDefaultNodeType(org.helm.webeditor.HELM.CHEM));
            if (a2 != null) {
                this.connectFragment(a1, a2, true);
                return;
            }
        }
        else if (cmd == "helm_aa") {
            if (Math.abs(p2.y - p1.y) / Math.abs(p2.x - p1.x) > 5)
                p = org.helm.webeditor.Interface.createPoint(a1.p.x, a1.p.y + Math.abs(delta) * (p2.y > p1.y ? 1 : -1));
            a2 = this.addNode(p, org.helm.webeditor.HELM.AA, this.getDefaultNodeType(org.helm.webeditor.HELM.AA));
        }
        else if (cmd == "helm_linker") {
            a2 = this.addNode(p, org.helm.webeditor.HELM.LINKER, this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER));
        }
        else if (cmd == "helm_sugar") {
            a2 = this.addNode(p, org.helm.webeditor.HELM.SUGAR, this.getDefaultNodeType(org.helm.webeditor.HELM.SUGAR));
        }
        else if (cmd == "helm_base") {
            if (a1.biotype() == org.helm.webeditor.HELM.SUGAR && this.hasSpareR(a1, 3)) {
                r1 = 3;
                r2 = 1;
                p = org.helm.webeditor.Interface.createPoint(a1.p.x, a1.p.y + Math.abs(delta));
                a2 = this.addNode(p, org.helm.webeditor.HELM.BASE, this.getDefaultNodeType(org.helm.webeditor.HELM.BASE));
            }
        }
        else if (cmd == "helm_nucleotide" || cmd == "helm_sugar") {
            if (Math.abs(p2.y - p1.y) / Math.abs(p2.x - p1.x) > 5) {
                // drag vertically to add base
                if (a1.biotype() == org.helm.webeditor.HELM.SUGAR && rs[3] == true) {
                    r1 = 3;
                    r2 = 1;
                    p = org.helm.webeditor.Interface.createPoint(a1.p.x, a1.p.y + Math.abs(delta));
                    a2 = this.addNode(p, org.helm.webeditor.HELM.BASE, this.getDefaultNodeType(org.helm.webeditor.HELM.BASE));
                }
            }
            else {
                if (rs[1] == true || rs[2] == true) {
                    var m = this.getDefaultNodeType(org.helm.webeditor.HELM.SUGAR);
                    var e = this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER);
                    var linker = null;
                    var sugar = null;
                    if (delta < 0) {
                        if (e != "null") {
                            linker = this.addNode(p.clone(), org.helm.webeditor.HELM.LINKER, e);
                            p.x += delta;
                        }
                        sugar = this.addNode(p.clone(), org.helm.webeditor.HELM.SUGAR, m);

                        if (rs[1])
                            r1 = 1;
                        else
                            r1 = 2;

                        r2 = r1 == 1 ? 2 : 1;
                        if (linker != null) {
                            bond = this.addBond(a1, linker, r1, r2);
                            this.addBond(linker, sugar, r1, r2);
                        }
                        else {
                            bond = this.addBond(a1, sugar, r1, r2);
                        }
                    }
                    else {
                        sugar = this.addNode(p.clone(), org.helm.webeditor.HELM.SUGAR, m);
                        p.x += delta;
                        if (e != "null")
                            linker = this.addNode(p.clone(), org.helm.webeditor.HELM.LINKER, e);

                        if (rs[2])
                            r1 = 2;
                        else
                            r1 = 1;

                        r2 = r1 == 1 ? 2 : 1;
                        if (linker != null) {
                            bond = this.addBond(a1, sugar, r1, r2);
                            this.addBond(sugar, linker, r1, r2);
                        }
                        else {
                            bond = this.addBond(a1, sugar, r1, r2);
                        }
                    }

                    var base = null;
                    if (cmd == "helm_nucleotide" && org.helm.webeditor.Monomers.hasR(org.helm.webeditor.HELM.SUGAR, m, "R3")) {
                        base = this.addNode(sugar.p.clone(), org.helm.webeditor.HELM.BASE, this.getDefaultNodeType(org.helm.webeditor.HELM.BASE));
                        this.addBond(sugar, base, 3, 1);

                        var leftR = bond.a1.p.x < bond.a2.p.x ? bond.r1 : bond.r2;
                        if (leftR == 1) // reversed
                            base.p.y -= Math.abs(delta);
                        else
                            base.p.y += Math.abs(delta);
                    }

                    this.jsd.pushundo(cloned);
                    this.finishConnect(false, bond, null, a1);
                }
            }
        }

        if (a2 != null) {
            if (r1 == null || r2 == null) {
                if (this.hasSpareR(a1, 2) && !this.hasSpareR(a1, 1)) {
                    r1 = 2;
                    r2 = 1;
                }
                else if (this.hasSpareR(a1, 1) && !this.hasSpareR(a1, 2)) {
                    r1 = 1;
                    r2 = 2;
                }
                else {
                    r1 = delta > 0 ? 2 : 1;
                    r2 = r1 == 2 ? 1 : 2;
                }
            }
            bond = this.addBond(a1, a2, r1, r2);
        }

        if (bond != null) {
            this.jsd.pushundo(cloned);
            this.finishConnect(false, bond, null, a1);
        }
        else {
            this.jsd.refresh();
        }
    },

    /**
    * Get HELM
    * @function getHelm
    * @param {bool} highlightselection - internal use only, using null always
    * @returns the HELM as string
    */
    getHelm: function (highlightselection) {
        return org.helm.webeditor.IO.getHelm(this.jsd.m, highlightselection);
    },

    /**
    * Get sequence of natuaral analogue
    * @function getSequence
    * @param {bool} highlightselection - internal use only, using null always
    * @returns the sequence as a string
    */
    getSequence: function (highlightselection) {
        return org.helm.webeditor.IO.getSequence(this.jsd.m, highlightselection);
    },

    /**
    * Get XHELM
    * @function getXHelm
    * @returns XHELM as a string
    */
    getXHelm: function () {
        return org.helm.webeditor.IO.getXHelm(this.jsd.m);
    },

    /**
    * Set HELM
    * @function getSequence
    * @param {string} s - The HELM string
    * @param {string} renamedmonomers - internal use only, using null always
    */
    setHelm: function (s, renamedmonomers) {
        this.jsd.clear();

        var n = 0;
        try {
            if (!scil.Utils.isNullOrEmpty(s))
                n = org.helm.webeditor.IO.read(this, s, "HELM", renamedmonomers);
        }
        catch (e) {
            this.jsd.clear();
            return;
        }

        if (n > 0) {
            this.clean();
            this.jsd.fitToWindow();
            this.jsd.refresh();
        }
    },

    /**
    * Set XHELM 
    * @function setXHelm
    * @param {string} s - the xhelm string
    */
    setXHelm: function (s) {
        var doc = typeof (s) == "string" ? scil.Utils.parseXml(s) : s;
        if (doc == null)
            return false;

        var es = doc.getElementsByTagName("HelmNotation");
        if (es == null || es.length == 0)
            return false;

        var s = scil.Utils.getInnerText(es[0]);

        var list = doc.getElementsByTagName("Monomers");
        if (list == null || list.length == 0) {
            this.setHelm(s);
            return;
        }

        var me = this;
        org.helm.webeditor.monomers.loadMonomers(list[0], function (renamed) {
            if (me.monomerexplorer != null)
                me.monomerexplorer.reloadTabs();
            me.setHelm(s, renamed);
        });
    },

    isXHelm: function(doc) {
        var ret = doc == null ? null : doc.getElementsByTagName("Xhelm");
        return ret != null && ret.length == 1;
    },

    /**
    * Show Importing Sequence dialog
    * @function showImportDlg
    */
    showImportDlg: function () {
        if (this.inputSeqDlg == null) {
            var fields = {
                type: { label: "Sequence Type", type: "select", items: ["HELM", "Peptide", "RNA"] },
                sequence: { label: "Sequence", type: "textarea", width: 800, height: 50 }
            };

            var me = this;
            this.inputSeqDlg = scil.Form.createDlgForm("Import Sequence", fields, [
                { label: "Import", onclick: function () { me.importSequence(false); } },
                { label: "Append", onclick: function () { me.importSequence(true); } }
            ]);
        }

        this.inputSeqDlg.show2({ owner: this.jsd });
    },

    importSequence: function (append) {
        var data = this.inputSeqDlg.form.getData();
        if (this.setSequence(data.sequence, data.type, null, null, append))
            this.inputSeqDlg.hide();
    },

    /**
    * Set a sequence (natural analogue sequence, HELM,)
    * @function setSequence
    * @param {string} seq - the input sequence
    * @param {string} format - input format: HELM, RNA, Peptide, or null
    * @param {string} sugar - the sugar for RNA
    * @param {string} linker - the linker for RNA
    * @param {bool} append - set the sequence in appending mode or overwriting mode
    */
    setSequence: function (seq, format, sugar, linker, append) {
        var seq = scil.Utils.trim(seq);
        if (/^[a-z]+$/.test(seq))
            seq = seq.toUpperCase();

        var n = 0;
        var cloned = this.jsd.clone();
        this.jsd.clear();
        try {
            n = org.helm.webeditor.IO.read(this, seq, format, null, sugar, linker);
        }
        catch (e) {
            this.jsd.restoreClone(cloned);
            var s = e.message == null ? e : e.message;
            if (!scil.Utils.isNullOrEmpty(s))
                scil.Utils.alert("Error: " + s);
            return false;
        }

        if (n > 0) {
            this.jsd.pushundo(cloned);

            this.clean();

            if (append) {
                var m = cloned.mol.clone();
                var rect = m.rect();
                var r2 = this.jsd.m.rect();
                if (r2 != null && rect != null)
                    this.jsd.m.offset(rect.center().x - r2.center().x, rect.bottom() + this.jsd.bondlength * 4 - r2.bottom());
                m.mergeMol(this.jsd.m);
                this.jsd.m = m;
            }

            this.jsd.fitToWindow();
            this.jsd.refresh(true);
        }
        return true;
    },

    /**
    * Clean the layout
    * @function clean
    * @param {JSDraw2.Atom} a - the start monomer.  Use null to clean all
    * @param {bool} redraw - indicate if redrawing the structure after cleaning
    */
    clean: function (a, redraw) {
        if (redraw)
            this.jsd.pushundo();

        org.helm.webeditor.Layout.clean(this.jsd.m, this.jsd.bondlength, a);
        if (redraw) {
            this.jsd.moveCenter();
            this.jsd.refresh(true);
        }
    },

    /**
    * Reset monomer IDs 
    * @function resetIDs
    */
    resetIDs: function () {
        org.helm.webeditor.Layout.resetIDs(this.jsd.m);
    },

    dropMonomer: function (type, id, e) {
        var p = this.jsd.eventPoint(e);
        if (p.x <= 0 || p.y <= 0 || p.x >= this.jsd.dimension.x || p.y >= this.jsd.dimension.y || id == "null")
            return false;
            
        var f = false;
        if (this.jsd.curObject == null) {
            // create new monomer
            var cmd = type == "nucleotide" ? "helm_nucleotide" : type.toLowerCase();
            if (this.isHelmCmd(cmd)) {
                p.offset(this.jsd.bondlength * 0.4, this.jsd.bondlength * 0.4);
                this.jsd.pushundo();
                var a = org.helm.webeditor.Interface.createAtom(this.jsd.m, p);
                this.createIsolatedMonomer(cmd, a);
                f = true;
            }
        }
        else {
            // modify the target monomer
            var set = org.helm.webeditor.Monomers.getMonomerSet(type);
            if (set == null || set[id] == null)
                return false;

            var a = org.helm.webeditor.Interface.getCurrentAtom(this.jsd);
            if (a == null || !org.helm.webeditor.isHelmNode(a) || a.biotype() != type || a.elem == id)
                return false;

            this.jsd.pushundo();
            this.setNodeType(a, a.biotype(), id);
            f = true;
        }

        if (f)
            this.jsd.refresh(true);
        return f;
    },

    showFindReplaceDlg: function () {
        if (this.findDlg == null) {
            var fields = {
                finding: { label: "Find", width: 400, str: "<div>(Monomer name or monomer ID)</div>" },
                monomertype: { label: "Monomer Type", type: "select", sort: false, items: org.helm.webeditor.monomerTypeList() },
                replacewith: { label: "Replace With", width: 400 },
                selectedonly: { label: "Scope", type: "checkbox", str: "Search Selected Only" }
            };

            var me = this;
            this.findDlg = scil.Form.createDlgForm("Find and Replace", fields, [
                { label: "Find", onclick: function () { me.showFindReplaceDlg2("find"); } },
                { label: "Find All", onclick: function () { me.showFindReplaceDlg2("findall"); } },
                { label: "Replace All", onclick: function () { me.showFindReplaceDlg2("replaceall"); } }
            ])
        }

        this.findDlg.show2({ owner: this.jsd });
    },

    showFindReplaceDlg2: function (action) {
        var data = this.findDlg.form.getData();
        if (scil.Utils.isNullOrEmpty(data.finding) || action == "replaceall" && scil.Utils.isNullOrEmpty(data.replacewith)) {
            scil.Utils.alert("Find and Replace With cannot be blank");
            return;
        }

        if (action == "find")
            this.find(data.finding, false, data.monomertype, data.selectedonly);
        else if (action == "findall")
            this.find(data.finding, true, data.monomertype, data.selectedonly);
        else if (action == "replaceall")
            this.replaceAll(data.finding, data.replacewith, data.monomertype, data.selectedonly);
    },

    getSelectedAtoms: function() {
        var ret = [];
        var atoms = this.jsd.m.atoms;
        for (var i = 0; i < atoms.length; ++i) {
            if (atoms[i].selected)
                ret.push(atoms[i]);
        }
        return ret;
    },

    find: function (a, findall, monomertype, selectedonly) {
        var atoms = selectedonly ? this.getSelectedAtoms() : this.jsd.m.atoms;
        this.jsd.m.setSelected(false);

        var n = 0;
        var atom = null;
        if (/^[0-9]+$/.test(a)) {
            var aaid = parseInt(a);
            for (var i = 0; i < atoms.length; ++i) {
                if (atoms[i].bio != null && aaid == atoms[i].bio.id && (monomertype == "" || monomertype == atoms[i].biotype())) {
                    ++n;
                    atoms[i].selected = true;
                    atom = atoms[i];
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < atoms.length; ++i) {
                if (a == atoms[i].elem && (monomertype == "" || monomertype == atoms[i].biotype())) {
                    ++n;
                    atoms[i].selected = true;
                    if (!findall) {
                        atom = atoms[i];
                        break;
                    }
                }
            }
        }

        if (findall) {
            scil.Utils.alert(n + " node(s) found");
        }
        else {
            if (n == 0) {
                scil.Utils.alert("Cannot find " + a);
            }
            else {
                org.helm.webeditor.Interface.scaleCanvas(this.jsd);
                var dx = this.jsd.dimension.x / 2 - atom.p.x;
                var dy = this.jsd.dimension.y / 2 - atom.p.y;
                this.jsd.m.offset(dx, dy);
            }
        }

        if (n > 0)
            this.jsd.redraw();
    },

    replaceAll: function (a, a2, monomertype, selectedonly) {
        var n = 0;
        var cloned = this.jsd.clone();
        if (/^[0-9]+$/.test(a)) {
            var aaid = parseInt(a);
            var atoms = selectedonly ? this.getSelectedAtoms() : this.jsd.m.atoms;
            for (var i = 0; i < atoms.length; ++i) {
                if (atoms[i].bio != null && aaid == atoms[i]._aaid && (monomertype == "" || monomertype == atoms[i].biotype())) {
                    if (this.setNodeType(atoms[i].elem, atoms[i].biotype(), a2))
                        ++n;
                    break;
                }
            }
        }
        else {
            n = this.replaceMonomer(monomertype, a, a2, selectedonly);
        }

        if (n > 0) {
            this.jsd.pushundo(cloned);
            this.jsd.refresh(true);
        }

        scil.Utils.alert(n + " node(s) replaced");
    },

    dblclickMomonor: function (type, monomer) {
        if (monomer == "null")
            return;

        var list = [];
        var atoms = this.jsd.m.atoms;
        for (var i = 0; i < atoms.length; ++i) {
            if (atoms[i].selected && atoms[i].biotype() == type && atoms[i].elem != monomer)
                list.push(atoms[i]);
        }

        if (list.length > 0) {
            this.jsd.pushundo();
            for (var i = 0; i < list.length; ++i)
                this.setNodeType(list[i], list[i].biotype(), monomer);
            this.jsd.refresh(true);
        }

        return list.length;
    },

    isHelmCmd: function (cmd) {
        return cmd == "helm_nucleotide" || cmd == "helm_base" || cmd == "helm_sugar" || cmd == "helm_chem" || cmd == "helm_aa" || cmd == "helm_linker";
    },

    createIsolatedMonomer: function (cmd, a) {
        if (cmd == "helm_nucleotide") {
            var m = this.getDefaultNodeType(org.helm.webeditor.HELM.SUGAR);
            this.setNodeType(a, org.helm.webeditor.HELM.SUGAR, m);

            if (org.helm.webeditor.Monomers.hasR(org.helm.webeditor.HELM.SUGAR, m, "R3")) {
                var a3 = this.addNode(org.helm.webeditor.Interface.createPoint(a.p.x, a.p.y + this.jsd.bondlength * org.helm.webeditor.bondscale), org.helm.webeditor.HELM.BASE, this.getDefaultNodeType(org.helm.webeditor.HELM.BASE));
                this.addBond(a, a3, 3, 1);
            }

            var linker = this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER);
            if (linker == null || linker == "null")
                return;

            var a2 = this.addNode(org.helm.webeditor.Interface.createPoint(a.p.x + this.jsd.bondlength * org.helm.webeditor.bondscale, a.p.y), org.helm.webeditor.HELM.LINKER, linker);
            this.addBond(a, a2, 2, 1);
        }
        else if (cmd == "helm_base") {
            this.setNodeType(a, org.helm.webeditor.HELM.BASE, this.getDefaultNodeType(org.helm.webeditor.HELM.BASE));
        }
        else if (cmd == "helm_sugar") {
            this.setNodeType(a, org.helm.webeditor.HELM.SUGAR, this.getDefaultNodeType(org.helm.webeditor.HELM.SUGAR));
        }
        else if (cmd == "helm_linker") {
            this.setNodeType(a, org.helm.webeditor.HELM.LINKER, this.getDefaultNodeType(org.helm.webeditor.HELM.LINKER));
        }
        else if (cmd == "helm_aa") {
            this.setNodeType(a, org.helm.webeditor.HELM.AA, this.getDefaultNodeType(org.helm.webeditor.HELM.AA));
        }
        else if (cmd == "helm_chem") {
            this.setNodeType(a, org.helm.webeditor.HELM.CHEM, this.getDefaultNodeType(org.helm.webeditor.HELM.CHEM));
        }
        else {
            return false;
        }

        return true;
    }
});
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* Chain class
* @class org.helm.webeditor.Chain
*/
org.helm.webeditor.Chain = scil.extend(scil._base, {
    constructor: function (id) {
        this.id = id;
        this.bonds = [];
        this.atoms = [];
        this.basebonds = [];
        this.bases = [];
    },

    getComplementary: function(a) {
        var m = org.helm.webeditor.Monomers.getMonomer(a);
        switch (m.na) {
            case "A":
                return "T";
            case "G":
                return "C";
            case "T":
            case "U":
                return "A";
            case "C":
                return "G";
            default:
                return "U";
        }
    },

    makeComplementaryStrand: function (m, bondlength) {
        var n = 0;
        var lasta2 = null;
        var lastsugar = null;
        var d = bondlength * org.helm.webeditor.bondscale;
        for (var i = 0; i < this.atoms.length; ++i) {
            var a = this.atoms[i];
            var b = this.bases[i];

            var a2 = a.clone();
            a2.p.y += 3 * d;
            a2.bio.annotation = null;
            m.addAtom(a2);
            if (b != null) {
                var b2 = b.clone();
                b2.p.y += d;
                b2.elem = this.getComplementary(b);
                m.addAtom(b2);

                var bond = new JSDraw2.Bond(a2, b2);
                bond.r1 = 3;
                bond.r2 = 1;
                m.addBond(bond);

                bond = new JSDraw2.Bond(b, b2, JSDraw2.BONDTYPES.UNKNOWN);
                m.addBond(bond);
            }

            if (lasta2 != null) {
                var bond = new JSDraw2.Bond(lasta2, a2);
                bond.r1 = 1;
                bond.r2 = 2;
                m.addBond(bond);
            }

            lasta2 = a2;
            if (a2.biotype() == org.helm.webeditor.HELM.SUGAR) {
                lastsugar = a2;
                a2.elem = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.SUGAR);
            }
            else if (a2.biotype() == org.helm.webeditor.HELM.LINKER) {
                a2.elem = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.LINKER);
            }
            ++n;
        }

        if (lastsugar != null)
            lastsugar.bio.annotation = "5'";

        return n > 0;
    },

    _getPolymers: function() {
        var ret = [];

        var polymer = null;
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            var a = this.atoms[i];
            var biotype = a.biotype();
            if (biotype == org.helm.webeditor.HELM.AA) {
                if (polymer != null && polymer.type != "Peptide")
                    polymer = null;

                if (polymer == null) {
                    polymer = { type: "Peptide", atoms: [] };
                    ret.push(polymer);
                }
                polymer.atoms.push(a);
            }
            else if (biotype == org.helm.webeditor.HELM.SUGAR || biotype == org.helm.webeditor.HELM.HELM_LINKER) {
                if (polymer != null && polymer.type != "RNA")
                    polymer = null;

                if (biotype == org.helm.webeditor.HELM.SUGAR) {
                    var b = this.bases[i];
                    if (b != null) {
                        if (polymer == null) {
                            polymer = { type: "RNA", atoms: [] };
                            ret.push(polymer);
                        }
                        polymer.atoms.push(b);
                    }
                }
            }
            else {
                polymer = null;
            }
        }

        return ret;
    },

    getMol: function(a, plugin) {
        var mon = org.helm.webeditor.Monomers.getMonomer(a);
        var molfile = org.helm.webeditor.monomers.getMolfile(mon);
        var m = org.helm.webeditor.Interface.createMol(molfile);

        if (plugin != null) {
            for (var r in mon.at) {
                if (plugin.hasSpareR(a, r))
                    org.helm.webeditor.MolViewer.capRGroup(m, r, mon);
            }
        }

        return m;
    },

    expand: function (plugin, branches) {
        var m1 = null;
        var m2 = null;
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            var a = this.atoms[i];
            var b = this.bases[i];

            m2 = this.getMol(a, plugin);

            if (b != null) {
                var m3 = this.getMol(b, plugin);
                org.helm.webeditor.MolViewer.mergeMol(m2, "R3", m3, "R1");
            }

            if (m1 == null) {
                m1 = m2;
            }
            else {
                var r1, r2;
                var bond = this.bonds[i - 1];
                if (bond.a2 == a) {
                    r2 = bond.r2;
                    r1 = bond.r1;
                }
                else {
                    r2 = bond.r1;
                    r1 = bond.r2;
                }

                org.helm.webeditor.MolViewer.mergeMol(m1, "R" + r1, m2, "R" + r2);
            }
        }

        if (branches != null) {
            for (var i = 0; i < n; ++i) {
                var a = this.atoms[i];
                this.connectBranches(m1, a, branches, plugin)
            }
        }

        return m1;
    },

    connectBranches: function(m, a, branches, plugin) {
        if (branches == null || branches.bonds == null)
            return;

        var r1 = null;
        var r2 = null;
        var a2 = null;
        for (var i = 0; i < branches.bonds.length; ++i) {
            var b = branches.bonds[i];
            if (b.a1 == a) {
                r1 = b.r1;
                r2 = b.r2;
                a2 = b.a2;
            }
            else if (b.a2 == a) {
                r1 = b.r2;
                r2 = b.r1;
                a2 = b.a1;
            }

            if (a2 != null)
                break;
        }

        if (a2 == null)
            return;

        var m2 = this.getMol(a2, plugin);
        org.helm.webeditor.MolViewer.mergeMol(m, "R" + r1, m2, "R" + r1);
    },

    isCircle: function () {
        return this.atoms.length >=3 && this.atoms[0] == this.atoms[this.atoms.length - 1];
    },

    resetIDs: function () {
        var aaid = 0;
        var baseid = 0;

        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            var a = this.atoms[i];
            var biotype = a.biotype();
            if (biotype == org.helm.webeditor.HELM.AA) {
                a.bio.id = ++aaid;
                if (aaid == 1)
                    a.bio.annotation = "n";
                else
                    a.bio.annotation = null;
                baseid = 0;
            }
            else if (biotype == org.helm.webeditor.HELM.SUGAR || biotype == org.helm.webeditor.HELM.LINKER) {
                if (biotype == org.helm.webeditor.HELM.SUGAR && this.bases[i] != null) {
                    this.bases[i].bio.id = ++baseid;
                    if (baseid == 1) {
                        if (a.bio.annotation != "5'ss" && a.bio.annotation != "5'as")
                            a.bio.annotation = "5'";
                    }
                    else {
                        a.bio.annotation = null;
                    }
                }
                aaid = 0;
            }
            else {
                aaid = 0;
                baseid = 0;
            }
        } 
    },

    setFlag: function(f) {
        for (var i = 0; i < this.atoms.length; ++i)
            this.atoms[i].f = f;
        for (var i = 0; i < this.bonds.length; ++i)
            this.bonds[i].f = f;
    },

    containsAtom: function(a) {
        return scil.Utils.indexOf(this.atoms, a) != -1;
    },

    layoutLine: function (bondlength) {
        var rect = this.getRect();

        var delta = org.helm.webeditor.bondscale * bondlength;
        var a = this.atoms[0];
        a.p = org.helm.webeditor.Interface.createPoint(rect.left, rect.top);
        for (var i = 1; i < this.atoms.length; ++i) {
            var p = a.p;
            a = this.atoms[i];
            a.p = org.helm.webeditor.Interface.createPoint(p.x + delta, p.y);
        }
    },

    layoutCircle: function (bondlength) {
        org.helm.webeditor.Layout.layoutCircle(this.atoms, bondlength, 0);
        //var delta = org.helm.webeditor.bondscale * bondlength;
        //var deg = 360 / (this.atoms.length - 1);
        //var radius = (delta / 2) / Math.sin((deg / 2) * Math.PI / 180);

        //var a = this.atoms[0];
        //a.p = org.helm.webeditor.Interface.createPoint(origin.x + radius, origin.y);
        //for (var i = 1; i < this.atoms.length - 1; ++i)
        //    this.atoms[i].p = this.atoms[i - 1].p.clone().rotateAround(origin, -deg);
    },

    rotate: function(deg) {
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            this.atoms[i].p.rotate(deg);
            var a = this.bases[i];
            if (a != null)
                a.p.rotate(deg);
        }
    },
  
    move: function (delta) {
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            this.atoms[i].p.offset2(delta);
            var a = this.bases[i];
            if (a != null)
                a.p.offset2(delta);
        }
    },
  
    layoutBases: function () {
        var circle = this.isCircle();
        var n = circle ? this.atoms.length - 1 : this.atoms.length;
        for (var i = 0; i < n; ++i) {
            var a = this.bases[i];
            if (a == null)
                continue;

            var center = this.atoms[i];
            var b1 = null;
            var b2 = null;
            if (i == 0) {
                if (circle)
                    b1 = this.bonds[this.bonds.length - 1];
                b2 = this.bonds[i];
            }
            else {
                b1 = this.bonds[i - 1];
                b2 = this.bonds[i];
            }

            if (b1 != null && b2 != null) {
                var a1 = b1.a1 == center ? b1.a2 : b1.a1;
                var a2 = b2.a1 == center ? b2.a2 : b2.a1;

                var ang = center.p.angleAsOrigin(a1.p, a2.p);
                if (Math.abs(ang - 180) > 10)
                    a.p = a1.p.clone().rotateAround(center.p, 180 + ang / 2);
                else
                    a.p = a1.p.clone().rotateAround(center.p, -90);
            }
            else if (b1 != null) {
                var a1 = b1.a1 == center ? b1.a2 : b1.a1;
                a.p = a1.p.clone().rotateAround(center.p, -90);
            }
            else if (b2 != null) {
                var a2 = b2.a1 == center ? b2.a2 : b2.a1;
                a.p = a2.p.clone().rotateAround(center.p, 90);
            }
        }
    },

    getRect: function () {
        return org.helm.webeditor.Layout.getRect(this.atoms);
    },

    getSequence: function (highlightselection) {
        var s = "";
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        var lastbt = null;
        for (var i = 0; i < n; ++i) {
            var a = this.atoms[i];
            var bt = a.biotype();
            if (bt == org.helm.webeditor.HELM.AA)
            {
                var mon = org.helm.webeditor.Monomers.getMonomer(a);
                if (mon != null) {
                    if (lastbt != org.helm.webeditor.HELM.AA) {
                        if (s.length > 0 && s.substr(s.length - 1) != "-")
                            s += "-";
                    }
                    var c = scil.Utils.isNullOrEmpty(mon.na) ? "?" : mon.na;
                    if (highlightselection && a.selected)
                        c = "<span style='background:#bbf;'>" + c + "</span>";
                    s += c;
                }
            }
            else if (bt == org.helm.webeditor.HELM.SUGAR) {
                var b = this.bases[i];
                var mon = org.helm.webeditor.Monomers.getMonomer(b);
                if (mon != null) {
                    if (lastbt != org.helm.webeditor.HELM.SUGAR && lastbt != org.helm.webeditor.HELM.LINKER) {
                        if (s.length > 0 && s.substr(s.length - 1) != "-")
                            s += "-";
                    }
                    var c = scil.Utils.isNullOrEmpty(mon.na) ? "?" : mon.na;
                    if (highlightselection && b.selected)
                        c = "<span style='background:#bbf;'>" + c + "</span>";
                    s += c;
                }
            }
            lastbt = bt;
        }

        return s;
    },

    getHelm: function (ret, highlightselection) {
        var sequence = "";
        var aaid = 0;
        var firstseqid = null;
        var lastseqid = null;
        var n = this.isCircle() ? this.atoms.length - 1 : this.atoms.length;
        var chn = [];
        var lastbt = null;
        for (var i = 0; i < n; ++i) {
            var a = this.atoms[i];

            var bt = a.biotype();

            if (bt == org.helm.webeditor.HELM.LINKER || bt == org.helm.webeditor.HELM.SUGAR)
                bt = org.helm.webeditor.HELM.BASE;
            if (bt != lastbt || bt == org.helm.webeditor.HELM.CHEM) {
                var seqid = null;
                if (bt == org.helm.webeditor.HELM.BASE)
                    seqid = "RNA";
                else if (bt == org.helm.webeditor.HELM.AA)
                    seqid = "PEPTIDE";
                else if (bt == org.helm.webeditor.HELM.CHEM)
                    seqid = "CHEM";
                seqid = seqid + (++ret.chainid[seqid]);

                if (i == 0 && a.biotype() == org.helm.webeditor.HELM.SUGAR) {
                    if (a.bio.annotation == "5'ss")
                        ret.annotations.push(seqid + "{ss}");
                    else if (a.bio.annotation == "5'as")
                        ret.annotations.push(seqid + "{as}");
                }

                if (i > 0) {
                    var b = this.bonds[i - 1];
                    var r1 = b.a1 == a ? b.r2 : b.r1;
                    var r2 = b.a1 == a ? b.r1 : b.r2;

                    a._aaid = 1;
                    if (b.a1 == a)
                        conn = b.a2._aaid + ":R" + r2 + "-" + b.a1._aaid + ":R" + r1;
                    else
                        conn = b.a1._aaid + ":R" + r1 + "-" + b.a2._aaid + ":R" + r2;
                    if (lastseqid != null) {
                        ret.connections.push(lastseqid + "," + seqid + "," + conn);
                        ret.sequences[lastseqid] = sequence;
                        ret.chains[lastseqid] = chn;
                    }
                }

                if (firstseqid == null)
                    firstseqid = seqid;

                chn = [];
                aaid = 0;
                sequence = "";
                lastseqid = seqid;
                lastbt = bt;
            }

            a._aaid = ++aaid;
            chn.push(a);

            if (aaid > 1 && !(i > 0 && a.biotype() == org.helm.webeditor.HELM.LINKER && this.atoms[i - 1].biotype() == org.helm.webeditor.HELM.SUGAR))
                sequence += ".";
            sequence += org.helm.webeditor.IO.getCode(a, highlightselection);

            if (this.bases[i] != null) {
                var b = this.bases[i];
                sequence += org.helm.webeditor.IO.getCode(b, highlightselection, true);
                b._aaid = ++aaid;
                chn.push(b);
            }
        }

        if (sequence != null) {
            ret.sequences[lastseqid] = sequence;
            ret.chains[lastseqid] = chn;
        }

        if (this.isCircle()) {
            var b = this.bonds[this.bonds.length - 1];
            // RNA1,RNA1,1:R1-21:R2
            var conn;
            if (this.atoms[0] == b.a1)
                conn = b.a1._aaid + ":R" + b.r1 + "-" + b.a2._aaid + ":R" + b.r2;
            else
                conn = b.a2._aaid + ":R" + b.r2 + "-" + b.a1._aaid + ":R" + b.r1;
            ret.connections.push(firstseqid + "," + lastseqid + "," + conn);
        }
    },

    getAtomByAAID: function (aaid) {
        if (!(aaid > 0))
            return null;

        for (var i = 0; i < this.atoms.length; ++i) {
            if (this.atoms[i]._aaid == aaid)
                return this.atoms[i];
        }
        for (var i = 0; i < this.bases.length; ++i) {
            if (this.bases[i]._aaid == aaid)
                return this.bases[i];
        }
        
        return null;
    }
});

scil.apply(org.helm.webeditor.Chain, {
    getChain: function (m, startatom) {
        if (startatom == null)
            return null;
        var chains = this._getChains(m, startatom);
        return chains == null ? null : chains[0];
    },

    getChains: function (m, branchcollection) {
        return this._getChains(m, null, branchcollection);
    },

    _getChains: function (m, startatom, branchcollection) {
        var b0 = null;
        var bonds = [];
        var branches = [];
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.r1 == 1 && b.r2 == 2 || b.r1 == 2 && b.r2 == 1) {
                bonds.push(b);
                if (b0 == null && startatom != null && b.a1 == startatom || b.a2 == startatom)
                    b0 = bonds.length - 1;
            }
            else {
                branches.push(b);
            }
        }

        if (startatom != null && b0 == null)
            return null;

        var chains = [];
        while (bonds.length > 0) {
            var chain = new org.helm.webeditor.Chain();
            chains.splice(0, 0, chain);

            var b = null;
            if (b0 == null) {
                b = bonds[bonds.length - 1];
                bonds.splice(bonds.length - 1, 1);
            }
            else {
                b = bonds[b0];
                bonds.splice(b0, 1);
                b0 = null;
            }
            
            var head = b.r1 == 2 ? b.a1 : b.a2;
            var tail = b.r2 == 1 ? b.a2 : b.a1;

            chain.bonds.push(b);
            chain.atoms.push(head);
            chain.atoms.push(tail);

            while (bonds.length > 0) {
                var found = 0;
                for (var i = bonds.length - 1; i >= 0; --i) {
                    b = bonds[i];
                    if (b.a1 == head || b.a2 == head) {
                        bonds.splice(i, 1);
                        head = b.a1 == head ? b.a2 : b.a1;
                        chain.bonds.splice(0, 0, b);
                        chain.atoms.splice(0, 0, head);

                        ++found;
                    }
                    else if (b.a1 == tail || b.a2 == tail) {
                        bonds.splice(i, 1);
                        tail = b.a1 == tail ? b.a2 : b.a1;
                        chain.bonds.push(b);
                        chain.atoms.push(tail);

                        ++found;
                    }
                }

                if (found == 0)
                    break;
            }

            if (startatom != null)
                break;
        }

        m.clearFlag();
        for (var i = 0; i < chains.length; ++i) {
            var atoms = chains[i].atoms;
            for (var k = 0; k < atoms.length; ++k)
                atoms[k].f = true;
        }

        if (startatom == null) {
            var atoms = m.atoms;
            for (var k = 0; k < atoms.length; ++k) {
                var a = atoms[k];
                if (a.f)
                    continue;

                if (a.biotype() == org.helm.webeditor.HELM.AA || a.biotype() == org.helm.webeditor.HELM.SUGAR) {
                    a.f = true;
                    var chain = new org.helm.webeditor.Chain();
                    chains.splice(0, 0, chain);
                    chain.atoms.push(a);
                }
            }
        }

        for (var i = 0; i < chains.length; ++i) {
            var atoms = chains[i].atoms;
            var bonds = chains[i].bonds;

            if (chains[i].isCircle()) {
                // rotate circle if the first atom is a linker (P)
                if (atoms[0].biotype() == org.helm.webeditor.HELM.LINKER && atoms[1].biotype() == org.helm.webeditor.HELM.SUGAR) {
                    atoms.splice(0, 1);
                    atoms.push(atoms[0]);

                    bonds.push(bonds[0]);
                    bonds.splice(0, 1);
                }

                // rotate if RNA/PEPTIDE/CHEM circle
                for (var j = 0; j < atoms.length - 1; ++j) {
                    var bt1 = atoms[j].biotype();
                    if (bt1 == org.helm.webeditor.HELM.LINKER)
                        bt1 = org.helm.webeditor.HELM.SUGAR;

                    var bt2 = atoms[j + 1].biotype();
                    if (bt2 == org.helm.webeditor.HELM.LINKER)
                        bt2 = org.helm.webeditor.HELM.SUGAR;

                    if (bt1 != bt2) {
                        for (var k = 0; k <= j; ++k) {
                            atoms.splice(0, 1);
                            atoms.push(atoms[0]);

                            bonds.push(bonds[0]);
                            bonds.splice(0, 1);
                        }
                        break;
                    }
                }
            }

            // detect bases
            for (var k = 0; k < atoms.length; ++k) {
                var a = atoms[k];
                if (a.biotype() == org.helm.webeditor.HELM.SUGAR) {
                    for (var j = branches.length - 1; j >= 0; --j) {
                        var at = null;
                        var b = branches[j];
                        if (b.a1 == a && b.r1 == 3 && b.r2 == 1 && b.a2.biotype() == org.helm.webeditor.HELM.BASE)
                            at = chains[i].bases[k] = b.a2;
                        else if (b.a2 == a && b.r2 == 3 && b.r1 == 1 && b.a1.biotype() == org.helm.webeditor.HELM.BASE)
                            at = chains[i].bases[k] = b.a1;

                        if (at != null) {
                            chains[i].basebonds.push(b);
                            branches.splice(j, 1);
                            at.f = true;
                        }
                    }
                }
            }
        }

        if (branchcollection != null) {
            var list = [];
            for (var i = 0; i < branches.length; ++i) {
                var b = branches[i];
                if (!b.a1.f) {
                    b.a1.f = true;
                    list.push(b.a1);
                }
                if (!b.a2.f) {
                    b.a2.f = true;
                    list.push(b.a2);
                }
            }

            branchcollection.bonds = branches;
            branchcollection.atoms = list;
        }

        return chains;
    }
});﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* Layout class
* @class org.helm.webeditor.Layout
*/
org.helm.webeditor.Layout = {
    clean: function (m, bondlength, a) {
        //m.clearFlag();
        var chains = org.helm.webeditor.Chain._getChains(m, a);

        this._removeChainID(m.atoms);
        for (var i = 0; i < chains.length; ++i) {
            var chain = chains[i];

            // set chain id
            for (var k = 0; k < chain.atoms.length; ++k) {
                chain.atoms[k]._chainid = i;
                if (chain.bases[k] != null)
                    chain.bases[k]._chainid = i;
            }

            if (chain.isCircle()) {
                chain.layoutCircle(bondlength);
            }
            else {
                if (!this.layoutInnerCircle(chain, bondlength, m, i))
                    chain.layoutLine(bondlength);
            }
            chain.layoutBases();

            //chain.setFlag(true);
            chain.resetIDs();
        }

        this.layoutCrossChainBonds(m, chains, bondlength);
        //this.layoutBranches(m);

        // clear chain id
        this._removeChainID(m.atoms);
    },

    resetIDs: function(m) {
        var chains = org.helm.webeditor.Chain._getChains(m);
        for (var i = 0; i < chains.length; ++i)
            chains[i].resetIDs();
    },

    _removeChainID: function(atoms) {
        for (var i = 0; i < atoms.length; ++i)
            delete atoms[i]._chainid;
    },

    layoutInnerCircle: function (chain, bondlength, m, chainid) {
        var pairs = [];
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.a1._chainid != null && b.a2._chainid != null && b.a1._chainid == chainid && b.a2._chainid == chainid && scil.Utils.indexOf(chain.bonds, b) < 0 && scil.Utils.indexOf(chain.basebonds, b) < 0) {
                var ai1 = scil.Utils.indexOf(chain.atoms, b.a1);
                var ai2 = scil.Utils.indexOf(chain.atoms, b.a2);
                var p1 = { a1: ai1 < ai2 ? ai1 : ai2, a2: ai1 < ai2 ? ai2 : ai1 };
                pairs.push(p1);
            }
        }

        if (pairs.length == 0)
            return false;

        // find the biggest circle
        var pair = pairs[0];
        for (var i = 1; i < pairs.length; ++i) {
            var r = pairs[i];
            if (r.a1 >= pair.a1 && r.a1 <= pair.a2 && r.a1 >= pair.a1 && r.a1 <= pair.a2) {
                pair = r;
            }
            else if (pair.a1 < r.a1 || pair.a1 > r.a2 || pair.a2 < r.a1 || pair.a2 > r.a2) {
                if (r.a2 - r.a1 > pair.a2 - pair.a1)
                    pair = r;
            }
        }

        var atoms = [];
        for (var i = pair.a1; i <= pair.a2; ++i)
            atoms.push(chain.atoms[i]);
        atoms.push(atoms[0]);
        this.layoutCircle(atoms, bondlength, -360 / (atoms.length - 1) / 2);

        var delta = org.helm.webeditor.bondscale * bondlength;
        var p = chain.atoms[pair.a1].p.clone();
        for (var i = pair.a1 - 1; i >= 0; --i) {
            p.x += delta;
            chain.atoms[i].p = p.clone();
        }

        p = chain.atoms[pair.a2].p.clone();
        for (var i = pair.a2 + 1; i < chain.atoms.length; ++i) {
            p.x += delta;
            chain.atoms[i].p = p.clone();
        }

        return true;
    },

    layoutCircle: function(atoms, bondlength, startdeg) {
        var rect = this.getRect(atoms);
        var origin = rect.center();
        
        var delta = org.helm.webeditor.bondscale * bondlength;
        var deg = 360 / (atoms.length - 1);
        var radius = (delta / 2) / Math.sin((deg / 2) * Math.PI / 180);

        var a = atoms[0];
        a.p = org.helm.webeditor.Interface.createPoint(origin.x + radius, origin.y);
        if (startdeg != null && startdeg != 0)
            a.p.rotateAround(origin, startdeg);

        for (var i = 1; i < atoms.length - 1; ++i)
            atoms[i].p = atoms[i - 1].p.clone().rotateAround(origin, -deg);
    },

    layoutCrossChainBonds: function (m, chains, bondlength) {
        var fixed = {};
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.a1._chainid != null && b.a2._chainid != null && b.a1._chainid != b.a2._chainid) {
                var a1, a2;
                if (fixed[b.a1._chainid] && fixed[b.a2._chainid]) {
                    continue;
                }
                else if (fixed[b.a1._chainid]) {
                    a1 = b.a1;
                    a2 = b.a2;
                }
                else if (fixed[b.a2._chainid]) {
                    a1 = b.a2;
                    a2 = b.a1;
                }
                else if (b.a1._chainid > b.a2._chainid) {
                    a1 = b.a2;
                    a2 = b.a1;
                }
                else {
                    a1 = b.a1;
                    a2 = b.a2;
                }

                if (b.type == JSDraw2.BONDTYPES.UNKNOWN) {
                    // hydrogen bond
                    var chain = chains[a2._chainid];
                    chain.rotate(180);

                    var delta = a1.p.clone().offset(0, bondlength * org.helm.webeditor.bondscale).offset(-a2.p.x, -a2.p.y);
                    chain.move(delta);
                }
                else {
                    var delta = a1.p.clone().offset(0, bondlength * 3).offset(-a2.p.x, -a2.p.y);
                    chains[a2._chainid].move(delta);
                }

                fixed[a1._chainid] = true;
                fixed[a2._chainid] = true;
            }
        }
    },

    layoutBranches: function (m) {
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (!b.f && b.a1.f != b.a2.f) {
                var center = b.a1.f ? b.a1 : b.a2;
                var a = b.a1.f ? b.a2 : b.a1;

                var b1 = null;
                var b2 = null;
                var bonds = m.getNeighborBonds(center);
                for (var k = bonds.length - 1; k >= 0; --k) {
                    var n = bonds[k];
                    if (n.f) {
                        if (b1 == null && n.a1 == center && n.r1 == 2 || n.a2 == center && n.r2 == 2) {
                            b1 = n;
                            bonds.splice(i, 0);
                        }
                        else if (b2 == null && n.a1 == center && n.r1 == 1 || n.a2 == center && n.r2 == 1) {
                            b2 = n;
                            bonds.splice(i, 0);
                        }
                    }
                }

                if (b1 != null && b2 != null) {
                    var a1 = b1.a1 == center ? b1.a2 : b1.a1;
                    var a2 = b2.a1 == center ? b2.a2 : b2.a1;

                    var ang = center.p.angleAsOrigin(a1.p, a2.p);
                    if (Math.abs(ang - 180) > 10)
                        a.p = a1.p.clone().rotateAround(center.p, ang / 2);
                    else
                        a.p = a1.p.clone().rotateAround(center.p, 90);
                }
                else if (b1 != null) {
                    var a1 = b1.a1 == center ? b1.a2 : b1.a1;
                    a.p = a1.p.clone().rotateAround(center.p, 90);
                }
                else if (b2 != null) {
                    var a2 = b2.a1 == center ? b2.a2 : b2.a1;
                    a.p = a2.p.clone().rotateAround(center.p, -90);
                }

                if (b1 != null || b2 != null)
                    b.f = b.a1.f = b.a2.f = true;
            }
        }
    },

    getRect: function (atoms) {
        var a = atoms[0];
        var x1 = a.p.x;
        var y1 = a.p.y;
        var x2 = x1;
        var y2 = y1;

        for (var i = 1; i < atoms.length; ++i) {
            var p = atoms[i].p;
            if (p.x < x1)
                x1 = p.x;
            else if (p.x > x2)
                x2 = p.x;
            if (p.y < y1)
                y1 = p.y;
            else if (p.y > y2)
                y2 = p.y;
        }

        return org.helm.webeditor.Interface.createRect(x1, y1, x2 - x1, y2 - y1);
    }
};
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* IO class
* @class org.helm.webeditor.IO
*/
org.helm.webeditor.IO = {
    getHelm: function (m, highlightselection) {
        var branches = {};
        var chains = org.helm.webeditor.Chain.getChains(m, branches);

        for (var i = 0; i < m.atoms.length; ++i)
            m.atoms[i]._aaid = null;

        var ret = { chainid: { RNA: 0, PEPTIDE: 0, CHEM: 0 }, sequences: {}, connections: [], chains: {}, annotations: [] };
        for (var i = 0; i < chains.length; ++i) {
            var chain = chains[i];
            chain.getHelm(ret, highlightselection);
        }

        for (var i = 0; i < branches.atoms.length; ++i) {
            var a = branches.atoms[i];
            if (a.biotype() != org.helm.webeditor.HELM.CHEM) {
                // error
                return null;
            }

            var id = "CHEM" + (++ret.chainid.CHEM);
            ret.sequences[id] = this.getCode(a, highlightselection);
            ret.chains[id] = [a];
            a._aaid = 1;
        }

        var pairs = [];
        // RNA1,RNA2,5:pair-11:pair
        for (var i = 0; i < branches.bonds.length; ++i) {
            var b = branches.bonds[i];
            if (b.type == JSDraw2.BONDTYPES.UNKNOWN) {
                var c1 = this.findChainID(ret.chains, b.a1);
                var c2 = this.findChainID(ret.chains, b.a2);
                var s = c1 + "," + c2 + "," + b.a1._aaid + ":pair-" + b.a2._aaid + ":pair";
                pairs.push(s);
            }
            else {
                var c1 = this.findChainID(ret.chains, b.a1);
                var c2 = this.findChainID(ret.chains, b.a2);
                var s = c1 + "," + c2 + "," + b.a1._aaid + ":R" + b.r1 + "-" + b.a2._aaid + ":R" + b.r2;
                ret.connections.push(s);
            }
        }

        var s = "";
        for (var k in ret.sequences)
            s += (s == "" ? "" : "|") + k + "{" + ret.sequences[k] + "}";

        if (s == "")
            return s;

        s += "$";
        for (var i = 0; i < ret.connections.length; ++i)
            s += (i > 0 ? "|" : "") + ret.connections[i];

        s += "$";
        for (var i = 0; i < pairs.length; ++i)
            s += (i > 0 ? "|" : "") + pairs[i];

        s += "$";

        //RNA1{R(C)P.R(A)P.R(T)}$$$RNA1{ss}$
        for (var i = 0; i < ret.annotations.length; ++i)
            s += (i > 0 ? "|" : "") + ret.annotations[i];

        s += "$";
        return s;
    },

    getSequence: function(m, highlightselection) {
        var branches = {};
        var chains = org.helm.webeditor.Chain.getChains(m, branches);
        if (chains == null)
            return null;

        var s = "";
        for (var i = 0; i < chains.length; ++i) {
            var s2 = chains[i].getSequence(highlightselection);
            if (scil.Utils.isNullOrEmpty(s2))
                continue;
            if (s != "")
                s += "\r\n";
            s += s2;
        }

        return s;
    },

    getXHelm: function (m) {
        var s = this.getHelm(m);
        if (scil.Utils.isNullOrEmpty(s))
            return s;

        var s = "<Xhelm>\n<HelmNotation>" + scil.Utils.escXmlValue(s) + "</HelmNotation>\n";

        var list = this.getMonomers(m);
        if (list != null) {
            s += "<Monomers>\n";
            for (var i in list)
                s += org.helm.webeditor.Monomers.writeOne(list[i]);
            s += "</Monomers>\n";
        }
        s += "</Xhelm>";
        return s;
    },

    getMonomers: function (m) {
        var ret = {};
        var atoms = m.atoms;
        for (var i = 0; i < atoms.length; ++i) {
            var a = atoms[i];
            var biotype = a.biotype();
            if (!org.helm.webeditor.isHelmNode(a))
                continue;

            var m = org.helm.webeditor.Monomers.getMonomer(a);
            var t = biotype + " " + a.elem;
            if (ret[t] == null) {
                var type = null;
                var mt = null;
                if (biotype == org.helm.webeditor.HELM.CHEM) {
                    type = "CHEM";
                    mt = "Undefined"
                }
                else if (biotype == org.helm.webeditor.HELM.AA) {
                    type = "PEPTIDE";
                    mt = "Undefined"
                }
                else if (biotype == org.helm.webeditor.HELM.SUGAR) {
                    type = "RNA";
                    mt = "Backbone"
                }
                else if (biotype == org.helm.webeditor.HELM.BASE) {
                    type = "RNA";
                    mt = "Branch"
                }
                else if (biotype == org.helm.webeditor.HELM.LINKER) {
                    type = "RNA";
                    mt = "Backbone"
                }
                ret[t] = { id: a.elem, mt: mt, type: type, m: m };
            }
        }

        return ret;
    },

    getCode: function (a, highlightselection, bracket) {
        var s = typeof(a) == "string" ? a : a.elem;
        if (s.length > 1)
            s = "[" + s + "]";
        if (bracket)
            s = "(" + s + ")";
        if (highlightselection && a.selected)
            s = "<span style='background:#bbf;'>" + s + "</span>";
        return s;
    },

    findChainID: function (chains, a) {
        for (var k in chains) {
            var atoms = chains[k];
            if (scil.Utils.indexOf(atoms, a) >= 0)
                return k;
        }
        return null;
    },

    read: function (plugin, s, format, renamedmonomers, sugar, linker) {
        if (scil.Utils.isNullOrEmpty(s))
            return 0;

        if (scil.Utils.isNullOrEmpty(format)) {
            if (/^((RNA)|(PEPTIDE)|(CHEM))[0-9]+/.test(s))
                format = "HELM";
            else if (/^[A|G|T|C|U]+[>]?$/.test(s))
                format = "RNA";
            else if (/^[A|C-I|K-N|P-T|V|W|Y|Z]+[>]?$/.test(s))
                format = "Peptide";
            else
                throw "Cannot detect the format using nature monomer names";
        }

        var origin = org.helm.webeditor.Interface.createPoint(0, 0);
        if (format == "HELM") {
            return this.parseHelm(plugin, s, origin, renamedmonomers);
        }
        else if (format == "Peptide") {
            var chain = new org.helm.webeditor.Chain();
            var ss = this.splitChars(s);
            return this.addAAs(plugin, ss, chain, origin);
        }
        else if (format == "RNA") {
            var chain = new org.helm.webeditor.Chain();
            var ss = this.splitChars(s);
            return this.addRNAs(plugin, ss, chain, origin, sugar, linker);
        }

        return 0;
    },

    parseHelm: function (plugin, s, origin, renamedmonomers) {
        var n = 0;
        var p = s.indexOf("$");
        var conn = s.substr(p + 1);

        // sequence
        s = s.substr(0, p);
        var chains = {};
        var seqs = s.split('|');
        for (var i = 0; i < seqs.length; ++i) {
            s = seqs[i];
            p = s.indexOf("{");
            var sid = s.substr(0, p);
            var type = sid.replace(/[0-9]+$/, "");
            var id = parseInt(sid.substr(type.length));

            var chain = new org.helm.webeditor.Chain(sid);
            chains[sid] = chain;
            chain.type = type;

            s = s.substr(p + 1);
            p = s.indexOf('}');
            s = s.substr(0, p);

            var n2 = 0;
            var ss = s.split('.');
            if (type == "PEPTIDE")
                n2 = this.addAAs(plugin, ss, chain, origin, renamedmonomers);
            else if (type == "RNA")
                n2 = this.addHELMRNAs(plugin, ss, chain, origin, renamedmonomers);
            else if (type == "CHEM")
                n2 = this.addChem(plugin, s, chain, origin, renamedmonomers);

            if (n2 > 0) {
                n += n2;
                origin.y += 4 * plugin.jsd.bondlength;
            }
        }

        // connection
        var remained = null;
        p = conn.indexOf("$");
        if (p >= 0) {
            s = conn.substr(0, p);
            remained = conn.substr(p + 1);
            var ss = s == "" ? [] : s.split('|');

            // RNA1,RNA1,1:R1-21:R2
            for (var i = 0; i < ss.length; ++i) {
                var c = this.parseConnection(ss[i]);
                if (c == null || chains[c.chain1] == null || chains[c.chain2] == null)
                    continue; //error

                var atom1 = chains[c.chain1].getAtomByAAID(c.a1);
                var atom2 = chains[c.chain2].getAtomByAAID(c.a2);
                if (atom1 == null || atom2 == null)
                    continue; //error

                if (c.r1 == null || c.r2 == null || !/^R[0-9]+$/.test(c.r1) || !/^R[0-9]+$/.test(c.r2))
                    continue; //error
                var r1 = parseInt(c.r1.substr(1));
                var r2 = parseInt(c.r2.substr(1));
                if (!(r1 > 0 && r2 > 0))
                    continue; //error

                //chain.bonds.push(plugin.addBond(atom1, atom2, r1, r2));
                plugin.addBond(atom1, atom2, r1, r2);
            }
        }

        // pairs, hydrogen bonds
        // RNA1,RNA2,2:pair-9:pair|RNA1,RNA2,5:pair-6:pair|RNA1,RNA2,8:pair-3:pair
        p = remained == null ? -1 : remained.indexOf("$");
        if (p >= 0) {
            s = remained.substr(0, p);
            remained = remained.substr(p + 1);
            var ss = s == "" ? [] : s.split("|");
            for (var i = 0; i < ss.length; ++i) {
                var c = this.parseConnection(ss[i]);
                if (c == null || chains[c.chain1] == null || chains[c.chain2] == null || !scil.Utils.startswith(c.chain1, "RNA") || !scil.Utils.startswith(c.chain2, "RNA"))
                    continue; //error

                var atom1 = chains[c.chain1].getAtomByAAID(c.a1);
                var atom2 = chains[c.chain2].getAtomByAAID(c.a2);
                if (atom1 == null || atom2 == null)
                    continue; //error

                if (c.r1 != "pair" || c.r2 != "pair")
                    continue; //error

                //chain.bonds.push(plugin.addBond(atom1, atom2, r1, r2));
                plugin.addHydrogenBond(atom1, atom2);
            }
        }

        // annotation
        p = remained == null ? -1 : remained.indexOf("$");
        if (p >= 0) {
            s = remained.substr(0, p);
            remained = remained.substr(p + 1);

            var ss = s == "" ? [] : s.split("|");
            for (var i = 0; i < ss.length; ++i) {
                var s = ss[i];
                p = s.indexOf("{");
                var chn = s.substr(0, p);
                s = s.substr(p);
                if (s == "{ss}" || s == "{as}")
                {
                    var chain = chains[chn];
                    if (chain != null && chain.type == "RNA")
                        chain.atoms[0].bio.annotation = "5'" + s.substr(1, s.length - 2);
                }
            }
        }

        return n;
    },

    parseConnection: function(s) {
        var tt = s.split(',');
        if (tt.length != 3)
            return null; // error

        var tt2 = tt[2].split('-');
        if (tt2.length != 2)
            return null;// error

        var c1 = tt2[0].split(':');
        var c2 = tt2[1].split(':');
        if (c1.length != 2 || c2.length != 2)
            return null;// error

        return { chain1: tt[0], chain2: tt[1], a1: parseInt(c1[0]), r1: c1[1], a2: parseInt(c2[0]), r2: c2[1] };
    },

    splitChars: function (s) {
        var ss = [];
        for (var i = 0; i < s.length; ++i)
            ss.push(s.substr(i, 1));
        return ss;
    },

    trimBracket: function(s) {
        if (s != null && scil.Utils.startswith(s, "[") && scil.Utils.endswith(s, "]"))
            return  s.substr(1, s.length - 2);
        return s;
    },

    getRenamedMonomer: function(type, elem, monomers) {
        if (monomers == null || monomers.length == 0)
            return elem;

        elem = org.helm.webeditor.IO.trimBracket(elem);
        for (var i = 0; i < monomers.length; ++i) {
            var m = monomers[i];
            if (m.oldname == elem)
                return m.id;
        }
        return elem;
    },

    addNode: function (plugin, chain, atoms, p, type, elem, renamedmonomers) {
        a2 = plugin.addNode(p, type, this.getRenamedMonomer(type, elem, renamedmonomers));
        if (a2 == null)
            throw "";

        atoms.push(a2);
        a2._aaid = chain.atoms.length + chain.bases.length;
        return a2;
    },

    addChem: function (plugin, name, chain, origin, renamedmonomers) {
        this.addNode(plugin, chain, chain.atoms, origin.clone(), org.helm.webeditor.HELM.CHEM, name, renamedmonomers);
        return 1;
    },

    addAAs: function (plugin, ss, chain, origin, renamedmonomers) {
        var n = 0;

        var firstatom = null;
        var a1 = null;
        var a2 = null;
        var m = plugin.jsd.m;
        var delta = org.helm.webeditor.bondscale * plugin.jsd.bondlength;
        var p = origin.clone();
        for (var i = 0; i < ss.length; ++i) {
            if (i == ss.length - 1 && ss[i] == ">") {
                if (firstatom != a1)
                    chain.bonds.push(plugin.addBond(a1, firstatom, 2, 1));
                break;
            }

            p.x += delta;
            a2 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.AA, ss[i], renamedmonomers);

            if (a1 != null)
                chain.bonds.push(plugin.addBond(a1, a2, 2, 1));

            if (firstatom == null)
                firstatom = a2;

            a1 = a2;
            a1.bio.id = ++n;
        }

        return n;
    },

    addHELMRNAs: function (plugin, ss, chain, origin, renamedmonomers) {
        var n = 0;
        var a1 = null;
        var a2 = null;
        var m = plugin.jsd.m;
        var delta = org.helm.webeditor.bondscale * plugin.jsd.bondlength;
        var p = origin.clone();
        for (var i = 0; i < ss.length; ++i) {
            var s = ss[i];
            var sugar = null;
            var base = null;
            var linker = null;

            // handle all cases:
            // RNA1{RP.[fR]P.[fR](A)P.[fR](A)}$$$$
            // RNA1{R.P.[fR].P.[fR](A)P.[fR](A)}$$$$
            // RNA1{R()P.[fR]()P.[fR](A)P.[fR](A)}$$$$
            var k1 = s.indexOf('(');
            var k2 = s.indexOf(')');
            if (k1 >= 0 && k2 >= 0) {
                sugar = s.substr(0, k1);
                base = s.substr(k1 + 1, k2 - k1 - 1);
                linker = s.substr(k2 + 1);
            }
            else {
                if (s.substr(0, 1) == "[") {
                    var k = s.indexOf("]");
                    if (k > 0) {
                        sugar = s.substr(0, k + 1);
                        linker = s.substr(k + 1);
                    }
                    else {
                        sugar = s;
                    }
                }
                else {
                    sugar = s.substr(0, 1);
                    linker = s.substr(1);
                }
            }

            if (scil.Utils.isNullOrEmpty(base)) {
                if (scil.Utils.isNullOrEmpty(sugar) && !scil.Utils.isNullOrEmpty(linker)) {
                    if (org.helm.webeditor.Monomers.getMonomer(org.helm.webeditor.HELM.SUGAR, linker) != null) {
                        sugar = linker;
                        linker = null;
                    }
                } 
                else if (scil.Utils.isNullOrEmpty(linker) && !scil.Utils.isNullOrEmpty(sugar)) {
                    if (org.helm.webeditor.Monomers.getMonomer(org.helm.webeditor.HELM.LINKER, sugar) != null) {
                        linker = sugar;
                        sugar = null;
                    }
                }
            }

            // 1. sugar (Order does matter)
            if (!scil.Utils.isNullOrEmpty(sugar)) {
                p.x += delta;
                a2 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.SUGAR, sugar, renamedmonomers);
                if (a1 != null)
                    chain.bonds.push(plugin.addBond(a1, a2, 2, 1));
                a1 = a2;
            }

            // 2. base
            if (!scil.Utils.isNullOrEmpty(base)) {
                a3 = this.addNode(plugin, chain, chain.bases, org.helm.webeditor.Interface.createPoint(p.x, p.y + delta), org.helm.webeditor.HELM.BASE, base, renamedmonomers);

                plugin.addBond(a2, a3, 3, 1);
                a3.bio.id = ++n;
            }

            // 3. linker
            if (!scil.Utils.isNullOrEmpty(linker)) {
                p.x += delta;
                a0 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.LINKER, linker, renamedmonomers);
                chain.bonds.push(plugin.addBond(a1, a0, 2, 1));
                a1 = a0;
            }
        }

        return n;
    },

    addRNAs: function (plugin, ss, chain, origin, sugar, linker) {
        var n = 0;

        if (scil.Utils.isNullOrEmpty(sugar))
            sugar = "R";
        if (scil.Utils.isNullOrEmpty(linker) || linker == "null")
            linker = "P";

        var firstatom = null;
        var a1 = null;
        var a2 = null;
        var m = plugin.jsd.m;
        var delta = org.helm.webeditor.bondscale * plugin.jsd.bondlength;
        var p = origin.clone();
        for (var i = 0; i < ss.length; ++i) {
            if (i == ss.length - 1 && ss[i] == ">") {
                if (firstatom != a1) {
                    // linker
                    p.x += delta;
                    var a0 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.LINKER, linker);
                    chain.bonds.push(plugin.addBond(a1, a0, 2, 1));
                    
                    chain.bonds.push(plugin.addBond(a0, firstatom, 2, 1));
                }
                break;
            }

            // 1. linker
            if (a1 != null) {
                p.x += delta;
                var a0 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.LINKER, linker);
                chain.bonds.push(plugin.addBond(a1, a0, 2, 1));
                a1 = a0;
            }

            // 2. sugar
            p.x += delta;
            a2 = this.addNode(plugin, chain, chain.atoms, p.clone(), org.helm.webeditor.HELM.SUGAR, sugar);
            if (a1 != null)
                chain.bonds.push(plugin.addBond(a1, a2, 2, 1));
            a1 = a2;

            if (firstatom == null)
                firstatom = a1;

            // 3. base
            a3 = this.addNode(plugin, chain, chain.bases, org.helm.webeditor.Interface.createPoint(p.x, p.y + delta), org.helm.webeditor.HELM.BASE, ss[i]);
            plugin.addBond(a1, a3, 3, 1);

            a3.bio.id = ++n;
        }

        return n;
    },


    compressGz: function (s) {
        if (scil.Utils.isNullOrEmpty(s))
            return null;

        if (typeof pako != "undefined") {
            try {
                var buf = pako.deflate(s, { gzip: true });
                return btoa(String.fromCharCode.apply(null, buf));
            }
            catch (e) {
            }
        }
        return null;
    },

    uncompressGz: function (b64Data) {
        if (scil.Utils.isNullOrEmpty(b64Data))
            return null;

        if (typeof pako == "undefined")
            return null;

        try {
            var strData = atob(b64Data);
            var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
            var binData = new Uint8Array(charData);
            var data = pako.inflate(binData);
            return String.fromCharCode.apply(null, new Uint16Array(data));
        }
        catch (e) {
            return null;
        }
    }
};
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* MonomerExplorer class
* @class org.helm.webeditor.MonomerExplorer
*/
org.helm.webeditor.MonomerExplorer = scil.extend(scil._base, {
    constructor: function (parent, plugin, options) {
        this.plugin = plugin;
        this.options = options == null ? {} : options;
        var w = this.options.monomerwidth > 0 ? this.options.monomerwidth : 50;
        this.kStyle = { borderRadius: "5px", border: "solid 1px gray", backgroundRepeat: "no-repeat", display: "table", width: w, height: w, float: "left", margin: 2 };

        if (this.options.mexuseshape)
            this.kStyle.border = null;

        //this.lastselect = {};
        this.selected = {};
        this.selected[org.helm.webeditor.HELM.BASE] = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.BASE);
        this.selected[org.helm.webeditor.HELM.LINKER] = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.LINKER);
        this.selected[org.helm.webeditor.HELM.SUGAR] = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.SUGAR);
        this.selected[org.helm.webeditor.HELM.AA] = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.AA);
        this.selected[org.helm.webeditor.HELM.CHEM] = org.helm.webeditor.Monomers.getDefaultMonomer(org.helm.webeditor.HELM.CHEM);

        var me = this;
        this.div = scil.Utils.createElement(parent, "div", null, { fontSize: this.options.mexfontsize == null ? "90%" : this.options.mexfontsize });
        if (this.options.mexfind) {
            var d = scil.Utils.createElement(this.div, "div", null, { background: "#eee", borderBottom: "solid 1px gray", padding: "4px 0 4px 0" });
            var tbody = scil.Utils.createTable(d, 0, 0);
            var tr = scil.Utils.createElement(tbody, "tr");
            scil.Utils.createElement(tr, "td", "Quick Replace:", null, { colSpan: 3 });
            this.findtype = scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "select", null, { width: 100 });
            scil.Utils.listOptions(this.findtype, org.helm.webeditor.monomerTypeList(), null, true, false);

            tr = scil.Utils.createElement(tbody, "tr");
            this.findinput = scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "input", null, { width: 60 });
            scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "span", "&rarr;");
            this.findreplace = scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "input", null, { width: 60 });
            scil.Utils.createButton(scil.Utils.createElement(tr, "td", null, { textAlign: "right" }), { label: "Update", onclick: function () { me.findReplace(); } });
        }
        if (this.options.mexfilter != false) {
            var d = scil.Utils.createElement(this.div, "div", null, { background: "#eee", borderBottom: "solid 1px gray", padding: "4px 0 4px 0" });
            var tbody = scil.Utils.createTable(d, 0, 0);
            var tr = scil.Utils.createElement(tbody, "tr");
            scil.Utils.createElement(tr, "td", JSDraw2.Language.res("Filter") + ":", { paddingLeft: "5px" });
            this.filterInput = scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "input");
            scil.connect(this.filterInput, "onkeyup", function (e) { me.filter(e); });
        }

        var tabs = [];
        if (this.options.mexmonomerstab)
            tabs.push({ caption: "Monomers", tabkey: "monomers" });
        else
            this.addMonomerTabs(tabs);
        tabs.push({ caption: "Rules", tabkey: "rule" });

        var width = this.options.width != null ? this.options.width : 300;
        var height = this.options.height != null ? this.options.height : 400;
        this.tabs = new scil.Tabs(scil.Utils.createElement(this.div, "div", null, { padding: "5px" }), {
            onShowTab: function (td) { me.onShowTab(td, height); },
            tabpadding: this.options.mexmonomerstab ? "10px" : "5px 2px 1px 2px",
            tabs: tabs,
            marginBottom: 0
        });

        this.dnd = this.createDnD(this.div);
        scil.connect(document.body, "onmousemove", function (e) { me.showMol(e); });

        org.helm.webeditor.MonomerExplorer.loadNucleotides();
    },

    addMonomerTabs: function(tabs) {
        if (this.options.mexfavoritetab != false)
            tabs.push({ caption: "Favorite", tabkey: "favorite" });

        tabs.push({ caption: "Chem", tabkey: "chem" });
        tabs.push({ caption: "Peptide", tabkey: "aa" });
        tabs.push({ caption: "RNA", tabkey: "rna" });
    },

    findReplace: function() {
        this.plugin.replaceAll(this.findinput.value, this.findreplace.value, this.findtype.value);
    },

    filter: function (e) {
        var key = this.tabs.currentTabKey();
        if (key == "rule") {
            org.helm.webeditor.RuleSet.filterRules(this.rules, this.filterInput.value, this.rules_category.value);
        }
        else {
            this.filterGroup(this.tabs.dom, this.filterInput.value);
        }


        //var tab = null;
        //if (key == "monomers") {
        //    key = this.monomerstabs.currentTabKey();
        //    if (key == "chem" || key == "aa")
        //        tab = this.monomerstabs.currenttab;
        //    else if (key == "rna")
        //        tab = this.rnatabs.currenttab;
        //}
        //else {
        //    tab = this.tabs.currenttab;
        //}

        //this.filterGroup(tab.clientarea, this.filterInput.value);
    },

    filterGroup: function (container, s) {
        var list = container.getElementsByTagName("DIV");

        s = scil.Utils.trim(s).toLowerCase();
        if (s == "") {
            for (var i = 0; i < list.length; ++i) {
                var d = list[i];
                if (d.getAttribute("helm") == null)
                    continue;

                d.style.display = "table";
            }
        }
        else {
            for (var i = 0; i < list.length; ++i) {
                var d = list[i];
                var type = d.getAttribute("helm");
                if (scil.Utils.isNullOrEmpty(type))
                    continue;

                var name = scil.Utils.getInnerText(d);
                var f = scil.Utils.startswith(name.toLowerCase(), s);//name.toLowerCase().indexOf(s) >= 0;
                if (!f) {
                    var m = org.helm.webeditor.Monomers.getMonomer(type, name);
                    var fullname = m == null ? null : m.n;
                    f = fullname == null ? false : scil.Utils.startswith(fullname.toLowerCase(), s); //fullname.toLowerCase().indexOf(s) >= 0;
                }

                if (f)
                    d.style.display = "table";
                else
                    d.style.display = "none";
            }
        }
    },

    reloadTab: function (type) {
        var key = null;
        switch (type) {
            case "nucleotide":
                key = type;
                break;
            case org.helm.webeditor.HELM.AA:
                key = "aa";
                break;
            case org.helm.webeditor.HELM.CHEM:
                key = "chem";
                break;
            case org.helm.webeditor.HELM.BASE:
                key = "base";
                break;
            case org.helm.webeditor.HELM.LINKER:
                key = "linker";
                break;
            case org.helm.webeditor.HELM.SUGAR:
                key = "sugar";
                break;
            default:
                return;
        }

        var td = this.tabs.findTab(key);
        if (td == null && this.monomerstabs != null)
            td = this.monomerstabs.findTab(key);
        if (td == null)
            td = this.rnatabs.findTab(key);

        if (td != null)
            this.onShowTab(td, null, true);
    },

    reloadTabs: function () {
        var list = this.tabs.tr.childNodes;
        for (var i = 0; i < list.length; ++i) {
            var td = list[i];
            scil.Utils.removeAll(td.clientarea);
            td._childrencreated = false;
        }

        this.onShowTab(this.tabs.currenttab);
    },

    onShowTab: function (td, height, forcerecreate) {
        if (td == null)
            return;

        var key = td.getAttribute("key");
        if (forcerecreate || key == "favorite" && org.helm.webeditor.MonomerExplorer.favorites.changed) {
            td._childrencreated = false;
            if (key == "favorite")
                org.helm.webeditor.MonomerExplorer.favorites.changed = false;
        }

        if (this.plugin != null && this.plugin.jsd != null)
            this.plugin.jsd.doCmd("helm_" + key);
        if (td._childrencreated)
            return;
        td._childrencreated = true;

        if (height == null)
            height = td._height;
        else
            td._height = height;

        var me = this;
        var div = td.clientarea;
        scil.Utils.unselectable(div);
        scil.Utils.removeAll(div);

        if (key == "favorite") {
            var d = scil.Utils.createElement(div, "div", null, { width: "100%", height: height, overflowY: "scroll" });
            this.recreateFavorites(d);
        }
        else if (key == "rna") {
            var d = scil.Utils.createElement(div, "div");
            this.createMonomerGroup3(d, "RNA", height, 0, false);
        }
        else if (key == "nucleotide") {
            var dict = org.helm.webeditor.MonomerExplorer.loadNucleotides();
            var list = scil.Utils.getDictKeys(dict);
            this.createMonomerGroup4(div, key, list);
        }
        else if (key == "aa") {
            var d = scil.Utils.createElement(div, "div", null, { width: "100%", height: height, overflowY: "scroll" });
            dojo.connect(d, "onmousedown", function (e) { me.select(e); });
            dojo.connect(d, "ondblclick", function (e) { me.dblclick(e); });
            this.createMonomerGroup4(d, org.helm.webeditor.HELM.AA, null, false, this.options.mexgroupanalogs != false);
        }
        else if (key == "chem") {
            var d = scil.Utils.createElement(div, "div", null, { width: "100%", height: height, overflowY: "scroll" });
            this.createMonomerGroup(d, org.helm.webeditor.HELM.CHEM);
        }
        else if (key == "base") {
            this.createMonomerGroup4(div, org.helm.webeditor.HELM.BASE, null, null, this.options.mexgroupanalogs != false);
        }
        else if (key == "sugar") {
            this.createMonomerGroup4(div, org.helm.webeditor.HELM.SUGAR, null);
        }
        else if (key == "linker") {
            this.createMonomerGroup4(div, org.helm.webeditor.HELM.LINKER, null, true);
        }
        else if (key == "rule") {
            var toolbar = scil.Utils.createElement(div, "div", null, {background: "#ccc"});
            scil.Utils.createElement(toolbar, "span", "Category:");
            this.rules_category = scil.Utils.createElement(toolbar, "select");
            scil.Utils.listOptions(this.rules_category, org.helm.webeditor.RuleSetApp.categories);
            var me = this;
            scil.connect(this.rules_category, "onchange", function () { org.helm.webeditor.RuleSet.filterRules(me.rules, me.filterInput.value, me.rules_category.value) });

            var d = scil.Utils.createElement(div, "div", null, { width: "100%", height: height, overflowY: "scroll" });
            this.rules = org.helm.webeditor.RuleSet.listRules(d, function (script) { me.plugin.applyRule(script); }, function (scripts) { me.plugin.applyRules(scripts); });
        }
        else if (key == "monomers") {
            var d = scil.Utils.createElement(div, "div", null, { paddingTop: "5px" });

            var ht = height - 30;
            if (this.options.canvastoolbar == false) {
                var b = scil.Utils.createElement(d, "div", "<img src='" + scil.Utils.imgSrc("helm/arrow.png") + "' style='vertical-align:middle'>Mouse Pointer", { cursor: "pointer", padding: "2px", border: "solid 1px gray", margin: "5px" });
                scil.connect(b, "onclick", function () { me.plugin.jsd.doCmd("lasso"); });
                ht -= 23;
            }

            var tabs = [];
            this.addMonomerTabs(tabs);
            this.monomerstabs = new scil.Tabs(d, {
                onShowTab: function (td) { me.onShowTab(td, ht); },
                tabpadding: "5px 2px 1px 2px",
                tabs: tabs,
                marginBottom: 0
            });
        }
    },

    listRules: function() {

    },

    getMonomerDictGroupByAnalog: function (type) {
        var set = org.helm.webeditor.Monomers.getMonomerSet(type);
        for (var k in set)
            set[k].id = k;

        var ret = {};
        var aa = type == org.helm.webeditor.HELM.AA;
        if (aa) {
            ret["C-Term"] = [];
            ret["N-Term"] = [];
        }

        for (var k in set) {
            var m = set[k];
            var na = m.na;
            if (aa) {
                if (m.at.R1 == null)
                    na = "C-Term";
                else if (m.at.R2 == null)
                    na = "N-Term";
            }
            if (scil.Utils.isNullOrEmpty(na))
                na = "X";
            if (ret[na] == null)
                ret[na] = [];
            ret[na].push(m);
        }

        for (var k in ret)
            ret[k] = this.getMonomerNames(ret[k]);

        return ret;
    },

    getMonomerList: function (list, type, addnull) {
        if (list != null) {
            list.sort();
            return list;
        }

        var set = org.helm.webeditor.Monomers.getMonomerSet(type);
        for (var k in set)
            set[k].id = k;
        list = scil.Utils.getDictValues(set);
        return this.getMonomerNames(list, addnull);
    },

    getMonomerNames: function(list, addnull) {
        var ret = [];
        if (addnull)
            ret.push("null");

        var fun = function (a, b) {
            if (a.na == b.na) {
                if (a.id == b.id)
                    return 0;
                else if (a.id.length != b.id.length && (a.id.length == 1 || b.id.length == 1))
                    return a.id.length > b.id.length ? 1 : -1;
                else
                return a.id > b.id ? 1 : -1;
            }
            else {
                return a.na < b.na ? 1 : -1;
            }
        };
        list.sort(fun);
        for (var i = 0; i < list.length; ++i)
            ret.push(list[i].id);

        return ret;
    },

    createMonomerGroup: function (div, type, list, addnull) {
        var me = this;
        list = this.getMonomerList(list, type, addnull);
        div.style.overflowY = "scroll";
        this._listMonomers(div, list, type, this.options.mexfavoritefirst);
        dojo.connect(div, "onmousedown", function (e) { me.select(e); });
        dojo.connect(div, "ondblclick", function (e) { me.dblclick(e); });
    },

    createMonomerGroup3: function (div, group, height, i, createbar) {
        var me = this;
        var parent = scil.Utils.createElement(div, "div");
        if (createbar) {
            var bar = scil.Utils.createElement(parent, "div", group + ":", { background: "#ddd", borderTop: "solid 1px #aaa", marginTop: i == 0 ? null : "1px" });
            if (i > 0)
                new scil.Resizable(bar, { direction: "y", mouseovercolor: "#aaf", onresize: function (delta, resizable) { return me.onresize(delta, i); } });
        }

        var d = scil.Utils.createElement(parent, "div");
        dojo.connect(d, "onmousedown", function (e) { me.select(e); });
        dojo.connect(d, "ondblclick", function (e) { me.dblclick(e); });

        if (group == "RNA") {
            var half = "<div title='Nucleotide (Combined)' style='font-size: 80%;padding-left:20px;background-repeat:no-repeat;background-position:left center;background-image:";

            var base = org.helm.webeditor.Monomers.bases["A"] == null ? "a" : "A";
            var linker = org.helm.webeditor.Monomers.linkers["P"] == null ? "p" : "P";
            var sugar = org.helm.webeditor.Monomers.sugars["R"] == null ? "r" : "R";

            var tabs = [
                    { caption: half + scil.Utils.imgSrc("img/helm_nucleotide.gif", true) + "'>R(A)P</div>", tabkey: "nucleotide", onmenu: this.options.mexrnapinontab ? function (e) { me.onPinMenu(e); } : null },
                    { caption: half + scil.Utils.imgSrc("img/helm_base.gif", true) + "'>" + base + "</div>", tabkey: "base" },
                    { caption: half + scil.Utils.imgSrc("img/helm_sugar.gif", true) + "'>" + sugar + "</div>", tabkey: "sugar" },
                    { caption: half + scil.Utils.imgSrc("img/helm_linker.gif", true) + "'>" + linker + "</div>", tabkey: "linker" }
                ];
            this.rnatabs = new scil.Tabs(scil.Utils.createElement(d, "div", null, { paddingTop: "5px" }), {
                onShowTab: function (td) { me.onShowTab(td); }, //function (td) { me.onShowRNATab(td); },
                tabpadding: "2px",
                tabs: tabs,
                marginBottom: 0,
                clientareaheight: height - 40
            });
        }
        else if (group == "Chem") {
            d.style.overflowY = "scroll";
            d.style.height = height + "px";
            var list = this.getMonomerList(null, org.helm.webeditor.HELM.CHEM);
            this._listMonomers(d, list, org.helm.webeditor.HELM.CHEM, true);
        }
        else if (group == "Peptide") {
            d.style.overflowY = "scroll";
            d.style.height = height + "px";
            this.createMonomerGroup4(d, org.helm.webeditor.HELM.AA, null, false, this.options.mexgroupanalogs != false);
            //var list = this.getMonomerList(null, org.helm.webeditor.HELM.AA);
            //this._listMonomers(d, list, org.helm.webeditor.HELM.AA, true);
        }
    },

    onPinMenu: function(e) {
        if (this.pinmenu == null) {
            var me = this;
            var items = [{ caption: "Pin This Nucleotide" }];
            this.pinmenu = new scil.ContextMenu(items, function () { me.addNucleotide(); });
        }
        this.pinmenu.show(e.clientX, e.clientY);
    },

    createMonomerGroup4: function (div, type, list, addnull, groupbyanalog) {
        if (groupbyanalog) {
            var dict = this.getMonomerDictGroupByAnalog(type);

            var list = [];
            if (this.options.mexfavoritefirst) {
                for (var k in dict) {
                    var list2 = dict[k];
                    for (var i = 0; i < list2.length; ++i) {
                        var a = list2[i];
                        if (org.helm.webeditor.MonomerExplorer.favorites.contains(a, type))
                            list.push(a);
                    }
                }
                this._listMonomer2(div, scil.Utils.imgTag("star.png"), list, type, 20);
            }

            list = scil.Utils.getDictKeys(dict);
            list.sort();
            var list2 = [];
            for (var i = 0; i < list.length; ++i) {
                var k = list[i];
                if (k == "C-Term" || k == "N-Term") {
                    list2.push(k);
                    continue;
                }
                this._listMonomer2(div, k, dict[k], type, 20);
            }

            for (var i = 0; i < list2.length; ++i) {
                var k = list2[i];
                this._listMonomer2(div, k, dict[k], type, 60);
            }
        }
        else {
            if (type == "nucleotide" && !this.options.mexrnapinontab) {
                var me = this;
                var d = this.createMonomerDiv(div, scil.Utils.imgTag("pin.png"), null, null, false);
                d.setAttribute("title", "Pin This Nucleotide");
                scil.connect(d, "onclick", function () { me.addNucleotide(); })
            }
            var list = this.getMonomerList(list, type, addnull);
            this._listMonomers(div, list, type, this.options.mexfavoritefirst);
        }
    },

    addNucleotide: function(tab) {
        var notation = this.getCombo();
        var dict = org.helm.webeditor.MonomerExplorer.nucleotides;
        for (var k in dict) {
            if (notation == dict[k]) {
                scil.Utils.alert("There is a defined nucleotide called: " + k);
                return;
            }
        }

        var me = this;
        scil.Utils.prompt2({
            caption: "Pin Nucleotide: " + notation,
            message: "Please give a short name for the nucleotide, " + notation,
            callback: function (s) { if (org.helm.webeditor.MonomerExplorer.addCustomNucleotide(s, notation)) me.reloadTab("nucleotide"); }
        });
    },

    _listMonomer2: function (div, k, list, type, width) {
        if (list.length == 0)
            return;

        var tbody = scil.Utils.createTable(div, 0, 0);
        var tr = scil.Utils.createElement(tbody, "tr");
        var left = scil.Utils.createElement(tr, "td", null, { verticalAlign: "top" });
        var right = scil.Utils.createElement(tr, "td", null, { verticalAlign: "top" });
        scil.Utils.createElement(left, "div", k, { width: width, background: "#eee", border: "solid 1px #aaa", textAlign: "center" });
        this._listMonomers(right, list, type);
    },

    createMonomerGroupFav: function (div, caption, type) {
        var list = org.helm.webeditor.MonomerExplorer.favorites.getList(type);
        if (list == null || list.length == 0)
            return;

        list.sort();
        scil.Utils.createElement(div, "div", caption + ":", { background: "#ddd", border: "solid 1px #ddd" });
        var d = scil.Utils.createElement(div, "div", null, { display: "table", paddingBottom: "10px" });
        this._listMonomers(d, list, type, false);

        var me = this;
        dojo.connect(d, "onmousedown", function (e) { me.select(e); });
        dojo.connect(d, "ondblclick", function (e) { me.dblclick(e); });
    },

    _listMonomers: function (div, list, type, mexfavoritefirst) {
        if (mexfavoritefirst) {
            var list2 = [];
            for (var i = 0; i < list.length; ++i) {
                if (org.helm.webeditor.MonomerExplorer.favorites.contains(list[i], type))
                    this.createMonomerDiv(div, list[i], type);
                else
                    list2.push(list[i]);
            }

            for (var i = 0; i < list2.length; ++i)
                this.createMonomerDiv(div, list2[i], type);
        }
        else {
            for (var i = 0; i < list.length; ++i)
                this.createMonomerDiv(div, list[i], type);
        }
    },

    recreateFavorites: function (d) {
        this.createMonomerGroupFav(d, "Nucleotide", org.helm.webeditor.MonomerExplorer.kNucleotide);
        this.createMonomerGroupFav(d, "Base", org.helm.webeditor.HELM.BASE);
        this.createMonomerGroupFav(d, "Sugar", org.helm.webeditor.HELM.SUGAR);
        this.createMonomerGroupFav(d, "Linker", org.helm.webeditor.HELM.LINKER);
        this.createMonomerGroupFav(d, "Chemistry", org.helm.webeditor.HELM.CHEM);
        this.createMonomerGroupFav(d, "Peptide", org.helm.webeditor.HELM.AA);
    },

    createMonomerDiv: function (parent, name, type, style, star) {
        var fav = org.helm.webeditor.MonomerExplorer.favorites.contains(name, type);

        if (style == null)
            style = scil.clone(this.kStyle);
        else
            style = scil.apply(scil.clone(this.kStyle), style);

        if (this.options.mexusecolor != false) {
            var color;
            var custom = org.helm.webeditor.MonomerExplorer.customnucleotides;
            if (type == "nucleotide" && custom != null && custom[name] != null)
                color = { backgroundcolor: "#afa" };
            else
                color = style.backgroundColor = org.helm.webeditor.Monomers.getColor2(type, name);
            style.backgroundColor = color == null ? null : color.backgroundcolor;
        }

        if (star != false)
            style.backgroundImage = scil.Utils.imgSrc("img/star" + (fav ? "" : "0") + ".png", true);

        var div = scil.Utils.createElement(parent, "div", null, style, { helm: type, bkcolor: style.backgroundColor, star: (star ? 1 : null) });
        scil.Utils.unselectable(div);

        if (this.options.mexuseshape)
            this.setMonomerBackground(div, 0);

        var d = scil.Utils.createElement(div, "div", null, { display: "table-cell",  textAlign: "center", verticalAlign: "middle" });
        scil.Utils.createElement(d, "div", name, { overflow: "hidden", width: this.kStyle.width });

        return div;
    },

    setMonomerBackground: function (div, f) {
        var type = div.getAttribute("helm");
        if (scil.Utils.isNullOrEmpty(type))
            return;

        var bk = type.toLowerCase();
        if (type != org.helm.webeditor.MonomerExplorer.kNucleotide)
            bk = bk.substr(bk.indexOf('_') + 1);
        div.style.backgroundImage = scil.Utils.imgSrc("img/mon-" + bk + f + ".png", true);
    },

    getMonomerDiv: function (e) {
        var div = e.target || e.srcElement;
        if (div == null || div.tagName == null)
            return;

        for (var i = 0; i < 3; ++i) {
            var type = div.getAttribute("helm");
            if (!scil.Utils.isNullOrEmpty(type))
                break;
            div = div.tagName == "BODY" ? null : div.parentNode;
            if (div == null)
                break;
        }
        return scil.Utils.isNullOrEmpty(type) ? null : div;
    },

    createDnD: function (div) {
        var me = this;
        return new scil.DnD(div, {
            onstartdrag: function (e, dnd) {
                return me.getMonomerDiv(e);
            },
            oncreatecopy: function (e, dnd) {
                if (me.dnd.floatingbox == null) {
                    var maxZindex = scil.Utils.getMaxZindex();
                    var style = {
                        float: null, backgroundImage: null,
                        filter: 'alpha(opacity=80)', opacity: 0.8, color: org.helm.webeditor.MonomerExplorer.color,
                        backgroundColor: org.helm.webeditor.MonomerExplorer.backgroundcolor,
                        zIndex: (maxZindex > 0 ? maxZindex : 100) + 1, position: "absolute"
                    };
                    if (me.options.useshape)
                        style.backgroundColor = null;
                    me.dnd.floatingbox = me.createMonomerDiv(document.body, null, null, style, false);
                }
                me.dnd.floatingbox.style.display = "table";
                me.dnd.floatingbox.style.backgroundColor = org.helm.webeditor.MonomerExplorer.backgroundcolor;
                me.dnd.floatingbox.innerHTML = dnd.src.innerHTML;
                me.dnd.floatingbox.setAttribute("helm", dnd.src.getAttribute("helm"));
                if (me.options.useshape)
                    me.setMonomerBackground(me.dnd.floatingbox, 1);
                return me.dnd.floatingbox;

            },
            ondrop: function (e, dnd) {
                if (me.dnd.floatingbox == null)
                    return;

                me.dnd.floatingbox.style.display = "none";
                var type = me.dnd.floatingbox.getAttribute("helm");
                me.plugin.dropMonomer(type, scil.Utils.getInnerText(me.dnd.floatingbox), e);
            },
            oncancel: function (dnd) {
                if (me.dnd.floatingbox == null)
                    return;

                me.dnd.floatingbox.style.display = "none";
                var type = me.dnd.floatingbox.getAttribute("helm");
            }
        });
    },

    showMol: function (e) {
        var src = this.getMonomerDiv(e);
        if (src != null && !this.dnd.isDragging()) {
            var type = src.getAttribute("helm");
            var set = type == org.helm.webeditor.MonomerExplorer.kNucleotide ? org.helm.webeditor.MonomerExplorer.nucleotides : org.helm.webeditor.Monomers.getMonomerSet(type);
            var s = scil.Utils.getInnerText(src);
            var m = set[s];
            org.helm.webeditor.MolViewer.show(e, type, m, s);
        }
        else {
            var src = e.srcElement || e.target;
            if (!scil.Utils.isChildOf(src, this.plugin.jsd.div))
                org.helm.webeditor.MolViewer.hide();
        }
    },

    splitLists: function (set) {
        var lists = [[], [], [], []];
        for (var k in set) {
            var m = set[k];
            if (m.at.R1 == null)
                lists[2].push(k);
            else if (m.at.R2 == null)
                lists[3].push(k);
            else if (k.length == 1)
                lists[0].push(k);
            else
                lists[1].push(k);
        }

        return lists;
    },

    changeFavorite: function (div) {
        var f = div.getAttribute("star") != "1";

        if (f) {
            div.setAttribute("star", "1");
            div.style.backgroundImage = scil.Utils.imgSrc("img/star.png", true);
        }
        else {
            div.setAttribute("star", "");
            div.style.backgroundImage = scil.Utils.imgSrc("img/star0.png", true);
        }

        var type = div.getAttribute("helm");
        var s = scil.Utils.getInnerText(div);
        org.helm.webeditor.MonomerExplorer.favorites.add(s, f, type);

        //this.reloadTab(type);
    },

    select: function (e) {
        var div = this.getMonomerDiv(e);
       if (div != null) {
           var d = scil.Utils.getOffset(div, true);
           var scroll = scil.Utils.getParent(div.parentNode, "div");
           var dx = e.clientX - d.x + scroll.scrollLeft;
           var dy = e.clientY - d.y + scroll.scrollTop;
           if (dx >= 0 && dx < 16 && dy >= 0 && dy < 16) {
               // favorite
               this.changeFavorite(div);
               e.preventDefault();
               return;
           }
       }

        var helm = div == null ? null : div.getAttribute("helm");
        if (scil.Utils.isNullOrEmpty(helm))
            return;

        this.plugin.jsd.activate(true);

        var name = scil.Utils.getInnerText(div);
        if (helm == org.helm.webeditor.MonomerExplorer.kNucleotide) {
            var s = org.helm.webeditor.MonomerExplorer.nucleotides[name];
            var p1 = s.indexOf('(');
            var p2 = s.indexOf(")");
            var sugar = org.helm.webeditor.IO.trimBracket(s.substr(0, p1));
            var base = org.helm.webeditor.IO.trimBracket(s.substr(p1 + 1, p2 - p1 - 1));
            var linker = org.helm.webeditor.IO.trimBracket(s.substr(p2 + 1));

            if (scil.Utils.isNullOrEmpty(linker))
                linker = "null";

            this.selected[org.helm.webeditor.HELM.BASE] = base;
            this.selected[org.helm.webeditor.HELM.LINKER] = linker;
            this.selected[org.helm.webeditor.HELM.SUGAR] = sugar;

            if (this.rnatabs != null) {
                var tabs = this.rnatabs;
                tabs.findTab("nucleotide").childNodes[0].innerHTML = s;
                tabs.findTab("sugar").childNodes[0].innerHTML = sugar;
                tabs.findTab("linker").childNodes[0].innerHTML = linker;
                tabs.findTab("base").childNodes[0].innerHTML = base;
            }
        }
        else {
            name = org.helm.webeditor.IO.trimBracket(name);
            if (this.rnatabs != null) {
                var tab = null;
                var tabs = this.rnatabs;
                switch (helm) {
                    case org.helm.webeditor.HELM.SUGAR:
                        tab = tabs.findTab("sugar");
                        break;
                    case org.helm.webeditor.HELM.LINKER:
                        tab = tabs.findTab("linker");
                        break;
                    case org.helm.webeditor.HELM.BASE:
                        tab = tabs.findTab("base");
                        break;
                }
                if (tab != null)
                    tab.childNodes[0].innerHTML = name;
            }

            this.selected[helm] = name;
            if (tabs != null)
                tabs.findTab("nucleotide").childNodes[0].innerHTML = this.getCombo();
        }

        if (this.lastdiv != null) {
            this.lastdiv.style.color = "";
            if (this.options.mexuseshape) {
                this.setMonomerBackground(this.lastdiv, 0);
            }
            else {
                var s = this.lastdiv.getAttribute("bkcolor");
                this.lastdiv.style.backgroundColor = s == null ? "" : s;
            }
        }
        if (this.options.mexuseshape)
            this.setMonomerBackground(div, 1);
        else
            div.style.backgroundColor = org.helm.webeditor.MonomerExplorer.backgroundcolor;
        div.style.color = org.helm.webeditor.MonomerExplorer.color;
        this.lastdiv = div;

        if (this.plugin != null && this.plugin.jsd != null) {
            switch (helm) {
                case org.helm.webeditor.HELM.AA:
                    this.plugin.jsd.doCmd("helm_aa");
                    break;
                case org.helm.webeditor.HELM.CHEM:
                    this.plugin.jsd.doCmd("helm_chem");
                    break;
                case org.helm.webeditor.HELM.BASE:
                    this.plugin.jsd.doCmd(this.options.alwaysdrawnucleotide ? "helm_nucleotide" : "helm_base");
                    break;
                case org.helm.webeditor.HELM.LINKER:
                    this.plugin.jsd.doCmd(this.options.alwaysdrawnucleotide ? "helm_nucleotide" : "helm_linker");
                    break;
                case org.helm.webeditor.HELM.SUGAR:
                    this.plugin.jsd.doCmd(this.options.alwaysdrawnucleotide ? "helm_nucleotide" : "helm_sugar");
                    break;
                case org.helm.webeditor.MonomerExplorer.kNucleotide:
                    this.plugin.jsd.doCmd("helm_nucleotide");
                    break;
            }
        }
    },

    getCombo: function () {
        var sugar = this.selected[org.helm.webeditor.HELM.SUGAR];
        var linker = this.selected[org.helm.webeditor.HELM.LINKER];
        var base = this.selected[org.helm.webeditor.HELM.BASE];
        var s = org.helm.webeditor.IO.getCode(sugar);
        if (!org.helm.webeditor.Monomers.hasR(org.helm.webeditor.HELM.SUGAR, sugar, "R3"))
            s += "()";
        else
            s += "(" + org.helm.webeditor.IO.getCode(base) + ")";
        if (linker != "null")
            s += org.helm.webeditor.IO.getCode(linker);
        return s;
    },

    dblclick: function (e) {
        var div = this.getMonomerDiv(e);
        var helm = div == null ? null : div.getAttribute("helm");
        if (org.helm.webeditor.isHelmNode(helm)) {
            if (this.plugin.dblclickMomonor(helm, scil.Utils.getInnerText(div)) == 0)
                scil.Utils.beep();
        }
    }
});


scil.apply(org.helm.webeditor.MonomerExplorer, {
    kUseShape: false,
    kNucleotide: "nucleotide",
    backgroundcolor: "blue",
    color: "white",
    customnucleotides: null,
    favorites: new scil.Favorite("monomers", function (name, f, type) { org.helm.webeditor.MonomerExplorer.onAddFavorite(name, f, type); }),

    nucleotides: {
        A: "r(A)p",
        C: "r(C)p",
        G: "r(G)p",
        T: "r(T)p",
        U: "r(U)p"
    },

    onAddFavorite: function (name, f, type) {
        if (!f && type == "nucleotide" && this.customnucleotides != null && this.customnucleotides[name] != null) {
            delete this.customnucleotides[name];
            this.saveNucleotides();
        }
    },

    addCustomNucleotide: function (name, notation) {
        name = scil.Utils.trim(name);
        if (scil.Utils.isNullOrEmpty(name)) {
            scil.Utils.alert("The short name cannot be blank");
            return false;
        }

        if (this.nucleotides[name] != null) {
            scil.Utils.alert("The short name is used for: " + this.nucleotides[name]);
            return false;
        }

        if (this.customnucleotides == null)
            this.customnucleotides = {};

        this.nucleotides[name] = notation;
        this.customnucleotides[name] = notation;
        this.saveNucleotides();
        this.favorites.add(name, true, "nucleotide");

        return true;
    },

    saveNucleotides: function () {
        var s = scil.Utils.json2str(this.customnucleotides);
        scil.Utils.createCookie("scil_helm_nucleotides", s);
    },

    loadNucleotides: function () {
        if (this._nucleotidesloaded)
            return this.nucleotides;

        if (this.nucleotides == null)
            this.nucleotides = [];

        this._nucleotidesloaded = true;
        var s = scil.Utils.readCookie("scil_helm_nucleotides");
        this.customnucleotides = scil.Utils.eval(s);
        if (this.customnucleotides != null && this.customnucleotides.length == null) {
            var list = {};
            for (var k in this.customnucleotides) {
                if (this.nucleotides[k] == null) {
                    list[k] = this.customnucleotides[k];
                    this.nucleotides[k] = this.customnucleotides[k];
                }
            }
            this.customnucleotides = list;
        }
        return this.nucleotides;
    },

    showDlg: function (jsd) {
        this.createDlg(jsd);
        this.dlg.show2({ owner: jsd, modal: false });
        jsd.helm.monomerexplorer = this.mex;
    },

    createDlg: function (jsd) {
        if (this.dlg != null)
            return;

        var div = scil.Utils.createElement(null, "div", null, { width: 500 });
        this.dlg = new scil.Dialog("Monomer Explorer", div);
        this.dlg.show2({ owner: jsd, modal: false });

        this.mex = new org.helm.webeditor.MonomerExplorer(div, jsd.helm, { height: 350 });
        this.dlg.moveCenter();
    }
});
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* MolViewer class
* @class org.helm.webeditor.MolViewer
*/
org.helm.webeditor.MolViewer = {
    dlg: null,
    jsd: null,
    molscale: 1,
    delay: 800,

    show: function (e, type, m, code) {
        this.clearTimer();
        var me = this;
        this.tm = setTimeout(function () { me.show2({ x: e.clientX, y: e.clientY }, type, m, code); }, this.delay);
    },

    clearTimer: function() {
        if (this.tm != null) {
            clearTimeout(this.tm);
            this.tm = null;
        }
    },

    show2: function (xy, type, m, code) {
        this.tm = null;
        if (m == null)
            return;

        this.create();

        if (this.cur != (type + "." + code) || !this.dlg.isVisible()) {
            this.cur = type + "." + code;

            if (typeof (m) == "string") {
                var s = m;
                m = { n: m, m: this.assemblyMol(s) };
            }

            this.dlg.show2({ title: "<div style='font-size:80%'>" + (/*code + ": " + */m.n) + "</div>", modal: false, immediately: true });

            this.jsd.setMolfile(org.helm.webeditor.monomers.getMolfile(m));

            var s = "<table cellspacing=0 cellpadding=0 style='font-size:80%'>";
            if (m.at != null) {
                for (var k in m.at)
                    s += "<tr><td>" + k + "=</td><td>&nbsp;" + m.at[k] + "</td></tr>";
            } 
            s += "</table>";
            this.rs.innerHTML = s;
        }

        var scroll = scil.Utils.scrollOffset();
        this.dlg.moveTo(xy.x + scroll.x + 10, xy.y + scroll.y + 10);
    },

    assemblyMol: function(s) {
        var p1 = s.indexOf('(');
        var p2 = s.indexOf(")");
        var sugar = s.substr(0, p1);
        var base = s.substr(p1 + 1, p2 - p1 - 1);
        var linker = s.substr(p2 + 1);

        var ms = org.helm.webeditor.Monomers.getMonomer(org.helm.webeditor.HELM.SUGAR, org.helm.webeditor.IO.trimBracket(sugar));
        var ml = org.helm.webeditor.Monomers.getMonomer(org.helm.webeditor.HELM.LINKER, org.helm.webeditor.IO.trimBracket(linker));
        var mb = org.helm.webeditor.Monomers.getMonomer(org.helm.webeditor.HELM.BASE, org.helm.webeditor.IO.trimBracket(base));

        var m1 = org.helm.webeditor.Interface.createMol(org.helm.webeditor.monomers.getMolfile(ms));
        var m2 = org.helm.webeditor.Interface.createMol(org.helm.webeditor.monomers.getMolfile(ml));
        var m3 = org.helm.webeditor.Interface.createMol(org.helm.webeditor.monomers.getMolfile(mb));

        this.mergeMol(m1, "R2", m2, "R1");
        this.mergeMol(m1, "R3", m3, "R1");

        return m1.getMolfile();
    },

    capRGroup: function (m, r, mon) {
        var cap = mon == null || mon.at == null ? null : mon.at[r];
        if (cap == "OH")
            cap = "O";
        else if (cap != "H" && cap != "X")
            return false;

        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.a1.alias == r || b.a2.alias == r) {
                m.setAtomType(b.a1.alias == r ? b.a1 : b.a2, cap);
                return true;
            }
        }
        return false;
    },

    mergeMol: function (m, r1, src, r2) {
        var t = null;
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.a1.alias == r1 || b.a2.alias == r1) {
                t = { b: b, a0: b.a1.alias == r1 ? b.a2 : b.a1, a1: b.a1.alias == r1 ? b.a1 : b.a2 };
                break;
            }
        }

        var s = null;
        for (var i = 0; i < src.bonds.length; ++i) {
            var b = src.bonds[i];
            if (b.a1.alias == r2 || b.a2.alias == r2) {
                s = { b: b, a0: b.a1.alias == r2 ? b.a2 : b.a1, a1: b.a1.alias == r2 ? b.a1 : b.a2 };
                break;
            }
        }

        if (t != null && s != null) {
            this.extendDistance(t.a0.p, t.a1.p, 2);
            this.extendDistance(s.a0.p, s.a1.p, 2);

            // align
            src.offset(t.a1.p.x - s.a0.p.x, t.a1.p.y - s.a0.p.y);
            var deg = t.a1.p.angleAsOrigin(t.a0.p, s.a1.p);
            src.rotate(t.a1.p, -deg);

            // merge
            m.atoms.splice(scil.Utils.indexOf(m.atoms, t.a1), 1);
            src.atoms.splice(scil.Utils.indexOf(src.atoms, s.a1), 1);
            src.bonds.splice(scil.Utils.indexOf(src.bonds, s.b), 1);

            if (t.b.a1 == t.a1)
                t.b.a1 = s.a0;
            else
                t.b.a2 = s.a0;
        }
        
        m.atoms = m.atoms.concat(src.atoms);
        m.bonds = m.bonds.concat(src.bonds);
        return m.getMolfile();
    },

    extendDistance: function (p0, p, s) {
        var dx = p.x - p0.x;
        var dy = p.y - p0.y;

        p.x = p0.x + s * dx;
        p.y = p0.y + s * dy;
    },

    create: function () {
        if (this.dlg != null)
            return;

        var fields = { jsd: { type: "jsdraw", width: 180, height: 130, scale: this.molscale, viewonly: true }, rs: { type: "html", viewonly: true, style: {borderTop: "solid 1px gray"} } };
        this.dlg = scil.Form.createDlgForm("", fields, null, { hidelabel: true, modal: false, noclose: true });
        this.jsd = this.dlg.form.fields.jsd.jsd;
        this.rs = this.dlg.form.fields.rs;
        this.dlg.hide(true);

        this.dlg.dialog.style.backgroundColor = "#fff";
        this.dlg.dialog.titleElement.style.borderBottom = "solid 1px #ddd";
        this.dlg.dialog.titleElement.style.textAlign = "center";
    },

    hide: function () {
        this.clearTimer();
        if (this.dlg != null && this.dlg.isVisible()) {
            this.dlg.hide(true);
        }
    }
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* Formula class
* @class org.helm.webeditor.Formula
*/
org.helm.webeditor.Formula = {
    getMF: function(m, html) {
        var stats = this.getAtomStats(m);

        var s = "";
        if (stats["C"] != null)
            s += "C" + this.subscription(stats["C"], html);
        if (stats["H"] != null)
            s += "H" + this.subscription(stats["H"], html);
        if (stats["N"] != null)
            s += "N" + this.subscription(stats["N"], html);
        if (stats["O"] != null)
            s += "O" + this.subscription(stats["O"], html);

        for (var e in stats) {
            if (e != "R" && e != "C" && e != "H" && e != "O" && e != "N")
                s += e + this.subscription(stats[e], html);
        }
        return s;
    },

    subscription: function (n, html) {
        if (n == 1)
            return "";
        return html ? "<sub>" + n + "</sub>" : n;
    },

    getMW: function (m) {
        var stats = this.getAtomStats(m);
        var sum = 0;
        for (var e in stats) {
            if (e != "R")
                sum += stats[e] * org.helm.webeditor.Interface.getElementMass(e);
        }
        return Math.round(sum * 10000) / 10000.0;
    },

    getAtomStats: function (m) {
        var atoms = [];
        var list = [];
        for (var i = 0; i < m.atoms.length; ++i) {
            var a = m.atoms[i];
            if (org.helm.webeditor.isHelmNode(a))
                list.push(a);
            else
                atoms.push(a);
        }

        // chemistry
        var ret = atoms.length == null ? null : org.helm.webeditor.Interface.getAtomStats(m, atoms);
        if (ret == null)
            ret = {};

        if (list.length == 0)
            return ret;

        for (var i = 0; i < list.length; ++i)
            this.countMonomer(ret, org.helm.webeditor.Monomers.getMonomer(list[i]));

        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (org.helm.webeditor.isHelmNode(b.a1))
                this.deduceR(ret, org.helm.webeditor.Monomers.getMonomer(b.a1), b.r1);
            if (org.helm.webeditor.isHelmNode(b.a2))
                this.deduceR(ret, org.helm.webeditor.Monomers.getMonomer(b.a2), b.r2);
        }

        return ret;
    },

    countMonomer: function (ret, m) {
        if (m.stats == null) {
            m.stats = org.helm.webeditor.Interface.molStats(org.helm.webeditor.monomers.getMolfile(m));
            for (var r in m.at) {
                var s = m.at[r];
                if (s == "H" || s == "OH") {
                    if (m.stats["H"] == null)
                        m.stats["H"] = 1;
                    else
                        ++m.stats["H"];
                }

                if (s == "OH") {
                    if (m.stats["O"] == null)
                        m.stats["O"] = 1;
                    else
                        ++m.stats["O"];
                }
            }
        }

        for (var e in m.stats) {
            if (ret[e] == null)
                ret[e] = m.stats[e];
            else
                ret[e] += m.stats[e];
        }
    },

    deduceR: function (ret, m, r) {
        if (m.at == null)
            return;

        var s = m.at["R" + r];
        if (s == "H") {
            --ret["H"];
        }
        else if (s == "OH") {
            --ret["H"];
            --ret["O"];
        }
    }
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////


//org.helm.webeditor.Editor = scil.extend(scil._base, {
//    constructor: function (parent, options) {
//        if (typeof parent == "string")
//            parent = scil.byId(parent);
//        this.canvas = null;

//        var tr = scil.Utils.createElement(scil.Utils.createTable(parent, 0, 0), "tr");
//        var left = scil.Utils.createElement(tr, "td", null, null, { valign: "top" });
//        var right = scil.Utils.createElement(tr, "td", null, null, { valign: "top" });

//        var me = this;
//        var fn = function () {
//            me.canvas = new JSDraw(right, options);
//            if (options.showmonomerexplorer) {
//                me.canvas.helm.monomerexplorer = new org.helm.webeditor.MonomerExplorer(left, me.canvas.helm, { width: 300, height: options.height - 45 });
//                me.canvas._testdeactivation = function (e, ed) {
//                    var src = e.target || e.srcElement;
//                    return scil.Utils.hasAnsestor(src, me.canvas.helm.monomerexplorer.div);
//                };
//            }
//            if (options.onloaded != null)
//                options.onloaded(me);
//        };

//        if (options.monomerlibraryxml != null)
//            org.helm.webeditor.monomers.loadFromUrl(options.monomerlibraryxml, function () { fn(); });
//        else
//            fn();
//    }
//});﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* ExtinctionCoefficient class
* @class org.helm.webeditor.ExtinctionCoefficient
*/
org.helm.webeditor.ExtinctionCoefficient = {
    // εcalc = x(5500 M-1 cm-1) + y(1490 M-1 cm-1) + z(125 M-1 cm-1), where
    // “x” is the number of tryptophan residues per mole of protein, 
    // “y” is the number of tyrosine residues per mole of protein, 
    // "z” is the number of cystine residues per mole of protein.
    peptide: { W: 5500, Y: 1490, C: 62.5 },

    //Extinction Coefficient for nucleotide and dinucleotides in sngle strand E(260) M-1cm-1 x 10-3
    // Characterization of RNAs
    // [22] Absorbance Melting Curves of RNA, p304-325
    // Josehp Puglish and Ignacio Tinoco, Jr.
    // Methods in Enzymology, Vol. 180
    rna: {
        A: 15.34,
        C: 7.6,
        G: 12.16,
        U: 10.21,
        T: 8.7,
        AA: 13.65,
        AC: 10.67,
        AG: 12.79,
        AU: 12.14,
        AT: 11.42,
        CA: 10.67,
        CC: 7.52,
        CG: 9.39,
        CU: 8.37,
        CT: 7.66,
        GA: 12.92,
        GC: 9.19,
        GG: 11.43,
        GU: 10.96,
        GT: 10.22,
        UA: 12.52,
        UC: 8.90,
        UG: 10.40,
        UU: 10.11,
        UT: 9.45,
        TA: 11.78,
        TC: 8.15,
        TG: 9.70,
        TU: 9.45,
        TT: 8.61
    },

    calculate: function(m) {
        var chains = org.helm.webeditor.Chain.getChains(m);
        if (chains == null || chains.length == 0)
            return "";

        var sum = 0;
        for (var i = 0; i < chains.length; ++i) {
            var chain = chains[i];
            var ss = chain._getPolymers();
            for (var k = 0; k < ss.length; ++k) {
                if (ss[k].type == "RNA")
                    sum += this._calculateRNA(ss[k].atoms);
                else if (ss[k].type == "Peptide")
                    sum += this._calculatePeptide(ss[k].atoms);
            }
        }

        return sum;
    },

    _calculatePeptide: function (atoms) {
        if (atoms == null || atoms.length == 0)
            return 0;

        var counts = {};
        for (var i = 0; i < atoms.length; ++i) {
            var a = atoms[i];
            var m = org.helm.webeditor.Monomers.getMonomer(a);
            var e = m == null ? null : m.na;
            if (e != null && this.peptide[e]) {
                if (counts[e] == null)
                    counts[e] = 1;
                else
                    ++counts[e];
            }
        }

        var result = 0;
        for (var k in counts)
            result += this.peptide[k] * counts[k];
        return result / 1000.0;
    },

    _calculateRNA: function (atoms) {
        if (atoms == null || atoms.length == 0)
            return 0;

        var counts = {};
        var lastE = null;
        for (var i = 0; i < atoms.length; ++i) {
            var a = atoms[i];
            var m = org.helm.webeditor.Monomers.getMonomer(a);
            var e = m == null ? null : m.na;
            if (e == null) {
                lastE = null;
                continue;
            }

            if (this.rna[e]) {
                if (counts[e] == null)
                    counts[e] = 1;
                else
                    ++counts[e];
            }
            else if (lastE != null && this.rna[lastE + e]) {
                if (counts[lastE + e] == null)
                    counts[lastE + e] = 1;
                else
                    ++counts[lastE + e];
            }

            lastE = e;
        }

        var result = 0;
        for (var k in counts)
            result += this.rna[k] * counts[k];
        return result;
    } 
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////


/**
* HELM Editor App class
* @class org.helm.webeditor.App
*/
org.helm.webeditor.App = scil.extend(scil._base, {
    /**
    @property {MonomerExplorer} mex - Monomer Explorer
    **/
    /**
    @property {JSDraw2.Editor} canvas - Drawing Canvas
    **/
    /**
    @property {DIV} notation - HELM Notation
    **/
    /**
    @property {DIV} sequence - Biological Sequence
    **/
    /**
    @property {scil.Form} properties - HELM Property Table
    **/
    /**
    @property {JSDraw2.Editor} structureview - Structure Viewer
    **/

    /**
    * @constructor App
    * @param {DOM} parent - The parent element to host the Editor App
    * @param {dict} options - options on how to render the App
    * <pre>
    * mexfontsize: {string} Monomer Explorer font size, e.g. "90%"
    * mexrnapinontab: {bool} show RNA pin icon on its tab on Monomer Explorer
    * mexmonomerstab: {bool} show Monomers tab on Monomer Explorer
    * mexfavoritefirst: {bool} display favorite items first on Monomer Explorer
    * mexfilter: {bool} display Filter box on Monomer Explorer
    * sequenceviewonly: {bool} show Sequence View in viewonly mode
    * showabout: {bool} show about button
    * topmargin: {number} top margin
    * calculatorurl: {string} ajax web service url to calculate properties
    * cleanupurl: {string} ajax web service url to clean up structures
    *
    * <b>Example:</b>
    *    &lt;div id="div1" style="margin: 5px; margin-top: 15px"&gt;&lt;/div&gt;
    *    &lt;script type="text/javascript"&gt;
    *     scil.ready(function () {
    *         var app = new scil.helm.App("div1", { showabout: false, mexfontsize: "90%", mexrnapinontab: true, 
    *             topmargin: 20, mexmonomerstab: true, sequenceviewonly: false, mexfavoritefirst: true, mexfilter: true });
    *     });
    *    &lt;/script&gt;
    * </pre>
    **/
    constructor: function (parent, options) {
        if (typeof (parent) == "string")
            parent = scil.byId(parent);
        this.mex = null;
        this.canvas = null;
        this.sequence = null;
        this.notation = null;
        this.properties = null;
        this.structureview = null;

        this.options = options == null ? {} : options;
        this.init(parent);
    },


    getHELM : function () {
        if ( this.canvas ){
        this.canvas.getHelm(true);
        }else
        {
            return this.notation;
        }
    },


    calculateSizes: function () {
        var d = dojo.window.getBox();
        if (this.options.topmargin > 0)
            d.h -= this.options.topmargin;

        var leftwidth = 300;
        var rightwidth = d.w - 300 - 50;
        var topheight = d.h * 0.7;
        var bottomheight = d.h - topheight - 130;

        var ret = { height: 0, topheight: 0, bottomheight: 0, leftwidth: 0, rightwidth: 0 };
        ret.height = d.h - 90 - (this.options.mexfilter != false ? 30 : 0) - (this.options.mexfind ? 60 : 0);
        ret.leftwidth = 300;
        ret.rightwidth = d.w - 300 - 50;
        ret.topheight = d.h * 0.7;
        ret.bottomheight = d.h - topheight - 130;

        return ret;
    },

    init: function (parent) {
        var me = this;

        var sizes = this.calculateSizes();

        var tree = {
            caption: this.options.topmargin > 0 ? null : "Palette",
            marginBottom: "2px",
            marginTop: this.options.topmargin > 0 ? "17px" : null,
            onrender: function (div) { me.treediv = div; me.createPalette(div, sizes.leftwidth - 10, sizes.height); }
        };
        this.page = new scil.Page(parent, tree, { resizable: true, leftwidth: sizes.leftwidth });
        scil.Utils.unselectable(this.page.explorer.left);

        var control = this.page.addDiv();
        var sel = scil.Utils.createSelect(control, ["Detailed Sequence", "Sequence"], "Detailed Sequence", null, { border: "none" });
        scil.connect(sel, "onchange", function () { me.swapCanvasSequence(); });

        this.canvasform = this.page.addForm({
            //caption: "Canvas",
            type: "custom",
            marginBottom: "2px",
            oncreate: function (div) { me.createCanvas(div, sizes.rightwidth, sizes.topheight); }
        });

        this.handle = this.page.addResizeHandle(function (delta) { return me.onresize(delta); }, 8);

        this.sequencebuttons = [
            { label: "Format", type: "select", items: ["", "RNA", "Peptide"], key: "format" },
            { src: scil.Utils.imgSrc("img/moveup.gif"), label: "Apply", title: "Apply Sequence", onclick: function () { me.updateCanvas("sequence", false); } },
            { src: scil.Utils.imgSrc("img/add.gif"), label: "Append", title: "Append Sequence", onclick: function () { me.updateCanvas("sequence", true); } }
        ];

        this.tabs = this.page.addTabs({ marginBottom: "2px", onShowTab: function () { me.updateProperties(); } });
        this.tabs.addForm({
            caption: "Sequence",
            type: "custom",
            tabkey: "sequence",
            buttons: this.options.sequenceviewonly ? null : this.sequencebuttons,
            oncreate: function (div) { me.createSequence(div, sizes.rightwidth, sizes.bottomheight); }
        });

        this.tabs.addForm({
            caption: "HELM",
            type: "custom",
            tabkey: "notation",
            buttons: this.options.sequenceviewonly ? null : [
                { src: scil.Utils.imgSrc("img/moveup.gif"), label: "Apply", title: "Apply HELM Notation", onclick: function () { me.updateCanvas("notation", false); } },
                { src: scil.Utils.imgSrc("img/add.gif"), label: "Append", title: "Append HELM Notation", onclick: function () { me.updateCanvas("notation", true); } }
            ],
            oncreate: function (div) { me.createNotation(div, sizes.rightwidth, sizes.bottomheight); }
        });

        this.tabs.addForm({
            caption: "Properties",
            type: "custom",
            tabkey: "properties",
            oncreate: function (div) { me.createProperties(div, sizes.rightwidth, sizes.bottomheight); }
        });

        this.tabs.addForm({
            caption: "Structure View",
            type: "custom",
            tabkey: "structureview",
            oncreate: function (div) { me.createStructureView(div, sizes.rightwidth, sizes.bottomheight); }
        });
    },

    resizeWindow: function () {
        var sizes = this.calculateSizes();
        this.mex.tabs.resizeClientarea(0, sizes.height);
    },

    swapCanvasSequence: function () {
        var a = this.canvasform.form.dom;
        var h = this.handle;
        var b = this.tabs.tabs.dom;
        if (h.nextSibling == b) {
            a.parentNode.insertBefore(b, a);
            a.parentNode.insertBefore(h, a);
        }
        else {
            a.parentNode.insertBefore(b, a.nextSibling);
            a.parentNode.insertBefore(h, a.nextSibling);
        }
    },

    onresize: function (delta) {
        if (this.handle.nextSibling == this.tabs.tabs.dom) {
            var top = this.canvas.dimension.y;
            var bottom = scil.Utils.parsePixel(this.sequence.style.height);
            if (top + delta > 80 && bottom - delta > 20) {
                this.canvas.resize(0, top + delta);
                this.sequence.style.height = (bottom - delta) + "px";
                this.notation.style.height = (bottom - delta) + "px";
                this.properties.parent.style.height = (bottom - delta) + "px";
                this.structureview.resize(0, bottom - delta);
                return true;
            }
        }
        else {
            var top = scil.Utils.parsePixel(this.sequence.style.height);
            var bottom = this.canvas.dimension.y;
            if (top + delta > 20 && bottom - delta > 80) {
                this.sequence.style.height = (top + delta) + "px";
                this.notation.style.height = (top + delta) + "px";
                this.properties.parent.style.height = (top + delta) + "px";
                this.structureview.resize(0, top + delta);
                this.canvas.resize(0, bottom - delta);
                return true;
            }
        }
        return false;
    },

    createPalette: function (div, width, height) {
        var opt = scil.clone(this.options);
        opt.width = width;
        opt.height = height;
        this.mex = new org.helm.webeditor.MonomerExplorer(div, null, opt);
    },

    createCanvas: function (div, width, height) {
        div.style.border = "solid 1px #eee";

        var me = this;
        var args = {
            skin: "w8", showabout: this.options.showabout, showtoolbar: this.options.canvastoolbar != false, helmtoolbar: true, showmonomerexplorer: true,
            inktools: false, width: width, height: height, ondatachange: function () { me.updateProperties(); },
            onselectionchanged: function () { me.onselectionchanged(); },
            onselectcurrent: function (e, obj, ed) { me.onselectcurrent(e, obj, ed); }
        };

        this.canvas = org.helm.webeditor.Interface.createCanvas(div, args);
        this.canvas.helm.monomerexplorer = this.mex;
        this.mex.plugin = this.canvas.helm;

        this.canvas._testdeactivation = function (e, ed) {
            var src = e.target || e.srcElement;
            return scil.Utils.hasAnsestor(src, me.canvas.helm.monomerexplorer.div);
        };
    },

    onselectcurrent: function (e, obj, ed) {
        var a = JSDraw2.Atom.cast(obj);
        if (a == null || ed.start != null) {
            org.helm.webeditor.MolViewer.hide();
            return;
        }
        var type = a == null ? null : a.biotype();
        var set = org.helm.webeditor.Monomers.getMonomerSet(type);
        var s = a == null ? null : a.elem;
        var m = set == null ? null : set[s];
        org.helm.webeditor.MolViewer.show(e, type, m, s);
    },

    createSequence: function (div, width, height) {
        var atts = {};
        if (!this.options.sequenceviewonly)
            atts.contenteditable = "true";
        this.sequence = scil.Utils.createElement(div, "div", null, { width: width, height: height, overfloatY: "scroll" }, atts);
    },

    createNotation: function (div, width, height) {
        var atts = {};
        if (!this.options.sequenceviewonly)
            atts.contenteditable = "true";
        this.notation = scil.Utils.createElement(div, "div", null, { width: width, height: height, overfloatY: "scroll" }, atts);
    },

    createProperties: function (div, width, height) {
        var d = scil.Utils.createElement(div, "div", null, { width: width, overflow: "scroll", height: height });

        var fields = {
            mw: { label: "Molecular Weight", type: "number", unit: "Da" },
            mf: { label: "Molecular Formula" },
            ec: { label: "Extinction Coefficient" }
        };
        this.properties = new scil.Form({ viewonly: true });
        this.properties.render(d, fields, { immediately: true });
    },

    createStructureView: function (div, width, height) {
        var d = scil.Utils.createElement(div, "div", null, { width: width, height: height });
        this.structureview = new JSDraw2.Editor(d, { viewonly: true })
    },

    resize: function () {
        var d = dojo.window.getBox();
        var width = d.w;
        var height = d.h;
        var left = d.l;
        var top = d.t;
    },

    updateCanvas: function (key, append) {
        var format = null;
        if (this.sequencebuttons != null)
            format = this.getValueByKey(this.sequencebuttons, "format");

        var plugin = this.canvas.helm;
        var s = null;
        if (key == "sequence") {
            s = scil.Utils.trim(scil.Utils.getInnerText(this.sequence));
            // fasta
            s = s.replace(/[\n][>|;].*[\r]?[\n]/ig, '').replace(/^[>|;].*[\r]?[\n]/i, '');
            // other space
            s = s.replace(/[ \t\r\n]+/g, '')
        }
        else {
            s = scil.Utils.getInnerText(this.notation);
        }
        plugin.setSequence(s, format, plugin.getDefaultNodeType(org.helm.webeditor.HELM.SUGAR), plugin.getDefaultNodeType(org.helm.webeditor.HELM.LINKER), append);
    },

    getValueByKey: function (list, key) {
        for (var i = 0; i < list.length; ++i) {
            if (list[i].key == key)
                return list[i].b.value;
        }
        return null;
    },

    updateProperties: function () {
        switch (this.tabs.tabs.currentTabKey()) {
            case "sequence":
                if (this.sequence != null)
                    this.sequence.innerHTML = this.canvas.getSequence(true);
                break;
            case "notation":
                if (this.notation != null)
                    this.notation.innerHTML = this.canvas.getHelm(true);
                break;
            case "properties":
                this.calculateProperties();
                break;
            case "structureview":
                this.updateStructureView();
                break;
        }
    },

    onselectionchanged: function() {
        switch (this.tabs.tabs.currentTabKey()) {
            case "sequence":
                if (this.sequence != null) {
                    this.sequence.innerHTML = this.canvas.getSequence(true);
                }
                break;
            case "notation":
                if (this.notation != null)
                    this.notation.innerHTML = this.canvas.getHelm(true);
                break;
            case "structureview":
                this.updateStructureView();
                break;
        }
    },

    calculateProperties: function () {
        if (this.properties == null)
            return;

        var data = {};
        this.properties.setData(data);
        if (this.options.calculatorurl != null) {
            var me = this;
            var helm = this.canvas.getHelm();
            if (helm != null) {
                scil.Utils.jsonp(this.options.calculatorurl, function (ret) {
                    data.mw = ret.MolecularWeight;
                    data.mf = ret.MolecularFormula;
                    data.ec = ret.ExtinctionCoefficient;
                    me.properties.setData(data);
                }, { helm: helm });
            }
        }
        else {
            data.mw = this.canvas.getMolWeight();
            data.mf = this.canvas.getFormula(true);
            data.ec = this.canvas.getExtinctionCoefficient(true);
            this.properties.setData(data);
        }
    },

    getSelectedAsMol: function (m) {
        var ret = new JSDraw2.Mol();
        for (var i = 0; i < m.atoms.length; ++i) {
            if (m.atoms[i].selected)
                ret.atoms.push(m.atoms[i]);
        }

        var atoms = ret.atoms;
        for (var i = 0; i < m.bonds.length; ++i) {
            var b = m.bonds[i];
            if (b.selected && b.a1.selected && b.a2.selected)
                ret.bonds.push(b);
        }

        return ret;
    },

    updateStructureView: function () {
        if (this.structureview == null)
            return;

        var selected = this.getSelectedAsMol(this.canvas.m);

        var m = null;
        var branches = {};
        var chains = org.helm.webeditor.Chain.getChains(selected, branches);
        if (chains == null || chains.length == 0) {
            if (selected != null && selected.atoms.length == 1) {
                // only a base selected
                var a = selected.atoms[0];
                var mon = org.helm.webeditor.Monomers.getMonomer(a);
                m = org.helm.webeditor.Interface.createMol(org.helm.webeditor.monomers.getMolfile(mon));
            }
        }
        else {
            m = chains[0].expand(this.canvas.helm, branches);
        }

        this.structureview.clear(true);
        if (m == null)
            return;

        if (this.options.cleanupurl != null) {
            var me = this;
            scil.Utils.ajax(this.options.cleanupurl, function (ret) {
                me.structureview.setMolfile(ret.output);
            }, { input: m.getMolfile(), inputformat: "mol", outputformat: "mol" });
        }
        else {
            this.structureview.setMolfile(m.getMolfile());
        }
    }
});
﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////


/**
* AppToolbar class
* @class org.helm.webeditor.AppToolbar
*/
org.helm.webeditor.AppToolbar = scil.extend(scil._base, {
    constructor: function (parent, imgpath, buttons) {
        if (typeof(parent) == "string")
            parent = scil.byId(parent);

        this.div = scil.Utils.createElement(parent, "div", null, { position: "absolute", zIndex: 1, top: "-70px", width: "100%", height: 80, background: "#eee", borderBottom: "1px solid gray" });
        var tbody = scil.Utils.createTable(this.div, null, null, { width: "100%" });
        var tr = scil.Utils.createElement(tbody, "tr");

        scil.Utils.createElement(tr, "td", org.helm.webeditor.AppToolbar.Resources.img("helm20.png"), { width: "30%" });
        var td = scil.Utils.createElement(tr, "td", null, { width: "40%", textAlign: "center" });
        scil.Utils.createElement(tr, "td", null, { width: "30%" });

        tbody = scil.Utils.createTable(td, null, null, { textAlign: "center" });
        tbody.parentNode.setAttribute("align", "center");
        var tr1 = scil.Utils.createElement(tbody, "tr");
        var tr2 = scil.Utils.createElement(tbody, "tr");

        for (var i = 0; i < buttons.length; ++i) {
            var b = buttons[i];
            scil.Utils.createElement(tr2, "td", b.label, { padding: "0 10px 0 10px" });

            var d = scil.Utils.createElement(tr1, "td", null, { padding: "0 10px 0 10px" });
            if (b.url == null)
                d.innerHTML = org.helm.webeditor.AppToolbar.Resources.img(b.icon);
            else
                d.innerHTML = "<a href='" + b.url + "'>" + org.helm.webeditor.AppToolbar.Resources.img(b.icon) + "</a>";
        }

        var me = this;
        scil.connect(this.div, "onmouseout", function (e) {
            me.div.style.top = "-70px";
        });
        scil.connect(this.div, "onmouseover", function (e) {
            me.div.style.top = "0";
        });
    }
});


org.helm.webeditor.AppToolbar.Resources = {
    img: function (key) {
        var s = this[key];
        return "<img src='data:image/png;base64," + s + "'>";
    },

    'arrow.png': 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHvSURBVHjaYvz//z8DuQAggJjQ+H9+/fjw5tXLDz//EmEmQACha/78+unJ/Vu2H77x5MMvgvoBAogFjf/zx8/XD66ff/3q519GHycNST42JtyaAQIIi9R/hv8/P7+4emTTxr23X3/9g8d6gADCZe7/X1/fXDu0evXO2+9//sOlHyCA8Djq/58fH67vX7Zk6+2vfxmw6gcIICa8IfL/759P1/bMm7vh5odfWOwHCCAmwhHy/8fN/YuXbrn1+tuff6gyAAHERExi+Pf3y43DK9bsvPniM4oDAAKIibi0BPL/jaPrN+29iRz/AAHERHRaBIX/9WNbdp+49/Lzb4h2gABiIUYfM6eMtr4sFzMjIwOLiBAXOzMjRBwggFiIczSbgr6Nrjg7KxMjKxcvHwdUN0AA4XI2UJGgkpGtgSIrKMD+vH76+j+/kLC4uIgwLzsrzGaAAMKimZGBkZ1HRNXIydXJ0tJQlQOo8v/nO+evP/vyGy2rAAQQumY2dnYhaVUtY1t7W2NdBTFFTX1lQZCaT0/P33j4+QdqTAMEELqfeQTFdM0dlDmkVKS5mRn+cYmqGOuI3Tj0ioOX7T/QXlSbAQKIEX9J8v/fnw/3T2w7/opXUklLT0NeGBRmcFmAAGIkXAz9//X58z8uXlgQIwGAAAMAMJ7FYOAyZgwAAAAASUVORK5CYII=',
    'canvas-1.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAFx0lEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAATTA1gMEEE7rWX+/Zf9yjXIL2H4+Z/9yHZcsQADhtv7DRa6rHcz/f1JiNyPDf9aX+9kercWlACCAWHBq/feL4c9Xhv9/gWYw//vO+hnog/8kh+3XJ2x35vwVtcClACCAcFr/n5mD4d8fxn+/GZgYmH++5LzSxvCfZOsZfn9i+Pr0vwQXLnmAAMJtPSsf0OtMf78xsPD/5pT9YjoF4XlGiApULlwEicv66Sr7xcb/HOK4bAEIIJzW/2MTAprE9PM1A7vkfwbm32wSZMT9f0F2djb+f7xKuBQABBBe65k5mL/cYeDTAydRcEiQmuzfnGD4++MPjwouBQABhNP6v8y8vyXdmN5dYpQK+M/AxP7uFMf1XmSPIYUyDu7fnwxfH/8TtfjDIYXLFoAAwh33DIx/RMw5z5UKPF3GIO/H8OcVg7ABqgV4ox2YZd5dZfjz/Y+Y9T9GVly2AAQQC75ky6PKJqjP/HQvg7Qzg1oc2FhYemNkxMcFgq9PGa5M/M/I8kvCFY8VAAGEz/q/TJw/leK5TmYy3JzHoFfCwCEKtuMvw4/XoFLhP1LSZ2RA4QLVPNjI8PzAb/Us/GkWIIBY8KedX7xaLJp5bNf6GFi4GbSyGDiEQWXR5QkMn+/jjDSg3b8+M3x59Ecu8LukD37zAQKIgPXAFPBNOojx53vWG1MYfrxhMKhgYGJh+PIEFLZYcgvQ4vcM354z/P/zVyXhm3r+P0Y2/OYDBBAjka0drueb2U8VMAjrMpi0MYgagxzByIQU32BPf7jOcLGb4cmeP+qpX1Xz8KQ4OAAIIEbiG1tsPx5z7/Vk+P2FQT2JwbCSgUMEEd/AwvX6LIbrMxh+f/ths/C7oDmRZgIEECNJbT1gouJ+uJD1bCUDCw+DTjaDRgbIEUzMDDfmAP39R87vm0bpX0Z24g0ECCBGMpqazP9/AOtilltzGNj4GBT8GNQSGHiVPvxk/Y9S8hAFAAKIkeyWLvO/b3yXqhiApcL/fwySNp8M+/8ycZFqCEAAkdzY4nxzQOCgJ/v3+yDLzNoZ3NYyqMUyvLvCt9uB++kaYNVAkmkAAUSC71n+fOS60sj8/ACDhDWDYQ2DgBoo6UFKoU/3GO6tZni27x+v8ne9xl+c8kSaCRBAxFrP8ekKx4Vaxn/fGTRSGCTtGHgVGRiZESXuvz+gkuDVCYbbS/7/ePtLu+S7qBMxSQEggIiynvPtIY7ThaDyBFhzixgysPFjaxzyMSgGM/z7yXBnKcOrU79UU75LB/9jJFCsAQQQC2G735/kOF/FwMrLICLJwMIJCmpg8YfS7gOV+KAagZmFQUSfgV2QgW0J290FwOABlpjAyhqP4QABxEKoqHnKdnMKg5Aeg3IkAwsHSp2GVssBXcYtC4oRfnUG9QRgmmC7M/cflyz+IggggPBZz/T/D9uTdUx/fzBoljBI2oJLHdw1LLIIrzKDSiTDtxdsdxf9NtT6w8yLywqAAMJnPev3h6x3FzHwazB8f8HwYBP2Kglr+uKWYuBRYJB2Ybo+g+31kT8SnrisAAggfNazvDsDimaWRwzX55BWOEjaMCiFM4gYMPCrsbzczyjhgSsXAAQQC55Cjfn9BQYBTQZJe5JLRGAGASYFdiEGIR3muytYfr3E1egACCDc1v96z/z+KoO8D4N+Bc7kRpALTowsn+/+FsZuPUAA4bSe6ddbhr/fGYAZ98tDcqoEVh5Q8QDMhKx8zF9uMwhbY1UFEEA4rWf8/ZHh2zOG5wcZvj7B0a/BywWWTtKuIEewcjECyyscACCAcFv/5xuoEQFswODWjK+RyK/77TcHA5uqADMX45/PuJQBBBDeYkfM4rP5PDy5lojmyb/fgkZMXx/gUgAQQLh7Odxyv+TD/zJzU9K/B5a4fwV0/rMJ4lIAEECMAzuwBhBAAzy2AxBAA2w9QIABAKhg/GFIL73sAAAAAElFTkSuQmCC',
    'canvas-2.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADt0lEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAATTA1gME0ABbDxBAA2w9QAANsPUAATTA1gMEEFHWP3j0jFRzf/789e79R4LKAAKIhRiznj59riAnBWT8+fOXGPVAZY+fglwsJMiPXyVAABFl/X8gBIPb9x7ChMAijIxY2IyMf/78efvmrZSUJEGTAQKIKOt5uLn+/fvPxMSoqaZEZOC/fPUWqIWgMoAAIiruBQQEfv76Bfc2QfTz1+8fP3/x8/MQNBkggIjyvYSYyOu372WlxX/8+AWJVHwx9Z/hxctXoiLCXJyEAx8ggIiynoOD7cuXLwwM4kCGqrICfsV///779v0nPz8fMSYDBBCx+V5cTOTh4+fEJfs/IsIC4qLCxCgGCCAWIq0HZqH3Hz4BXSAvCwrSL1+/vf/w+d+/f2gW//r9G8iQl5FiZibKYwABREKpp6woC7Tg8dOXQDYnBwcLCwsbDDAzM3/79uPps+cfP36SlZbg4uIg0kyAAGIktbH17MVrRgZGQQE+BkYmIMnGxgosZJ69ePXq1Rtubk5hIQF2NlbiTQMIIEYy2nrA9P/x0+eXr9/x8/EKCwsCS4U/v38Bcxo3Fyek7CEeAAQQI3lNzf///9++++jjp0/MzCyCAvzyshJMTOTUXgABxEKW3aBSXVVFEZgAnz9/+ebtOx5uTmBEsLAwk2oUQACR7HtgEnvx6s3Pn7811JX5+XiAJevbdx+ePX8JtJubiwPoCEZSIgAggEiz/vmLNxcuXZaXk5eSFOfk5GBkgtrExsIEjI43bz98/vJVXpbYXAcEAAFEgvVPnr28ceMWDy8vBwc7mgUc7OyQ0vDDx8+vXr9VlJdhZSUqWgECiFjrgdF8/+ETbQ1VJiZGtHSAFtjA2Hn15h2wdCImFgACiNhQunPvobaGCprd8FoeGQDLHGChCywiiTEWIICICiJgBfrkyVMWZmAxR6BIkRAX5ePlBpaJX79+J8ZkgAAiyvoXL9+oq6nISBOuQCFFHjBlAIthYHOPnZ0Nv3qAACLK+k+fP2lrqGGGPD5zWZg/f/lG0HqAACLK+sePn3JzcRNsN4KSEhMTsAhiAoMvXz8DEwF+9QABRJT1f//+BRqHVr1iBf9AANgqBLqDEaiLoHqAACLKeilJCUhDm3jAysICLJcIKgMIIMaBHd0ACKAB7mQBBNAAWw8QQANsPUAADbD1AAHEQjujmf/9AHf/mP4yAwsf7EUWQADR0Pq/TIQzHkAADXDgAwQYAMXQUECyhsOVAAAAAElFTkSuQmCC',
    'helm20.png': 'iVBORw0KGgoAAAANSUhEUgAAAHYAAAAlCAIAAAAY34ofAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAKIElEQVR42mJ89+4dwyigJQAIIKbRIKA1AAig0SCmOQAIoNEgpjkACKDRIKY5AAig0SCmOQAIoNEgpjkACKDRIKY5AAig0SCmOQAIoNEgpjkACKDRIKY5AAig0SCmOQAIoNEgpjkACEAplSQBDIMgFf//4gj10MkpS+sNZRAd8sqQaBbu62EVAUzMGt3RgumZGfGqiCWLCbeLqcAxBOIoZeLLqS1XpHsA/4LVRmS+e8G1HgFEIIj/fHx2aM+Bd3wang5G3Kzosk9Oblm69655SIqDGg+Q++vFtdXrtt5+9v7n3/9glzEwAj0EDEhGIItD2dghwMNWkIPh77c3O9ZseMujFhLgyMX0F3vm+v/n6rFdO47fNXT0sjJUZsMaJv9+nt+5aseFTy7xaaZSrPjC6M/Pp/dunD59+trdp/+5RC2tbU0NNPk4CSevf7+/379x6dLVu9+Z+LR1NWQkJQT4uJmZSAtrgAAiYM37x/dvXrr0hI/RyEBLSZQDJVn+/3Xt4PH3X1j2H7vnoKYHFLm5f9e9Z29//GNlZ2dBdsf///+BYf3y1etP3/8IcrB8e3Uf6Nf//N/uvrPXFcFh8c93V65eev3mw84tWxiYA+z0FZgY/6OlydtHNqw/dPXXf4atp56aBijgDN9fX0/v3bjz8KWvwBQMBN8f7d689vxl4+QEP0G2//jC98eHozs37Ttx7TtY1aVzRxhZeZR1bUL87AU4SAhlgAAiEMT//oEQw38c+QecWhlAJQkDI8P/r59+AxUz8Um7OJiIC/EB0zAwAf8D6QeVEwIiYmKCIOv+M4LM+w8sZP7h9CEjEwsw/YMUf3++Z/tOPp4gIxWU2Hh549Ca7ed/QQ3A6WGgVY9vnD109PJ3Zk5eIUEBHlbGnx/fvPrw9umVDUeNEh2lcdZR//9cO3346OlrP1k4uDk5OVgY/vz6+ePH1zuXj61n44sPMGZi+E9kEAMEEAvB8gvsUkYGLCXRf5gHGcHEvy+fvgGFmGVNrc2N8WQmoAww8ICx8w9kAA51TCzMjMywwur+9u27uEL8NSS5ISJfnl1dvWLnR7gf8ZSSvz/fuHj83R9mPgVtKw9fZ02ur/dOblq47syn32/vPGPAHcTfX905e/b0h7+sQI0mpoZawv/ePr5z49L5S4++PLx58tY7Yw0hYlMxQAARKPjBJSkwLIFR+AtN6u/f37/+Iiei/7//Q2IWT+qEKGcGhwkwD+BOxYzAOgmUjEFlORPjl2fXdu7c+/TTH1CJ//HZ+oVLnvwCxgLhau7vr+8/f/5gZheWlFXVUhXjYgSlxV+g2ouRlYMVT9p/dPv+y9e/GDnlNPUt7G1NdA3M7ZydHK20hZj+/fz55fzNl8QXFAABRKjIZwSF37/3t9Yvmy3Ex/XzBzCzfPvx4+fv33/+gurn/wxIcfQPkujuH9246SUfN/t/EIBEFKuorIqOmjwb039wIcAEDJrfoEjCHRWgehKUd3jEpfiZ/n579eL5zXPbtzE7WOte2zTv6kcGFk5uMXUVzqsX7v5GZCcsSYRbzMozWv49o7yKIt/vj68enjuwbc/lTwwsPFxqJqo4df35evPOjQ9/GTllZaUVZETZQCmCiYOHT1RKnpPx9c/fH5+8ZmAQIzKIAQKIQBAzMoLD+O+vj29ffXyLO+cjJ+YvL0+fwIhkjjt/I0NM1YWQNeBJ7KBGEjh+2cS1zbQFft86svvM0zsXDgMRSD+7gLC6U7gX9+FrFwgYxMAoJK0iJA2tvvZs3HL00Q9Gdn51Mx9PTW7cNeSX7z9//GNgFhbkF+bngaYiRjZ2Th4BQUaGp39+fnj7F9j4+/+PmCAGCCAiUjE4CplZ2Xh5eYCAm5uLA9hiYGH89undo7sPvv7HDGrMVMGhrKOuIicIq8pAqRgYin9ABT0zntgFG8iko2nIqa7C8H/JtjMP/4JTppKmVVy4OQfDN2ik/iNc8/z99nbn0llHHn5nYBPQsfCOcNNgwF1f/QO2tkE5lIGVhYUN6FV4HczEwgpqP/7/8uULPqejAoAAYiGiLGZkFFCPjg7UkuVDbWx+29LZfPQruhZWncC6KDNW3PUdqHgFtyn+/cOXfVA4bLzmHsHv3sw69uCnuKKWl48dOyOo4GeCVcoEWvdf3+xbu+TY/U/A8NW1dA/z0MPfHmBi5WRlZWVk+Pb124+v33/+Z+AEu+bP79/fv34GdcR4ePiI770ABBDBVMwILo6BVQsLZuizYA0VJlZmUC7Hl3mZGMGNtv//Sag0eMS8U0ptPn5l5ebn4UDNN3jN+fvt3ZEtq4/efPmXmV/P0jXI3YiFkYC9wBhVlFO6dvfMu+cvnz9/801WlhsYJ7++fX738tHHf8C0zSUuRmQpAQQAAUSoLAaH3H9QF5JwcDDhKSvQajJwQYGvuvsPrSwZkZIzEwu7oDA7lkoAT8vk7/dLx3YevvL4F4uQrLZVkJsxOxMRpQojm7ycjCjPuYevb1w+JygkwG4iz/X98Y0Lpy89/c3IysupriNHfOIACCAWolT9J5BSUNz36OShY7/EhPiZIC0+SOgws/IJiYoK8jBC0j9Q2c/PN0/sUvinDml9Q5sebPxKCpIsTFA7GYiLMzzgx/sXt65c+/b7HyP7729vbl84x8HGwghqEQIBCws7l6CivASk0Pj06tlXJj5JER6IRhFlLW3t6y9O3np18/iOFzeOcTH///Hp/bsPv5m45OUNzBS5YA0owgAggAilYmZwKDFi9SwjIxO8XQdqA7BxsAHb7P8+Pd236yWoA42cAhmZ2ETUw0L8lETZmZhZgOXc/z8/n988u+LeeUiShVnH7RCRbKciCDOWEQIY8HelcJf7zMAylRWcbn9//fDi/vat9yFWgU1lYmLnMw/NcFPmYPr6eMfmLS9/CYXGhkjwgCtjVj4TW6e3bz+evf3i/Y+v74GuAY0DsInIqft4W3Mw/iM+mgECiLm8vByPNBsby9ev33hlVA20FDhYGNHGzpj/vrv14o+du7OCMDBwGfl5/9+5/+Dbz79A8AcGfkPAX0ZhGWUDHTUedkYWNs4/7x7cf/nhz1+oLEzt3/9swuaWpqI8rP8ZWblY/j1//cPa3lZWhAt7EDKyMP14ducds7OXsxw/C462DK+ktDTjr2/v3r3/+Qto0V8IANsGtE7I2sZClAvUBn947fInNkljfRV2ZqhtrFwCShoakkI8H9+8+PHrPwuvuK2Lh6+HnTgfG0k5CSAAp+a2AyAIguFhoL3/28ZJqWZeZHPrBTgNGP83YPnTdk0xzMFjdVFHGrUXPj60HSARdopYTSPh+r7S0lYyDeu2hJnG4jnTgrSEElUx896/cM8NJNwLPRjWT9k+cafCccRFbOHox+JqAohxdNkgrQFAAI3OetAcAATQaBDTHAAE0GgQ0xwABNBoENMcAATQaBDTHAAE0GgQ0xwABNBoENMcAAQYAIKsCm3IdpQWAAAAAElFTkSuQmCC',
    'monomers-1.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAIBElEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAATTA1gME0ABbDxBAA2w9QAANsPUAATTA1gMEEGHrmf5/Zv73llRzmf+9Z/77ipHhP35lAAHEhNfiryyfN7M+CGV+EA426zcTwy8iLP4A0vu6j/lhFMuHZSw/rzEy/MGlGCCAWLAb8f8j44d1zF/2MXEa/OfUYfj9nP3zpv9/3v35/5dRKPkvsxhO497PY/xx9a9k7382RaZft1lZ2f+87mBklfkvEPeHXQNTPUAAsWALkN+MH9Yyf1zHwMTCIuLGxCH3/9/vvx+O/v16iunPcwYWGQZ+j79Momi6GBn+MX87wvjzJgMzP8uvu38Ek7jEvIF6/345z/Tj0r+3M5jFy/4yS6HpAgggxs/XMn5LtEE4rG/7GX7cA7vgJ6toNIugHSOrAAPDv7/f7jIycTCyCv/9eOb3qxV//34BqeZ1/sPn+5+BmfnvS6YXLSBdv++ziGezivoysvIw/PvHwMTE8A8Y7P//fDjx+9Xyv///MPz9zsDE9k+8+i+TENAKpi/7AAKI8fPlaAZmrv9CyYyftjL8esj44wojMye7ymxmLjWwk/79//vj1+PpDAx/WMRDmTmV/nw4/OvpxP+/HgHl/nMaMbAIMPx6zvjzOiMTOzN/ALtCAdACoIMZmJgZ/v0Ghh/EHf9/f/55v+nv5wNATf+5LRkYWRn+fWL6/RAggBg/vb7K9DAWGhSMzEz8XqziEUycCoxAFYxMQCGG/3///Xz569m8f19PswgFsoh4MPz7+fvlxr8f1vz/+xWki4mdiduKVSqZmUcT7OC/YMOALmCFhcFfoKJ/P5/+frHu78et//+A8hEjM/dfmWkAAcQIrO9Zf99gfJwDFOLUXs/EJgEKe0ZmoK0g60E5B+iCf////wKG5L9vN3+/2czw9wuLiP//f79+PawARgoTnxuHYgU41bDD/A3MIMxgESZwqoA5COj1/39/PZr2591yBon6X1y2AAHEhJwAGZn5fr1Y/vPhJKBLYXYDyX/AMAB6kZGFm5lXj0XQ6f/fb38/nGCA5mlGkFuByqBhzgQOc1ao3cC4h9gNNA0oyMjCyMgOJBlgmgECCGIxLF/+//v/x8v/f96AZf+DlfwBu4MRIg20iZnfgolTBeimf9/vIVI9IziOQSH/Bx7fIDYoFP+DTfjL8I8REsFgLiiigSRAAKEWOyChfyD0/x/Y35CQZ4A6H8QGhgMLE7sEE7s0WDEMANUzgsMJqAtiN8jFTCC7QYEHNgdk8X+Yt4EyoFABCCAWlLIPmDdAdvwHKQW6lxFsN4j9D5gDIP6Eeug/cmn6H5JCoVKQtAYJMFDiZQI5DqT8H9gosFthvgcIIFTrgUKMjFCzGGBhBfITI5jHCLIJEsjQ8ICDf9C0wghN59jCHOyx/3AngwBAAKEGPlT6PwM0kBhhYQ6WgsQFIyQM/sMSBAMsgsDplBGWSkAOAtJgWyF2QQ2EGw0CAAHEAvUIlxEDEzc4xULMZYT6G+IgRkao14Ex9v3e/5/PmLg1IWGIcAEDOL7+M0JjHeTXf7CAYYQZ+w/mJSgACCCQ9b9ZlTmkUhn+/QAmYBYRV6ANjGzCUKVQu8G++/f7349Hf97s/v/3PSurKAOiMv2PiKP/DNAwR+hlhAYn4z+on5GSDUAAsYAj4Nffdwf////OxC7DxKXGCMzBkAKLEar238/nfz+e/P/nIyO7NKhoAxYvjMz/vj8Am/X7/88nQAVMbOJg9f9ACegfLNFAEgHE38Bk8/v9vy8X/32/BrceIIBA1jP+//bn3QqQUWJh/z6eBJrOzKsPjA9ITP/9evPP231AHzNzazJxKjGyCP7/8fDP2z3/vp4Ap5Y/DD+v/n62kInPjIXPFFTZ/P8HtQ+S1mDB8/fzxT/vj/37eur/zzvAsvIfsxBQAiCAQNb/ZRRgEq9i/Hn3029xts/7mL6fZ/gfy8xnBKx7wGUlsJpiZuGxYuY3B8bO30/ASm/N/+9ngX5hZFdkZBb9//PK3w8b//24/u/7fXbpOFAZCk2AkDwMSjH/fjz+/WbLv0/AiPvGyGP3jz/kD5sqUAVAADHC+3jAav4fAyvr99NM7+YysQFjQYuBmYOZz4yJVfD/v+//fjwFGgEMin9fgaF3+b9AxH9O/X8sYv8ZOZiAFe6vxwwftzL+uMgingqszZjYZVkELMHFwL/fb3cAa1xgEfn/+/V/PA7/2TX+sSn+ZeSFWAoQQIyYXUyWvy+YXjYz/LgFYgsGMQvaAwv832+3/fu44/+/nyC3C8X8YVH4z8CE2kB6z/zlOMPrPlBYy878yyrPw/QIWHP+uJ3378cNRlA13/iH0xhNF0AAMWLt4bL8uc/8YTXDl4NA5zMCG1uMLP+BzZi/P/5zGv4TzfnDLImrscX2fjbjp80/5TexfVrL9O0Mi7Dn71dL/jOL/Ofz/M1li6keIIAYcXWwmRm+Mf24yfj1EOOXPcBoBur/z2X5j0MNmFDwtDOBKZXl9+3frBrsj8IZ/n78J17BwMT/j10e2ETEqh4ggBjx9++Z/39mfV7x/8/TP7IL/zLyE9/QZv1+iuHfl7/ctsD0hEcZQACx4DflP7B6ZuJkYORiYCCtQ/Kb04wYZQABRNDQ/zTt5QAEEJF+YqSR9QABxES0xTQJBoAAIhT3DEz/uKwYft8HNY1pAAACiHFgR7YAAmiAO9gAATTA1gME0ABbDxBgAHggOaqwTElCAAAAAElFTkSuQmCC',
    'monomers-2.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADiElEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAATTA1gME0ABbDxBAA2w9QAANsPUAATTA1gME0ABbDxBAA2w9QAANsPUAATTA1gMEEGnW////nxg1//79I9JAgAAiwfq/f/8+efIEWEPid8SDBw/u3LlDpJkAAYTF+t+/f6OJfPjw4fLly3/+/GFjY/v58+f79++vX7/+69cvNF1XrlwBOk5RUVFYWBio5cKFC1++fMFvPUAAsqdQBYAQiqE8UTC8aFDB5v//h9XgF4hiMQjGGxeu3No2tvdGf6m1xswhBCHEvRcUu621RBRjPOfMOffepRTnXEpJSonFvXellNaaX6y1UFVrRTDnDAuvjDG898aY79YjgBixNje+f/9+6dKlb9++AcNZQEBAS0tLRESEmZkZ6Kf79+8DFQgJCQHDAMgGigCtB3I1NTWB/gaqgRsCTAGPHj0ChhPQxUBzDAwMxMTE0CwCCCBGPK2d3bt3q6qqKikpAX0AtAMeyM+ePQMmAj4wuHbtGtAaZ2dnZD8hA2BkHTp0CBgdysrKmLIAAYQv6QG9ArQYGAxAj8IFgcEoLy9vZGQE9ArQKZycnMAEgctuIABGB1AB3PVoACCAmIhJ8JhJHWgrMOKBYU5hvgcIIMLWAxMg5YUBLkMAAoiJ8qKGoPvwAIAAYsEjZ2dnB0nJaFELTE1Pnz4F5klgBiO+KMQqDhBA+KwH5hkuLi5gigWSEBFgyQNM9sAsDhSRkJAA5ihgxgP6HpjLgTkTqyHAnAVUxsvLi1UWIAAfdXACAAzCUHQO919KhEzgEn2nnkrvSowk/yfPHA0COINC4ra7TIOPsiWBB++R7e52ELxoyl03OTOIpCxV9ZQ4AoiRYC8HGM7A0grIAAYDsAgCGgr0PTDf8/DwAN0E8TTQ9/fu3QOGjYqKCrCoAIoAS6Tbt28DGUA1UlJSuNIHQAAxEtPJAvoSaBzQx0ALgHkdmI+BtgI9hJybgbJAZwEDDJhQgDENTB9ANwGLWKDX8ZgMEECMxPfxIF4EBgCw2AEGOJ4aD2g9sAAmxkyAAGIkqYsJNBrob2CwU6u5ARBApDU3gBbj8TcZACCASLOe+GYMkQAggFhIUg0s5IG1PhWtBwgg0nxPXbuBACCABrilCxBAA2w9QAANsPUAATTA1gME0ABbDxBAA2w9QAANsPUAATTA1gMEGAAj0m/VIoHc6gAAAABJRU5ErkJggg==',
    'settings-1.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAHmklEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAATTA1gMEEAHrGRn+0dR6gADCZz3Ln+eMB/0Zv36hnfUAAcSE29//GZ8u/PfxOcPlObSzHiCAcFrP/OfJn9urGBj+MrxdzviFVgEAEEBMuKKc8flahl/szIIxjNz/GC7OpJH1AAGE3Xrm30/+3lrJyO3FrpvKph76/z0wAL7SwnqAAGLC7vVnq///EmQWCmSTlWCV9mbiZWC4MJ0W1gMEELr1jP//ML87/vfuZiZuazYlQ0YWNmZOdTaVoP/vVzC+fc74n8r5ECCAWJi/PmX4/Oj/m0MM7w4w/P74/9/fv3/+MjBKsYh5sYpzA93DyMrPKuv369baf8cDGNkYGZlYGJl4GET8GUTNGXik/nOJ/GdmIdt6gABifL9KleG3CCOHGhOXLCOnCBO3MBO3EBOXFLOgCjMfD1jN////vv15c/nf57f/vr399/XNv6+v//948u/zeYb/vxkUm/6ru5FtPUAAsTDxCP9985OZ25RN1ZVFRAgY2ozMbAwsrIxMzHAnMjJxs4qa/Bf8/f/v7/9/fjL8+fjz3tJfX44xsFoxylv/pyDwAQKIidFkAbOEzL8ve/68vPn/DwcTFx8jOwcjMzMwBaIGEwsjKycTBx8zN++fdyf/vNjBwBPAaN3+j4ObkrgHCCBGYHOD5c8rhiuN/959Z5GMZ1d3YhHmw6n8//ef99f8vDHlP4MNg1HRP3Yu3IXmX6ZPD0A1BiPzfw4xXCoBAogR0tph/vOa8Xr3vzdvWMSj2dVcWUT5sdr9496qX9en/GO0YTAp+8/GgS9Sf9z+eyiR4S8wDFkZxUL+GWdhVQYQQNCM95dFlEE9n5Hrw5/nu36/fMaAJT6BCfD1r9sz/r7nYjAuxbQbWEcw/f7E+O8PlPv95v8fX/7/+vz/1/v/LzfCDWT+epfxHyL3AgQQIt//ZZdg4pH4/+8DAzDj4aqFfr1kFHD+z86JGdTMb3YzHI9lvDid6csr5h/P/99fBrPy//+/HxjfP2X6+4P10ax/x6IYL0xj/AN1JUAAsSAVOMBU/ZWRXYqRkx+W7v4zAF3KCEmGjIyMwkz8gn8eHWBgyEUvpN/u+3ep5t/nXwzvFzK+2MrAwfHv+xOE9L9fDMdTGPj4fn+8CazC/n+bx8TA9t8wFWgkQAAhfM/099P/nx8YWcWYuAWAOv7//vTnzaUfd7b8vH/17+dvIK8wcjLzaTEwPGP8+w81/v4wvDn0//tvMO/P/18v/n168P/3H5SI+/P83zuQ3RDn/Hu2mfEvSAFAACEVWL9e/f/xk4lbhJH1z5931/68Pvv76f6/r64xsumySDuxSpmxCMsw8ekyMh1n+P2LgRkR9/8YWJjkYpheH/j77jMDUYUAG6Nh+38WViALIICQAv/Hs/8/GRnYv/15vfPv2wN/Xl1mZBdhUoxheL/m96MLf55asCq4MXIwgVoAXz8BgxfZvL9cqiyCun/fHwW2UaDFCSsnI48kIzuwVPj+/+e7f5/eMvyFOY1RjEFCC8IECCCE9f+/PWH49e7v241/PzEwsoky6nT8E9cGxThDDPOH8/+vVv26dZSBWeD/3/+MH54xCIuhhP/v9/9/vECyW4xZIpVdzYNFVISB4fOf16d/XOv4++IhNGz+v2H8/vE/jyCQCRBALLBy9R/Dj7egtMbKzqhZ9U/aBCgES36MfwSMGK23Mb858u9qDcNvZoZPjxgYDKCZ7dNNhif7/z/f+Pf7a6jpjGxMQsGculEsYpCihoNNxpWJl/3LzqT/3yFG/vh/KJ5JNoBBxAAggKDFDrCOZ3p95P8P1v/S5v+Z8DQA/zI/3/7vh+g/RXNQgv//keFk6N+Xr1BLZyVW+UZuazsGJqSk9/fzl8PWfx5+Qk0crAABxALzItNfUTuCaeY/sHiU9CFUjbAysqEVscAoZGPiAEbEJzS1AAFEWTeDkYmBkRUY1/CYAjnx77d/39/8R8mc/4Cl2d9PD1HCEaiFiQkggFgosf0vAy+j2UbmH+8Ynu/5d3fi/28/waIv/n7c8euxKbuiMLT4+vfr98vtf1/8gaVNBkbRCEYVfwY+aYAAYqRKBxuYBllvFPy6fQDYTITkbCYeO1alZFZpaQaG97+fbf91bfb/37CynFGK0XvLf2ZQwAMEEAsDVQDjv/9/fiDxf/37uvfn1f2/rjOC66r/DChx8YMBWOQBGzUMDAABRJ0uJsvrrX+en4F5HZrYGf7+BRa9IE+jFtIM/98znJ4MUsDAABBAVLCeifEPw6u9/3/8JVrH//9vNjP+BIUWQABRwfp//1n+q5Qwi4qBEhqwWOZzZJEJYuLlQc4gjFLpzKaTGDlYwImRncl81n8OUK0NEECM1BrbYfn1/P/TQ/95DP6LqIFKp6fzfp+bBi1kmDkZXQ/+Z2cDqbkx779s3D9BWYgugACiUtIDVrRskgyK4bDSiYVZQBfYggDnNGBDWeA/GxtEDaNe5X+k4hAggKhmPXqMcOkwKUYyfgQ2Olj/y4bBMjwDst1AABBAjLQbWGP8D02M/xmZcakBCCBa+R6/rXAAEEADPLQEEGAAHnXiBWopm1oAAAAASUVORK5CYII=',
    'settings-2.png': 'iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAIAAABKoV4MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAHY0lEQVR42mJ89+4dw8ABgABiYhhQABBAA2w9QAANsPUAAUTA+u9vnr1694N21gMEED7rmf9+vXHz5tWr17/+oZX1AAGEz/r39288evH2zYsHtx99oJH1AAGE03qm/z9vP3r9l0tIiPv/h+cPv9EmAAACCKf1nx/fevT+h5CijraS2K93j+4/+0gL6wECiAmH13/fvvf0H6eUirKcgpqaJB/zxxdPv/35T3XrAQIIu/Wfnt2+/+a7gLyGnCA7h6CssozQt9f3Hj1//5/aDgAIIBYI9R8I/v378/fP71+/vn39/PDu078c4qpqktwsTIyMnGKKCmJP39++coGDUVOIn5eNlZWFlYWZCSjFSKH1AAHE8ubZ4w9fvn779uPZixeMTCwsrGDIxq+gpq4kwsoMMp+RVVBWRekD44v3zx7cefjnNxD++fdPXFyKlZ2dh5dfVFSUi52ZPOsBAojl0c3Lj9/9+M8pICarKivCz83NycXJxcXFwcnJycYE8xwTj5SWsbDyjx/fvgPhN2D4vH3x9OnjVx9/icup8goIkW09QACxGNg48F2/dvvFVw5eUWkFKSEuVqwBysjMxsEFRHwCDP///Pj4+v+Xt69YpBUUVNRUhXjYyA58gABiYmLlUtbSVhHjfH7j7JkbT99/x5++///9+en1/WuXr9/7wyOjoq4qxMtGSdwDBBAo6TGycKrq6jMwXLhx7fSJf4yWOjICHMyM2O3+/OrO5Qs3Hv7jldfSVBPgYsVj9Isbl1/9+PsP5EcudS01ThYsagACCCbGzK6qZ/j/14mrV48f+W/rbCLNhWn/v59v7148f+X+Hz5FfR0NPk588c3M8Ovh46ePP3wGhyWzgIyCghCWcAIIIKR8z8Smpq/H8/fH+6evvmKPgK/vX3348o1dRUMFq93f3jy+eOHW19/gtPL7y6tPX2DG/P/wBVptfnzx4M69J99+Q2UAAgglRP7/+/OTkZlFgJ8Xe/Lj4uZlY2f79O/fP0zJj4+vnb768P3nr6/ePldQVfr65M6vf3BP/Htx68LtPzLf3r1+/fbd+09fn7zWNDbQ5GVnAgggFOt/f33/h5GZj5+fDWb9/z8//zCysoBKGKD17Nw8HGxsvz9/+8kgxIWs8eeHx2dAdn8Bsj+8e3Xh5Cv0GuT9ywtnX8K5rx9dv8bDbaipCBBALKiB+5qBmYVfgIcRlMy+v31w7dKlmy/+CStq6mgoivNzMHNycwOLvHtP36hKCzEzImKInU9Civfmu8/Ep3i+f0wc/zj5AAII1fpPv5iYOPk4/7x/eOPqpRsP33379Y+JieHpzdOvHt6WVtLQUOZhZ2Nj/fPt+59//5mRY5+JVc3I5PnL3W//EmM5m6CskrKKghgnE0AAIaxn/P/ny5c/f35+f3h6161Pn9m5hNSMjJSlRZgY/3989eTOvcc3Tx98xM365+v3vwzff/3+x87MhFqAMPxDTrDMvDLa+uoywrxA175/evva7afvv/6COu7vfwZGRiZmYKEKEEAsyJn61dsPf/8x/f/DJ6NhoiYvwQrN/Iz8YrLGotLvXz66e//x47fv/zJ++/n7Dy8HNCP9+v7t8+ePL549+gRLkYxMHBKGthbqorwcrCyM//8KCgrysp87dfXhmy+/QE78++Xl/etnv70T4QcIIGTr/3KJSmlJyavISbKzYlTEjEyCEgrGYjKKL548fvb531+oVb8+v7l89dbTly///Pn7F1Y+M3JIq6tJCnBDw4eFjYtPXFFe8tHbz1+B1QtQ5M/3j2+eff34mg0ggJACn53PxNYKf6QBq0RhKQVhKaTM8vPr4ydPf/9HVcUlKMSFUm4ysnDz8XKyszEx/PgLyeJ/f//6+/s3QADRop3///9vYNr4j1Ze//n9998/9OIMIIAotZ5LUMrW1sbYUE+QmxVeeP3/9uz+s29//yNZ/vXVizdfvv74DwsMdi5+YQlpOYAAYqHQekZmVmFxSSExCVEBrqMHT3z+Byk83z+4dIHnDzDf8HIw//v95e2zB7fuv/wMq02ZuISkFZWVZIW5AQKIhSrBDWx18fAJcDAyfIb59svzm5d/f34txMMOtP7ru1cv33/++fsfLG2wcgsA/S4jyg4QQCzUivBPb16iVFT//3x9/ejua6xp49/3D2/evH4rzicBEEDUSXr/f3+9c+POt39EKv/388PLZ0+fvvr8GyCAmKgU+Mw8/HyQdikjExs3vwAfBwtKxmNm5+bl4+ZgA4sCW27sStIioszfAAKISoHPwqGqrfOfhe3d138CYpLK8hLfX907ePzSL1h0iMmpGWsr/Pvx5emjh59+MorIKChKCADFAQKIanHPxMGnoasPrBC4uTmAXG4peV6my+/+QjomTIKSMtycHAycHOp8/L//MbKxQu0FCCAWapY3wBQNy/1/GdnlZKS+Pn/9D9xREOXjgGdUNqSqEiCAGGk3tPTn+9dvv/9CShk+Xi6sagACiIWBZoCFk5uPk4AagAAa4LEdgAAaYOsBAmiArQcIMAAM7+OMMd1d/AAAAABJRU5ErkJggg=='
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* MonomerLibApp class
* @class org.helm.webeditor.MonomerLibApp
* Recommended database schema:
* <pre>
* **********************************************************
* create table HELMMonomers
* (
* id bigint not null identity(1, 1) primary key,
* Symbol varchar(256) not null,
* Name varchar(256) not null,
* NaturalAnalog varchar(256),
* SMILES varchar(max),
* PolymerType varchar(256) not null,
* MonomerType varchar(256),
* Status varchar(256),
* Molfile varchar(max),
* Hashcode varchar(128),
* R1 varchar(256),
* R2 varchar(256),
* R3 varchar(256),
* R4 varchar(256),
* R5 varchar(256),
* Author nvarchar(256),
* CreatedDate DateTime default getdate()
* );
* **********************************************************
* </pre>
* JSON Schema
* <pre>
* {
*     id: 69,                     // monomer internal ID
*     symbol: 'Alexa',            // monomer symbol
*     name: 'Alexa Fluor 488',    // monomer long name
*     naturalanalog: null,        // natural analog
*     smiles: null,               // smiles
*     polymertype: 'CHEM',        // polymer type: CHEM, SUGAR, LINKER, BASE, AA
*     monomertype: null,          // momer type: Backbone, Branch, null
*     molfile: null,              // molfile of monomer, plain text, not BASE64 encoded or compressed
*     r1: 'X',                    // cap for R1 
*     r2: null,                   // cap for R2
*     r3: null,                   // cap for R3
*     r4: null,                   // cap for R4
*     r5: null,                   // cap for R5
*     author: null,               // monomer author
*     createddate: null           // monomer created date
* }
* </pre>
**/
org.helm.webeditor.MonomerLibApp = scil.extend(scil._base, {
    /**
    * @constructor MonomerLibApp
    * @param {DOM} parent - The parent element to host Monomer Manager
    * @bio {dict} options - options on how to render the App
    * <pre>
    * ajaxurl: {string} The service url for the ajax
    * <b>Example:</b>
    *     <div id="div1" style="margin: 5px; margin-top: 15px"></div>
    *     <script type="text/javascript">
    *       scil.ready(function () {
    *         new org.helm.webeditor.MonomerLibApp("div1", { ajaxurl: "../service/ajaxtool/post?cmd=" });
    *       });
    *     </script>
    * </pre>
    **/
    constructor: function (parent, options) {
        if (typeof (parent) == "string")
            parent = scil.byId(parent);
        this.options = options == null ? {} : options;
        scil.Page.ajaxurl = this.options.ajaxurl;
        this.init(parent);
    },

    init: function (parent) {
        var me = this;

        this.page = new scil.Page(parent);

        var me = this;
        this.buttons = [
            "-",
            { type: "a", src: scil.Utils.imgSrc("img/open.gif"), title: "Import Monomer XML Library", onclick: function () { me.uploadFile(); } },
            "-",
            { type: "input", key: "symbol", labelstyle: { fontSize: "90%" }, label: "Symbol", styles: { width: 100 }, autosuggesturl: this.options.ajaxurl + "helm.monomer.suggest", onenter: function () { me.refresh(); } },
            { type: "select", key: "polymertype", labelstyle: { fontSize: "90%" }, items: org.helm.webeditor.MonomerLibApp.getPolymerTypes(), label: "Polymer Type", styles: { width: 100 }, onchange: function () { me.refresh(); } },
            { type: "select", key: "monomertype", labelstyle: { fontSize: "90%" }, items: org.helm.webeditor.MonomerLibApp.getMonomerTypes(), label: "Monomer Type", styles: { width: 100 }, onchange: function () { me.refresh(); } },
            //{ type: "select", key: "status", labelstyle: { fontSize: "90%" }, items: org.helm.webeditor.MonomerLibApp.getStatuses(), label: "Status", styles: { width: 100 }, onchange: function () { me.refresh(); } },
            { type: "select", key: "countperpage", labelstyle: { fontSize: "90%" }, label: "Count", items: ["", 10, 25, 50, 100], onchange: function () { me.refresh(); } }
        ];

        this.monomers = this.page.addForm({
            caption: "Monomer List",
            key: "id",
            object: "helm.monomer",
            imagewidth: 30,
            buttons: this.buttons,
            onbeforerefresh: function (args) { me.onbeforerefresh(args); },
            onbeforesave: function (data, args, form) { data.molfile = form.fields.molfile.jsd.getMolfile(); },
            columns: {
                id: { type: "hidden", iskey: true },
                symbol: { label: "Symbol", width: 100 },
                name: { label: "Name", width: 200 },
                naturalanalog: { label: "Natural Analog", width: 100 },
                polymertype: { label: "Polymer Type", width: 100 },
                monomertype: { label: "Monomer Type", width: 100 },
                r1: { label: "R1", width: 50 },
                r2: { label: "R2", width: 50 },
                r3: { label: "R3", width: 50 },
                author: { label: "Author", width: 100 },
                createddate: { label: "Created Date", type: "date", width: 100 },
                status: { label: "Status", width: 100 }
            },
            formcaption: "Monomer",
            fields: org.helm.webeditor.MonomerLibApp.getFields()
        });

        this.page.addForm({
            caption: "Monomer",
            type: "form",
            object: "helm.monomer",
            fields: org.helm.webeditor.MonomerLibApp.getFields()
        }, this.monomers);

        this.monomers.refresh();
    },

    refresh: function (view) {
        this.monomers.refresh();
    },

    onbeforerefresh: function (args) {
        scil.Form.getButtonValuesByKey(this.buttons, ["status", "polymertype", "monomertype", "status", "symbol", "countperpage"], args);
    },

    uploadFile: function (duplicatecheck) {
        scil.Utils.uploadFile("Import Monomer Library", "Select HELM monomer xml file (" + (duplicatecheck ? "with" : "without") + " duplicate check)", this.options.ajaxurl + "helm.monomer.uploadlib",
            function (ret) { scil.Utils.alert(ret.n + " monomers are imported"); }, { duplicatecheck: duplicatecheck });
    }
});

scil.apply(org.helm.webeditor.MonomerLibApp, {
    getFields: function() {
        return {
            id: { type: "hidden" },
            symbol: { label: "Symbol", required: true },
            name: { label: "Name", required: true, width: 800 },
            naturalanalog: { label: "Natural Analog", required: true, width: 100 },
            polymertype: { label: "Polymer Type", required: true, type: "select", items: org.helm.webeditor.MonomerLibApp.getPolymerTypes(), width: 100 },
            monomertype: { label: "Monomer Type", required: true, type: "select", items: org.helm.webeditor.MonomerLibApp.getMonomerTypes(), width: 100 },
            author: { label: "Author", width: 100 },
            status: { label: "Status", type: "select", items: org.helm.webeditor.MonomerLibApp.getStatuses(), width: 100 },
            molfile: { label: "Structure", type: "jsdraw", width: 800, height: 300 },
            r1: { label: "R1", type: "select", items: ["", "H", "OH", "X"] },
            r2: { label: "R2", type: "select", items: ["", "H", "OH", "X"] },
            r3: { label: "R3", type: "select", items: ["", "H", "OH", "X"] }
        }
    },

    getValueByKey: function (list, key) {
        for (var i = 0; i < list.length; ++i) {
            if (list[i].key == key)
                return list[i].b.value;
        }
        return null;
    },

    getPolymerTypes: function () {
        return ["", "RNA", "CHEM", "PEPTIDE"];
    },

    getMonomerTypes: function () {
        return ["", "Backbone", "Branch", "Undefined"]
    },

    getStatuses: function () {
        return ["", "New", "Approved", "Retired"]
    }
});﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////


/**
* RuleSet class
* @class org.helm.webeditor.RuleSet
*/
org.helm.webeditor.RuleSet = {
    kApplyAll: false,

    rules: [
        { id: 1, category: "Demo", name: "Replace base A with U", description: "", script: "function(plugin) {var n = plugin.replaceMonomer(org.helm.webeditor.HELM.BASE, 'A', 'U');return n > 0;}" },
        { id: 2, category: "Demo", name: "Replace base A with G", description: "", script: "function(plugin) {var n = plugin.replaceMonomer(org.helm.webeditor.HELM.BASE, 'A', 'G');return n > 0;}" },
        { id: 3, category: "Test", name: "Replace base A with T", description: "", script: "function(plugin) {var n = plugin.replaceMonomer(org.helm.webeditor.HELM.BASE, 'A', 'T');return n > 0;}" }
    ],

    loadDB: function(list) {
        this.rules = list;
    },

    favorites: new scil.Favorite("ruleset"),

    saveTextDB: function (url) {
        var cols = ["id", "name", "description", "script", "author", "category", "createddate"];

        var n = 0;
        var ret = "";
        for (var i = 0; i < this.rules.length; ++i) {
            var r = this.rules[i];
            var s = "";
            for (var k = 0; k < cols.length; ++k)
                s += (k > 0 ? "|" : "") + r[cols[k]];
            ret += JSDraw2.Base64.encode(s) + "\n";
            ++n;
        }

        ret = n + "\n" + ret;
        if (url == null)
            return ret;

        var args = { client: "jsdraw", wrapper: "none", filename: "rules.txt", directsave: 1, contents: ret };
        scil.Utils.post(url, args, "_blank");
    },

    addFavorite: function (e) {
        var img = e.srcElement || e.target;
        var tr = scil.Utils.getParent(img, "TR");
        var id = tr.getAttribute("ruleid");

        var f = img.getAttribute("star") != "1";
        if (f) {
            img.setAttribute("star", "1");
            img.src = scil.Utils.imgSrc("img/star.png");
        }
        else {
            img.setAttribute("star", "");
            img.src = scil.Utils.imgSrc("img/star0.png");
        }

        this.favorites.add(id, f);
    },

    filterRules: function(tbody, s, category) {
        s = scil.Utils.trim(s).toLowerCase();
        var list = tbody.childNodes;
        for (var i = 0; i < this.rules.length; ++i) {
            var r = this.rules[i];
            var tr = list[i + 1];
            if ((s == "" || r.name.toLowerCase().indexOf(s) >= 0) && (scil.Utils.isNullOrEmpty(category) || category == r.category))
                tr.style.display = "";
            else
                tr.style.display = "none";
        }
    },

    listRules: function(div, apply, applyall){
        scil.Utils.removeAll(div);

        var me = this;
        var tbody = scil.Utils.createTable(div, 0, 0, { width: "100%" });
        var tr = scil.Utils.createElement(tbody, "tr", null, { background: "#eee", display: (this.kApplyAll ? "" : "none") });
        var chk = scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "checkbox");
        scil.Utils.createButton(scil.Utils.createElement(tr, "td", null, { textAlign: "right", padding: "3px 3px 3px 0" }, { colSpan: 3 }), this.createApplyAll("Apply All", applyall, tbody));
        scil.connect(chk, "onclick", function () { me.checkAll(tbody); });

        var k = 1;
        var list = [];
        for (var i = 0; i < this.rules.length; ++i) {
            var r = this.rules[i];
            var fav = this.favorites.contains(r.id);
            if (this.favorites.contains(r.id))
                this.listOneRule(tbody, r, ++k, apply, true);
            else
                list.push(r);
        }

        for (var i = 0; i < list.length; ++i)
            this.listOneRule(tbody, list[i], ++k, apply);

        return tbody;
    },

    listOneRule: function (tbody, r, i, apply, fav) {
        var me = this;
        var tr = scil.Utils.createElement(tbody, "tr", null, { background: i % 2 == 1 ? "#eee" : null }, { ruleid: r.id });
        scil.Utils.createElement(scil.Utils.createElement(tr, "td"), "checkbox", null, { display: (this.kApplyAll ? "" : "none"), width: "1%" });

        var td = scil.Utils.createElement(tr, "td");
        scil.Utils.createElement(td, "img", null, { /*width: "1%"*/ }, { star: (fav ? 1 : null), src: scil.Utils.imgSrc("img/star" + (fav ? "" : "0") + ".png") }, function (e) { me.addFavorite(e); });

        td = scil.Utils.createElement(tr, "td", null, { width: "99%" });
        this.listOneRule2(td, r, apply, i);
    },

    listOneRule2: function (td, rule, fun, i) {
        var s = rule.name;
        if (scil.Utils.isNullOrEmpty(s))
            s = rule.description;
        if (s.length > 50)
            s = s.substr(0, 47) + "...";

        var tbody = scil.Utils.createTable(td, 0, 0, { width: "100%" });
        var tr = scil.Utils.createElement(tbody, "tr");
        scil.Utils.createElement(tr, "td", "[" + rule.id + "] " + s, { padding: "3px 0 3px 0" }, { title: rule.description });
        var button = scil.Utils.createElement(scil.Utils.createElement(tr, "td", null, { textAlign: "right" }), "button", JSDraw2.Language.res("Apply"), { display: "none" });

        var me = this;
        scil.connect(button, "onclick", function () { fun(rule.script); });
        scil.connect(td, "onmouseover", function (e) { button.style.display = ""; });
        scil.connect(td, "onmouseout", function (e) { button.style.display = "none"; });
    },

    checkAll: function(tbody) {
        var nodes = tbody.childNodes;
        var f = nodes[0].childNodes[0].childNodes[0].checked;
        for (var i = 1; i < nodes.length; ++i) {
            var tr = nodes[i];
            tr.childNodes[0].childNodes[0].checked = f;
        }
    },

    createApplyAll: function (label, fun, tbody) {
        return {
            label: label, type: "a", onclick: function (e) {
                var list = [];
                var nodes = tbody.childNodes;
                for (var i = 1; i < nodes.length; ++i) {
                    var tr = nodes[i];
                    if (tr.childNodes[0].childNodes[0].checked)
                        list.push(parseInt(tr.getAttribute("ruleid")));
                }

                if (list.length == 0)
                    scil.Utils.alert("No rule selected");
                else
                    fun(list);
            }
        };
    },

    applyRules: function (plugin, ruleids) {
        if (ruleids.length == 0)
            return;

        var list = [];
        for (var i = 0; i < ruleids.length; ++i) {
            for (var k = 0; k < this.rules.length; ++k) {
                var r = this.rules[k];
                if (ruleids[i] == r.id) {
                    list.push(r);
                    break;
                }
            }
        }

        var args = { plugin: plugin, n: list.length, changed: 0, list: list, cloned: plugin.jsd.clone() };
        this._applyNextRule(args);
    },

    applyRule: function (plugin, script) {
        var list = [{ script: script, name: null }];
        var args = { plugin: plugin, n: list.length, changed: 0, list: list, cloned: plugin.jsd.clone() };
        this._applyNextRule(args);
    },

    _applyNextRule: function (args) {
        if (args.list.length == 0)
            return;

        var me = this;

        // get the first rule 
        var rule = args.list[0];
        args.list.splice(0, 1);

        // callback function when the rule is applied
        var callback = function (f, error) {
            if (error != null) {
                // some rule failed
                scil.Utils.alert(error);
                args.plugin.jsd.restoreClone(args.cloned);
                return;
            }

            if (f)
                ++args.changed; // structure changed

            if (args.list.length > 0) {
                // continue to apply the next rule
                me._applyNextRule(args);
                return;
            }

            // all rules are applied
            if (args.changed > 0) {
                args.plugin.jsd.pushundo(args.cloned);
                args.plugin.jsd.refresh(true);
                scil.Utils.alert((args.n > 1 ? "Rules" : "Rule") + " applied successfully!");
            }
            else {
                scil.Utils.alert((args.n > 1 ? "Rules" : "Rule") + " applied, but nothing changed!");
            }
        };
        this._applyOneRule(args.plugin, rule.script, rule.name, callback);
    },

    _applyOneRule: function (plugin, script, name, callback) {
        var rulefun = null;
        if (typeof (script) == "string")
            rulefun = scil.Utils.eval(script);
        else if (typeof (script) == "function")
            rulefun = script;

        var f = false;
        var error = null;
        if (rulefun == null) {
            error = "Error: Invalid rule function: " + name;
        }
        else {
            try {
                f = rulefun(plugin);
            }
            catch (e) {
                error = "Error: " + (name == null ? "" : name) + "\n---------------\n" + e.message + "\n---------------\n" + e.stack;
            }
        }

        callback(f, error);
    }
};﻿//////////////////////////////////////////////////////////////////////////////////
//
// Pistoia HELM
// Copyright (C) 2016 Pistoia (www.pistoiaalliance.org)
// Created by Scilligence, built on JSDraw.Lite
//
//////////////////////////////////////////////////////////////////////////////////

/**
* RuleSetApp class
* @class org.helm.webeditor.RuleSetApp
* Recommended database schema:
* <pre>
* **********************************************************
* create table HELMRules
* (
* id bigint not null identity(1, 1) primary key,
* Category nvarchar(256),
* Name nvarchar(512) not null,
* Script nvarchar(max),
* Description nvarchar(max),
* Author nvarchar(256),
* CreatedDate DateTime default getdate()
* );
* **********************************************************
* </pre>
* JSON Schema
* <pre>
* {
*     id: 3,                                          // rule internal ID
*     name: 'Replace base A with U',                  // rule long name
*     script: '	\nfunction(plugin) {\n // ... \n}',   // rule script
*     description: null,                              // rule full description
*     author: null,                                   // rule author
*     createddate: null,                              // rule created date
*     category: null                                  // rule category
* }
* </pre>
**/
org.helm.webeditor.RuleSetApp = scil.extend(scil._base, {
    /**
    * @constructor RuleSetApp
    * @param {DOM} parent - The parent element to host the Ruleset Manager
    * @bio {dict} options - options on how to render the App
    * <pre>
    * ajaxurl: {string} The service url for the ajax
    * <b>Example:</b>
    *     <div id="div1" style="margin: 5px; margin-top: 15px"></div>
    *     <script type="text/javascript">
    *       scil.ready(function () {
    *         new org.helm.webeditor.RuleSetApp("div1", { ajaxurl: "../service/ajaxtool/post?cmd=" });
    *       });
    *     </script>
    * </pre>
    **/
    constructor: function (parent, options) {
        if (typeof (parent) == "string")
            parent = scil.byId(parent);
        this.options = options == null ? {} : options;
        scil.Page.ajaxurl = this.options.ajaxurl;
        this.init(parent);
    },

    init: function (parent) {
        var me = this;

        this.page = new scil.Page(parent);

        var me = this;
        this.buttons = [
            "-",
            { type: "select", key: "category", labelstyle: { fontSize: "90%" }, items: org.helm.webeditor.RuleSetApp.categories, label: "Category", styles: { width: 100 }, onchange: function () { me.refresh(); } },
            { type: "select", key: "countperpage", labelstyle: { fontSize: "90%" }, label: "Count", items: ["", 10, 25, 50, 100], onchange: function () { me.refresh(); } }
        ];

        var fields = org.helm.webeditor.RuleSetApp.getFields();
        fields.script.button = [{ label: "Test Script", onclick2: function (field) { me.testscript(field); } },
            { label: "Test Applying", onclick2: function (field, form) { me.testapplying(field, form); } }
        ];
        fields.test = { label: "Test Structure", type: "jsdraw", helmtoolbar: true, width: 800, height: 300 };
        this.rules = this.page.addForm({
            caption: "Rule Set",
            key: "id",
            object: "helm.rule",
            buttons: this.buttons,
            onbeforerefresh: function (args) { me.onbeforerefresh(args); },
            onbeforesave: function (data, args, form) { data.test = null; },
            columns: {
                id: { label: "ID", width: 50, iskey: true },
                category: { label: "Category", width: 60 },
                name: { label: "Name", width: 100 },
                description: { label: "Description", width: 200 },
                author: { label: "Author", width: 100 },
                createddate: { label: "Created Date", type: "date", width: 100 }
            },
            formcaption: "Rule",
            fields: fields,
            defaultvalues: { script: "function(plugin) {\n\n}\n\n//function(plugin) { \n//    scil.Utils.ajax('http://SERVER/youerservice', function(ret) {\n//        plugin.setHelm(ret.new_helm);\n//    });\n//} " }
        });

        this.page.addForm({
            caption: "Rule",
            type: "form",
            object: "helm.rule",
            fields: org.helm.webeditor.RuleSetApp.getFields()
        }, this.rules);

        this.rules.refresh();
    },

    refresh: function (view) {
        this.rules.refresh();
    },

    onbeforerefresh: function (args) {
        scil.Form.getButtonValuesByKey(this.buttons, ["category", "countperpage"], args);
    },

    testapplying: function (field, form) {
        var plugin = form.fields.test.jsd.helm;
        plugin.applyRule(field.value);
    },

    testscript: function (field) {
        var s = field.value;
        if (scil.Utils.trim(s) == "")
            return;

        try {
            eval("var __fun=" + s);
            if (typeof (__fun) == "function")
                scil.Utils.alert("Looks good!");
            else
                scil.Utils.alert("It should be a Javascript function, like this: \nfunction(plugin) {\n //... \n}");
        }
        catch (e) {
            scil.Utils.alert(e.message);
        }
    }
});

scil.apply(org.helm.webeditor.RuleSetApp, {
    categories: ["", "General"],

    getFields: function () {
        return {
            id: { label: "ID", viewonly: true },
            category: { label: "Category", width: 200, type: "select", items: this.categories },
            name: { label: "Name", width: 800 },
            description: { label: "Description", type: "textarea", width: 800, height: 40 },
            author: { label: "Author", width: 100 },
            script: { label: "Javascript", type: "textarea", width: 800, height: 160 }
        }
    }
});




/**
 * Created by jmilton on 5/31/2016.
 */
import {NgIf, NgFor} from '@angular/common';
import {Component, Input, ChangeDetectorRef, EventEmitter, OnChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {UnitViewerComponent} from "./unit_viewer.component";
import {IonisMonomer} from '../ionismonomer';
import {OnInit} from "@angular/core";
import {MonomerLoader} from "../services/monomerloader";
import {MonomerSaver} from "../services/monomer_saver";


@Component({
    selector: 'unit-display',
    styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    template: `
            <div  class="table-responsive" style="padding: 15px;">
            <tr>
            <td>
                    <div class="container">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                              <label class="control-label col-sm-1" for="pwd">Oligomer Unit (HELM):</label>
                              <div class="col-sm-10">
                                <input type="text" class="form-control" id="helm" (keyup)='keyUp($event)' placeholder="$sugar($branch)$linker">
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="col-sm-offset-2 col-sm-10">
                                <!--<button type="submit" class="btn btn-default">Load</button>-->
                                <b>Sugar</b> : <span style="color: #dc143c">  {{ sugar_monomer?.monomer?.name }} </span>
                                <b>Base</b>  : <span style="color: #dc143c">  {{ base_monomer?.monomer?.name }} </span>
                                <b>Linker</b> : <span style="color: #dc143c">  {{ linker_monomer?.monomer?.name }}</span>
                              
                              </div>
                            </div>
                          </form> 
                     </div>
                    <unit-viewer [linker_monomer]="linker_monomer" [sugar_monomer]="sugar_monomer" [base_monomer]="base_monomer"></unit-viewer>
            </td>
            </tr>
            </div>
    `,
    // directives: [UnitViewerComponent],
    providers: [],
    outputs: ['current_linker', 'current_sugar', 'current_base']
})
export class UnitDisplay implements OnInit, OnChanges {

    @Input() monomer_db:IonisMonomer[];

    test:string = "tgest";

    linker_monomer:IonisMonomer;
    sugar_monomer:IonisMonomer;
    base_monomer:IonisMonomer;
    current_sugar_id:string;
    public helm = new EventEmitter();
    public current_linker = new EventEmitter<IonisMonomer>();
    public current_sugar = new EventEmitter<IonisMonomer>();
    public current_base = new EventEmitter<IonisMonomer>();

    private previous_value:string = null;


    constructor(private  monomer_loader:MonomerLoader, private monomer_saver:MonomerSaver, private ref:ChangeDetectorRef) {

    }

    ngOnInit():any {

    }


    public parseSugar(v:string):string {
        v = v.trim();
        var sugar = "";
        for (var c of v) {
            if (c === '(') {
                break;
            }
            sugar += c;
        }

        sugar = sugar.trim();
        if (sugar.startsWith("[")) {
            var start:number = 0;
            var end:number = UnitDisplay.getMatchingBracketPosition(sugar, start, '[', ']');
            sugar = sugar.substring(start + 1, end);
        }


        return sugar;

    }

    public parseBase(v:string):string {
        v = v.trim();
        var index = 0;
        for (var c of v) {
            if (c === '(') {
                var open = index;
                var close = UnitDisplay.getMatchingBracketPosition(v, index, '(', ')');
                if (open >= 0 && close > 0) {
                    return v.substring(open + 1, close);
                }
            }
            index++;
        }
        return null;
    }

    public parseLinker(v:string):string {
        v = v.trim();
        var linker = "";
        var start = false;
        for (var c of v) {
            if (start) {
                linker += c;

            } else if (c === ')') {
                start = true;
            }
        }


        linker = linker.trim();
        if (linker.startsWith("[")) {
            var end:number = UnitDisplay.getMatchingBracketPosition(linker, 0, '[', ']');
            linker = linker.substring(1, end);
        }


        return linker;
    }


    updateHELM(helm_value:string):void {
        this.helm.emit(helm_value);
    }


    keyUp(event:any) {

        let v = event.target.value;
        if (true) {// blah
            this.previous_value = event.target.value;

            this.updateHELM(event.target.value);
            var sugar:string = this.parseSugar(event.target.value);
            var base:string = this.parseBase(event.target.value);
            var linker:string = this.parseLinker(event.target.value);

            if (sugar == null || sugar === "") {
                this.sugar_monomer = null;
            }
            if (base == null || base === "") {
                this.base_monomer = null;
            }
            if (linker == null || linker === "") {
                this.linker_monomer = null;
            }


            // if (sugar!= null && base != null && linker != null && sugar.length > 0 && base.length > 0 && linker.length > 0 ) {
            // if (
            //     this.sugar_monomer == null ||
            //     this.linker_monomer == null ||
            //     this.base_monomer == null ||
            //     sugar != this.sugar_monomer.monomer.alternateId || base != this.base_monomer.monomer.alternateId ||
            //     linker != this.linker_monomer.monomer.alternateId) {
            if (this.monomer_db == null)
                return;

            for (var mon of this.monomer_db) {
                if (mon.monomer.polymerType == 'RNA') {
                    if (mon.monomer.alternateId === sugar) {
                        if (mon.monomer == null || mon.monomer.molfile == null) {
                            this.loadSugar(mon);
                        }
                    }
                    if (mon.monomer.alternateId === base) {
                        if (mon.monomer == null || mon.monomer.molfile == null) {
                            this.loadBase(mon);
                        }
                        // this.current_base.emit(this.base_monomer);
                    }
                    if (mon.monomer.alternateId === linker) {
                        if (mon.monomer == null || mon.monomer.molfile == null) {
                            this.loadLinker(mon);
                        }
                        // this.current_linker.emit(this.linker_monomer);
                    }
                }
            }
        }
    }

    public loadSugar(value:IonisMonomer):void {
        if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
            this.monomer_loader.getMonomer(+value.monomerid).subscribe(mon => this.updateSugar(mon));
        else
            this.sugar_monomer = value;
    }

    public loadBase(value:IonisMonomer):void {
        if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
            this.monomer_loader.getMonomer(+value.monomerid).subscribe(mon => this.updateBase(mon));
        else this.base_monomer = value;
    }

    public loadLinker(value:IonisMonomer):void {
        if (value.monomer.molfile == null || value.monomer.molfile.length <= 0)
            this.monomer_loader.getMonomer(+value.monomerid).subscribe(mon => this.updateLinker(mon));
        else
            this.linker_monomer = value;
    }

    updateSugar(im:IonisMonomer) {
        this.sugar_monomer = im;
        this.current_sugar_id = this.sugar_monomer.monomer.alternateId;
    }

    updateBase(im:IonisMonomer) {
        this.base_monomer = im;
    }

    updateLinker(im:IonisMonomer) {
        this.linker_monomer = im;
    }

    ngOnChanges(change:any):any {


        console.log(' we have a change ' + change.currentValue);


    }

    structureUpdate(update:any):void {

    }

    public static getMatchingBracketPosition(characters:string, position:number, openingBracket:string, closingBracket:string):number {

        if (position < characters.length - 1 && characters.charAt(position) === openingBracket) {
            var currentPosition:number = position + 1;
            var openingBracketCount:number = 1;
            while (openingBracketCount > 0 && currentPosition < characters.length) {
                var currentCharacter = characters.charAt(currentPosition);

                if (currentCharacter === closingBracket) {
                    --openingBracketCount;
                }
                if (currentCharacter === openingBracket) {
                    ++openingBracketCount;
                }

                currentPosition++;
            }
            return characters.charAt(currentPosition - 1) === closingBracket ? (currentPosition - 1) : -1;
        } else {
            return -1;
        }
    }
}
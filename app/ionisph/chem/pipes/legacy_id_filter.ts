/**
 * Created by jmilton on 6/7/2016.
 */
import {Pipe} from "@angular/core";
import {IonisMonomer} from "../ionismonomer";

@Pipe({
    name: "legacy_id_filter"

})
export class LegacyIDFilter {
    transform(value:IonisMonomer[], [param]) {

        if ( param != undefined && param.length==2) {
            var idtype:string = param[1];
            var idvalue:string = param[0];
            if (idtype != undefined && idvalue != undefined && idtype != '' && idvalue != '') {
                return this.lookForOtherShit(value, idtype, idvalue);
            }
        }
        return value;
    }

    publicStructures(value:IonisMonomer[]):IonisMonomer[] {
        var ex_list:IonisMonomer[] = [];
        var index:number = 0;
        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (exp.ispublic) {
                ex_list[index++] = exp;
            }
        }
        return ex_list;
    }

    privateStructures(value:IonisMonomer[]):IonisMonomer[] {
        var ex_list:IonisMonomer[] = [];
        var index:number = 0;
        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (!exp.ispublic) {
                ex_list[index++] = exp;
            }
        }
        return ex_list;
    }

    lookForOtherShit(value:IonisMonomer[], idtype:string, idvalue:string) {
        var ex_list:IonisMonomer[] = [];
        var index:number = 0;
        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (this.has(exp, idtype, idvalue)) {
                if (ex_list.indexOf(exp) < 0) {
                    ex_list[index] = exp;
                    index++;
                }
            }
        }
        return ex_list;
    }


    isInt(value):Boolean {
        return !isNaN(value) &&
            parseInt(value) == value && !isNaN(parseInt(value, 10));
    }


    public  has(i:IonisMonomer, monomer_type:string, idvalue:string):boolean {
        var nublist:Array<number> = this.getids(i, monomer_type);
        for ( var vi in nublist )
        {
            console.log ( vi);
            if ( nublist[vi]+''==idvalue ){
                return true;
            }

        }
        return false;
    }

    getids(m:IonisMonomer, type:string):Array<number> {
        var idstr:string;
        var vals:Array<number> = new Array<number>();
        if (type == 'Endcaps') {
            if (!m.endcapID) {
                return vals;
            }
            if (m.endcapID == '-') {
                return vals;
            }
            idstr = m.endcapID;
        } else if (type == 'Linkers') {
            if (!m.linkerId) {
                return vals;
            }
            if (m.linkerId == '-') {
                return vals;
            }
            idstr = m.linkerId;
        } else if (type == 'Bases') {
            if (!m.het_id) {
                return vals;
            }
            if (m.het_id == '-') {
                return vals;
            }
            idstr = m.het_id;
        } else if (type == 'Sugars') {
            if (!m.sugarId) {
                return vals;
            }
            if (m.sugarId == '-') {
                return vals;
            }
            idstr = m.sugarId;
        }
        if ( idstr != undefined ) {
            var sp:string[] = idstr.split(',');
            for (var s in sp) {
                var i:number = Number.parseInt(sp[s]);
                vals.push(i);
            }
        }
        return vals;
    }


}
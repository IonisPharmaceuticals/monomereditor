/**
 * Created by jmilton on 6/7/2016.
 */
import {Pipe} from "@angular/core";
import {IonisMonomer} from "../ionismonomer";

@Pipe({
    name: "monomer_name_filter"

})
export class MonomerNameFilter {
    transform(value:IonisMonomer[], term) {
        if (value != null) {
            if (!term) {
                return value;
            }
            if (term == '') {
                return value;
            }
            return this.lookForOtherShit ( value, term);


            // return value;
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
    lookForOtherShit(value:IonisMonomer[], term:string) {
        var ex_list:IonisMonomer[] = [];
        var index:number = 0;

        if( term == '' || term.length<= 0 || term == 'undefined')
        {
            return value;
        }


        //if (term == 'public') {
        //    return this.publicStructures(value);
        //} else if (term == 'private') {
        //    return this.privateStructures(value);
        //}
        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (exp.monomer.name == term ) {
                if (ex_list.indexOf(exp) < 0) {
                    ex_list[index] = exp;
                    index++;
                }
            } else {
            }
        }


        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (exp.monomer.name.indexOf(term)==0) {
                if (ex_list.indexOf(exp) < 0) {
                    ex_list[index] = exp;
                    index++;
                }
            } else {
            }
        }


        for (var i = 0; i < value.length; i++) {
            var exp = value[i];
            if (exp.monomer.name.indexOf(term)>=0) {
                if (ex_list.indexOf(exp) < 0) {
                    ex_list[index] = exp;
                    index++;
                }
            } else {
            }
        }
        return ex_list;
    }


    isInt(value):Boolean {
        return !isNaN(value) &&
            parseInt(value) == value && !isNaN(parseInt(value, 10));
    }

}
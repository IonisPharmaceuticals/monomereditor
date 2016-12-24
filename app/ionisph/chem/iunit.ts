/**
 * Created by jmilton on 8/25/2016.
//  */


//     for u in unit_list:
//             print ' u ', u.helm_unit
//             uobj = {}
//             uobj['helm']=str(u.helm_unit)
//             uobj['formula']=str(u.formula)
//             uobj['mw']=u.mw
//             uobj['smiles']=str(u.smiles)
//             uobj['mol']=str(u.mol)
//             unit_lista.append ( uobj )
//         chain_object={
//                 'image':'mol.png',
//                 'units' : unit_lista, 
//                }
//         chainson.append(chain_object)

export class IUnit{
    helm:string;
    formula:string;
    mw:number;
    smiles:string;
    mol:string;
    png:string;  //64bit encoded image

}
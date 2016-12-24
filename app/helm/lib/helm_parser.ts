
import { Injectable } from  '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HELMParser {
    
        parseChains ( helm: string ) : string[]{

            let t = this.pullChainGroup(helm)

            let chains = t.split ( '|');
            return chains;

        }

        pullChainGroup ( helm:string ) : string {

            if ( helm.indexOf ('$') > 0 ){
                let iv = helm.indexOf ( '$');
                let h = helm.substring ( 0, iv );
                return h;
            }
            else {
                return helm;
            }


        }


        pull_backbone_sequence_from_chain ( helm ) : string {

        var seq = "";
        var sp = helm.split ( ".");
        for (var s in sp){
            



            var t = sp[s];
            if ( t != null && t.length > 4 ){            
            
            let vs = t.indexOf ( '(');
            let vf = t.indexOf ( ')');

            while ( vs >= 0 && vf > 0 ){
                let seq_val = t.substring ( vs, vf+1 );
                

                t = t.replace ( seq_val, ' ');

                vs = t.indexOf ( '(');
                vf = t.indexOf ( ')');
            }        
            seq += t;
        }
        }
        return seq;
    }


        parse_backbone_sequence ( helm ) : string {
            let chain_group = this.pullChainGroup ( helm );
            let backbone = ''

            let chains = chain_group.split ("|");
            for ( let chain of chains )
            {
                let start = chain.indexOf('{')
                let end = chain.indexOf('}')

                if ( start >= 0 && end > 0 )
                {
                    chain = chain.substring ( start+1, end )
                }
                backbone += this.pull_backbone_sequence_from_chain ( chain );
                backbone += '|';

            }

            if ( backbone.endsWith ('|'))
                {
                    backbone  = backbone.substring ( 0, backbone.length-1);
                }

            return backbone;
        }
        
     pull_sequence ( helm ) : string{

        var seq = "";
        var sp = helm.split ( ".");
        for (var s in sp){
            
            var t = sp[s];
            let vs = t.indexOf ( '(');
            let vf = t.indexOf ( ')');
            if ( vs >= 0 && vf > 0 ){
                let seq_val = t.substring ( vs+1, vf );
                seq += ' ' + seq_val + '  ';
            }else {
                seq += '  ' + t + ' __ ';
            }
        }
        return seq;
}
   parse_nucleotides ( helm ) : string{
        var seq = "";
        var chainindex = helm.indexOf ( "{");
        var echainindex = helm.indexOf ( "}");
        if ( chainindex >= 0 && echainindex > 0  )
        {
            helm = helm.substring ( chainindex + 1, echainindex );
        }


        var sp = helm.split ( ".");
        return sp;
   }
   parse_sugar_from_nucleotide ( nuc ) : string{
            let monomer_index_marker = nuc.indexOf ( '.');

             if ( monomer_index_marker >= 0 ){
                 nuc = nuc.substring ( monomer_index_marker );
             }
            let vs = nuc.indexOf ( '(');
            if ( vs >= 0 ){
                let seq_val = nuc.substring ( 0, vs );
                return this.removeBrackets ( seq_val );
             }
   }
   parse_base_from_nucleotide ( nuc ) : string{
            let monomer_index_marker = nuc.indexOf ( '.');

             if ( monomer_index_marker >= 0 ){
                 nuc = nuc.substring ( monomer_index_marker );
             }
            let vs = nuc.indexOf ( '(');
            let vf = nuc.indexOf ( ')');
            if ( vs >= 0 && vf > 0 ){
                let seq_val = nuc.substring ( vs+1, vf );
                return this.removeBrackets ( seq_val );
             }
   }
   parse_linker_from_nucleotide ( nuc ) : string{
            let monomer_index_marker = nuc.indexOf ( '.');

             if ( monomer_index_marker >= 0 ){
                 nuc = nuc.substring ( monomer_index_marker );
             }
            let vs = nuc.indexOf ( ')');
            if ( vs >= 0 && vs < nuc.length ){
                let seq_val = nuc.substring ( vs+1 );
                return this.removeBrackets ( seq_val );
             }
   }

   removeBrackets ( monomer ) : string {
       let bindex = monomer.indexOf ( '[') 
       let cindex = monomer.indexOf ( ']') 
       if ( bindex >= 0 && cindex >= 0 )
       {
           return monomer.substring ( bindex+1, cindex);
       }else{
           return monomer;
       }
   }

}
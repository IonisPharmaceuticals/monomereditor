/**
 * Created by jmilton on 8/30/2016.
 */
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit, SimpleChange, Component, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MonomerDB} from '../lib/monomer_db';
import 'rxjs/Rx';
import {URLs} from "../services/urls";
import {HelmGrid} from "../../../helm/helm_grid.component";
import {KetcherMolview} from "../../../ketcher2.0/ketcher_molview.component";
import {GridManager} from "../../../ui/gridmanager";
import {GridListener} from "../../../ui/grid_listener";
import { ActivatedRouteSnapshot, Router, NavigationExtras }     from '@angular/router';


@Component({
    selector: 'oligo-search',
    inputs: ['monomer_db', 'monomer_manager', 'monomer_type', 'mode'],
    styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],
    templateUrl: 'app/ionisph/chem/component/templates/oligo_search.html',
    providers: [GridManager],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OligoDatabaseSearch implements OnInit, GridListener {

    public static IONS:string = "Ions";
    search_text:string;
    search_status:string = '';
    results_uri:string = 'http://127.0.0.1:8000/oligo_library/get_oligos?isisno=619169,615678,625448';//http://127.0.0.1:8000/oligo_library/list_oligos?start=0&length=1000';
    selectedid:string = ""
    mode:string = "Ions";
    search_description:string = "";
    helm : string = "";


    constructor(private ref:ChangeDetectorRef, private http:Http, private gridManager:GridManager, private router: Router ) {
        this.search_description = "  ";
        this.gridManager = gridManager;
    }

    setMode ( mode:string) : void {
        this.mode = mode;
        if ( mode == 'Ions' )
        {
            this.search_description = "Enter Ion numbers";
        }else if ( mode == 'Sequence'){
            this.search_description = "Enter an oligo base sequence";
        }else if ( mode == "HELM"){
            this.search_description = "Enter a HELM string";
        }
        else{
            this.search_description = "";
        }
    }

    fieldDataSelected ( field:string, data:string[] )
    {
        if ( data != null && data.length > 0 )
        {
            this.helm = data[0];
        }
        this.ref.markForCheck();
    }

    onSubmit ( event ) : any {
        if ( this.mode == OligoDatabaseSearch.IONS ){

        let value = this.search_text.trim().replace(' ', '');
        // search via a list of oligos 
        if (value.indexOf (',')>0){
            this.results_uri = URLs.build_oligo_list_url(value.trim())
            this.gridManager.setUri(GridManager.LIST, this.results_uri)
        }else if ( /^[a-zA-Z]+$/.test(value)){
            // search using analog sequence 
            this.results_uri = URLs.build_oligo_list_url_for_sequence(value.trim())

        }else if (/^\d+$/.test(value)){
        if (value != null && value != undefined ){
                    let ival = +value;
                    this.results_uri = URLs.build_oligo_list_url ( value );
                    this.gridManager.setUri(GridManager.SUMMARY, this.results_uri)
                }
        }
        }


        console.log ( ' url ' + this.results_uri );



    }

    /**
     *  This is data coming from the grids 
     */
    set_selected(selected:any) : void {
            // this.helm = selected.helm;
            console.log ( ' we have the ion? ' + selected );
            

    }



    valuechange(value): any {

        // implementing anything here will update on keystrokes in the text search box. 
    }


    ngOnInit():any {
        this.gridManager.addInteractionListener ( this );
    }


    private  handleError(error:Response) {
        this.search_status = error.toString();
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
import {Injectable
} from "@angular/core";
import {GridManagerListener} from "./gridmanager_listener";
import {GridListener} from './grid_listener';

@Injectable()
export class GridManager {

    public static SUMMARY:string = 'summary';
    public static LIST:string = 'list';

    gridManagerListeners:Array<GridManagerListener> = new Array<GridManagerListener>();
    gridInteractionListeners:Array<GridListener> = new Array<GridListener>();
    uri : string;
    mode: string; 

    constructor ( ){}


    addDataListener ( listener:GridManagerListener ) : void {
        this.gridManagerListeners.push ( listener )
    }

    addInteractionListener ( listener:GridListener )
    {
        this.gridInteractionListeners.push ( listener );
    }


    setUri(mode:string, uri:string){
        this.mode = mode;
        this.uri = uri;
        this.notifyListeners();
    }


    notifyListeners () : void {
        console.log ( ' notify listeners ' + this.gridManagerListeners.length);

        for (var i = 0; i < this.gridManagerListeners.length; i++){
            console.log ( " updating listener "  + i);
            var gr:GridManagerListener = this.gridManagerListeners[i];
            gr.update ( this.mode, this.uri );
        }

    }

    notifyInteractionListeners (field_value:string, datav:string[]) : void {

        for (var i = 0; i < this.gridInteractionListeners.length; i++){
            // console.log ( " updating listener "  + i);
            var gr:GridListener = this.gridInteractionListeners[i];
            gr.fieldDataSelected ( field_value, datav );
        }

    }
}
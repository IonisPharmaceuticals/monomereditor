import {ResultTableListener} from './result_table_listener';



export class ResultTableManager {

    tableListeners:Array<ResultTableListener> = new Array<ResultTableListener> ();


    notifyInteractionListeners ( data:{} ) : void {


        for ( let tablel of this.tableListeners )
        {
            tablel.setSelectedRow ( data );
        }

    }

    addListener ( listener: ResultTableListener) : void {
        this.tableListeners.push ( listener );
    }


}
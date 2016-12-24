

export interface GridListener {

    /** 
     *  When listening on a grid some grids can be figured to listen to one field.
     * this is the method that will allow that information to be transfoered
     */
    fieldDataSelected (field:string, values:string[] ) : void 

}
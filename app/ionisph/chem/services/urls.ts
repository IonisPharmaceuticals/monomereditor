/**
 * Created by jmilton on 6/21/2016.
 */
export class URLs {
    public static remote_host:string = 'http://'
    public static localhost:string = 'http://127.0.0.1:8000';
    public static host:string = URLs.localhost;
 

    // {{ TEST SAVE METHOD }}
    public  static monomer_lib_save_url:string = URLs.host+'/monomer_library/save';
    public static build_oligo:string = URLs.host + '/oligo_library/details_from_helm';
    public static build_helm_units:string = URLs.host + '/oligo_library/units_from_helm';

    // {{ LOAD MONOMER LIBRARY }}
    public static monomer_lib_url:string = URLs.host+'/monomer_library/monomers';
    public static monomer_lib_url_id:string = URLs.host+'/monomer_library/load_monomer';
    public static monomer_registration = URLs.host+'/monomer_library/save';
    public static substructureurl:string = URLs.host+'/structure_search/substructure?';
    public static generate_fingerprint :string = URLs.host+'/structure_search/generate_fingerprint';
    public static generate_canonical_smiles :string = URLs.host+'/structure_search/generate_canonical_smiles';
    public static generate_morgan_fingerprint :string = URLs.host+'/structure_search/generate_morgan_fingerprint';
    public static search_by_fingerprint : string = URLs.host + '/monomer_library/search_by_fingerprint';
    public static search_by_morgan_fingerprint : string = URLs.host + '/monomer_library/search_by_morgan_fingerprint';
    public static search_by_canonical_smiles : string = URLs.host + '/monomer_library/search_by_canonical_smiles';




	// old deprecated variables for transpilation purposes 
	public static molfile_merge = '';
	public static monomer_lib_download_public_monomers_url = '';
	public static monomer_registration_legacy = '';
	public static monomer_chemistry_info = '';
	public static oligo_registration_legacy = '';
	public static oligo_registration = '';
	public static oligo_list_url= '';
	public static helm_rules_datasource = '';



    static build_oligo_list_url ( val:string ) : string {
        return URLs.oligo_list_url + "/?isisno=" + val;
    }
    static build_oligo_list_url_for_sequence ( val:string ) : string {
        return URLs.oligo_list_url + "/?sequence=" + val;
    }


}

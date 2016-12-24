System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var URLs;
    return {
        setters: [],
        execute: function () {
            /**
             * Created by jmilton on 6/21/2016.
             */
            URLs = (function () {
                function URLs() {
                }
                URLs.build_oligo_list_url = function (val) {
                    // e.g. http://127.0.0.1:8000/oligo_library/get_oligos?isisno=619169,615678,625448
                    return URLs.oligo_list_url + "/?isisno=" + val;
                };
                URLs.build_oligo_list_url_for_sequence = function (val) {
                    return URLs.oligo_list_url + "/?sequence=" + val;
                };
                return URLs;
            }());
            exports_1("URLs", URLs);
            URLs.remote_host = 'http://192.168.128.87';
            URLs.localhost = 'http://127.0.0.1:8000';
            URLs.host = URLs.remote_host;
            URLs.API_GATEWAY = "https://1lcgo1si7e.execute-api.us-east-1.amazonaws.com/production";
            // {{ TEST SAVE METHOD }}
            URLs.monomer_lib_save_url = URLs.remote_host + '/monomer_library/save';
            URLs.monomer_lib_download_public_monomers_url = 'http://192.168.128.87/chem/download_sdf?';
            URLs.build_oligo = URLs.host + '/oligo_library/details_from_helm';
            URLs.build_helm_units = URLs.host + '/oligo_library/units_from_helm';
            URLs.monomer_registration_legacy = 'http://localhost:8180/v1/register/endcap_json';
            //{{ location of for registering an oligo  IN LEGACY bird}}
            // public static oligo_registration_legacy: string ='http://localhost:8181/v1/register/new_oligo';
            URLs.oligo_registration_legacy = 'http://192.168.128.52/wslegacy/v1/register/new_oligo';
            URLs.oligo_registration = 'https://1lcgo1si7e.execute-api.us-east-1.amazonaws.com/production/oligo';
            // {{ LOAD MONOMER LIBRARY }}
            URLs.monomer_lib_url = URLs.host + '/monomer_library/monomers';
            URLs.monomer_lib_url_id = URLs.host + '/monomer_library/load_monomer';
            URLs.monomer_registration = URLs.localhost + '/monomer_library/save';
            URLs.substructureurl = URLs.host + '/structure_search/substructure?';
            URLs.generate_fingerprint = URLs.host + '/structure_search/generate_fingerprint';
            URLs.generate_canonical_smiles = URLs.host + '/structure_search/generate_canonical_smiles';
            URLs.generate_morgan_fingerprint = URLs.host + '/structure_search/generate_morgan_fingerprint';
            URLs.search_by_fingerprint = URLs.host + '/monomer_library/search_by_fingerprint';
            URLs.search_by_morgan_fingerprint = URLs.host + '/monomer_library/search_by_morgan_fingerprint';
            URLs.search_by_canonical_smiles = URLs.host + '/monomer_library/search_by_canonical_smiles';
            //the datasource expect the following methods (after this resource signature) /list and /save
            URLs.helm_rules_datasource = URLs.API_GATEWAY + '/chem/helm-rules';
            // currently not used...
            URLs.monomer_chemistry_info = URLs.host + "/chem/info";
            URLs.molfile_merge = URLs.host + '/chem/merge_chemsitry';
            URLs.oligo_list_url = URLs.host + "/oligo_library/get_oligos";
        }
    };
});
//# sourceMappingURL=urls.js.map
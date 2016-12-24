System.register(["@angular/router", "./oligo_database_search.component", "./oligo_chemistry_summary"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, oligo_database_search_component_1, oligo_chemistry_summary_1, oligoRouts, oligosRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (oligo_database_search_component_1_1) {
                oligo_database_search_component_1 = oligo_database_search_component_1_1;
            },
            function (oligo_chemistry_summary_1_1) {
                oligo_chemistry_summary_1 = oligo_chemistry_summary_1_1;
            }
        ],
        execute: function () {
            exports_1("oligoRouts", oligoRouts = [
                {
                    path: "",
                    // // canActivate: [AuthGuard],
                    children: [
                        {
                            path: '',
                            component: oligo_database_search_component_1.OligoDatabaseSearch,
                            children: [
                                { path: 'chem',
                                    component: oligo_chemistry_summary_1.OligoChemistrySummary,
                                },
                            ]
                        }
                    ]
                },
            ]);
            exports_1("oligosRouting", oligosRouting = router_1.RouterModule.forChild(oligoRouts));
        }
    };
});
//# sourceMappingURL=oligo_app.routing.js.map
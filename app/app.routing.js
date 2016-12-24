System.register(["@angular/router", "./oligo_routing.component", "./oligoedit_routing.component", "./topnav.component", "./monomer_routing.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, oligo_routing_component_1, oligoedit_routing_component_1, topnav_component_1, monomer_routing_component_1, appRoutes, appRoutingProviders, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (oligo_routing_component_1_1) {
                oligo_routing_component_1 = oligo_routing_component_1_1;
            },
            function (oligoedit_routing_component_1_1) {
                oligoedit_routing_component_1 = oligoedit_routing_component_1_1;
            },
            function (topnav_component_1_1) {
                topnav_component_1 = topnav_component_1_1;
            },
            function (monomer_routing_component_1_1) {
                monomer_routing_component_1 = monomer_routing_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: topnav_component_1.TopNavComponent },
                { path: 'monomers', component: monomer_routing_component_1.MonomerRoutingComponent },
                { path: 'oligos', component: oligo_routing_component_1.OlgioRoutingComponent },
                { path: 'isisno/:id', component: oligoedit_routing_component_1.OligoEditRoutingComponent },
            ];
            exports_1("appRoutingProviders", appRoutingProviders = []);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
//# sourceMappingURL=app.routing.js.map
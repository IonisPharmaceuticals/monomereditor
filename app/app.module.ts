import {Component, NgModule} from '@angular/core';
import {Http, Response} from '@angular/http';
import {OnInit} from "@angular/core";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {MonomerApp2} from './ionisph/chem/component/monomer_app.2.component';
import {MonomerAppModule} from './ionisph/chem/component/monomer_app.module';
import {UnitAppModule} from './ionisph/chem/component/unit_app.module';
import {OligoAppModule} from './ionisph/chem/component/oligo_app.module';
import {AppComponent} from './app.component';
import {OlgioRoutingComponent} from './oligo_routing.component';
import {OligoEditRoutingComponent} from './oligoedit_routing.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import {TopNavComponent} from './topnav.component';
import {MonomerRoutingComponent} from './monomer_routing.component';
import {IntroComponent} from './intro.component';
import {HELMModule} from './helm/helm.module';
import {RulesModule} from './helm/rules/rules.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
     imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            MonomerAppModule,
            UnitAppModule,
            OligoAppModule,
            Ng2Bs3ModalModule, 
            HELMModule,
            RulesModule, 
            routing
             ], 
            declarations: [ AppComponent, OligoEditRoutingComponent, OlgioRoutingComponent, TopNavComponent, MonomerRoutingComponent, IntroComponent ],
            bootstrap: [ AppComponent ], 
    providers: [
        appRoutingProviders, 
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ], 


})
export class AppModule {
}
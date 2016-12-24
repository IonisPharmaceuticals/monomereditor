import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent } from './app.component';
import {OlgioRoutingComponent} from './oligo_routing.component';
import {OligoEditRoutingComponent} from './oligoedit_routing.component';
import {oligoRouts} from './ionisph/chem/component/oligo_app.routing';
import {TopNavComponent} from './topnav.component';
import {IntroComponent} from './intro.component';
import {MonomerRoutingComponent} from './monomer_routing.component';



const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: TopNavComponent },
  {path : 'monomers' , component:MonomerRoutingComponent},
  {path : 'oligos' , component:OlgioRoutingComponent},
  {path : 'isisno/:id' , component:OligoEditRoutingComponent}
  
  
  ,
];



export const appRoutingProviders: any[] = [
//   authProviders,
//   CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


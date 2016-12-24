import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import {OligoDatabaseSearch} from './oligo_database_search.component';
import {OligoChemistrySummary} from './oligo_chemistry_summary';


export const oligoRouts: Routes = [
  {
    path: "",
    // // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OligoDatabaseSearch,
        children: [
          { path: 'chem', 
              component:OligoChemistrySummary,
           },
        //   { path: 'heroes', component: ManageHeroesComponent },
        //   { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }, 
];

export const oligosRouting: ModuleWithProviders = RouterModule.forChild(oligoRouts);


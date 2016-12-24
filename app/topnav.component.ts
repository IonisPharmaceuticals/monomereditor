import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationExtras }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';


@Component({
  styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],

  template:  `
        <div class='panel panel-heading' >
            <div style="padding: 3px" class="btn-group">
                    <button type="button" class="btn btn-link"(click)="load('/oligos')"> Oligos </button>
                    <button type="button" class="btn btn-link"(click)="load('/monomers')"> Monomers </button>
             </div>
        </div>
    <router-outlet></router-outlet>
  `
})
export class TopNavComponent {

  constructor(private route: Router) {

  }

  load ( l:string ): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { },
    };

    this.route.navigate([l], navigationExtras);
  }

}

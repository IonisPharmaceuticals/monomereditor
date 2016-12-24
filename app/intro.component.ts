import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationExtras }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';


@Component({
  styleUrls: ['app/ionisph/chem/component/component_styles/monomer-app.css'],

  template:  `
        <div class='panel panel-heading' >
            <div style="padding: 3px" class="btn-group">
              Ionis drug management system
             </div>
        </div>
  `
})
export class IntroComponent {

  constructor(private route: Router) {

  }

  load ( l:string ): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { },
    };

    this.route.navigate([l], navigationExtras);
  }

}

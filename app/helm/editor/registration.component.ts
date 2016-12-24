/**
 * Created by jmilton on 10/07/2016
 */
import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {OnInit} from "@angular/core";
import { SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Register} from "../lib/register";
import {ActionObserver} from "../lib/action_observer";
import {RegistrationResponse} from "../lib/registration_response";
import {HELMStructure} from "../lib/helmstruct";

@Component({
	selector: 'helm-registration-form',
	styleUrls: ['app/ionisph/chem/component/component_styles/list.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
	inputs: ['helm'],
	template: `

 <div class="panel panel-default" >
	  <div class="panel-heading">Oligo Registration</div>
	  <div class="panel-body">

			<div  class="table-responsive">
			<tr>
				<td>
						<div class="container"  style="padding: 0px;width: 310px">
							<form class="form-vertical" role="form" style="padding: 0px;width: 310px">
								<div  class="form-group"  style="padding: 0px;width: 300px">
											<div class="form-group">
											<label for="usr">Name:</label>
											<input type="text" #user class="form-control" id="usr" [(ngModel)]="oligo.user" [ngModelOptions]="{standalone: true}">
											</div>
											<div class="form-group">
											<label for="usr">Notebook</label>
											<input type="text" #notebook class="form-control" id="notebook" [(ngModel)]="oligo.notebook" [ngModelOptions]="{standalone: true}">
											</div>
											<div class="form-group">
											<label for="usr">Notebook Page</label>
											<input type="text" #notebook_page class="form-control" id="notebook_page" [(ngModel)]="oligo.notebook_page" [ngModelOptions]="{standalone: true}">
											</div>

											<div class="col-sm-10">
												<label for="pwd">Comment</label>
												<textarea #notebook_comment class="form-control input-lg " isis-multi-paste="" 
												[placeholder]="'Description...'" name="comment" [(ngModel)]="oligo.comment" rows="2" cols="20" wrap="Off" [ngModelOptions]="{standalone: true}"></textarea>
											</div>
								</div>
							</form> 
						</div>   
				</td>
				<td>
						<textarea #notebook_comment class="form-control input-lg " isis-multi-paste="" 
						[placeholder]="'HELM...'" name="oligo" [(ngModel)]="helm" rows="10" cols="60" wrap="on"
						 [ngModelOptions]="{standalone: true}"></textarea>
						{{ registerd_isis_no }}
				</td>
			</tr>


			<td>
				<tr>
								<div  class="table-responsive" style="width:300px;margin-left:100px">
								<tr>
									<td>

												<div class="col-sm-offset-2">
												<button type="submit" (click)="cancel()" class="btn btn-info">Cancel</button>
												</div>
									</td>
									<td>
												<div class="col-sm-offset-2">
												<button type="submit" [disabled]=disabled (click)="submit($event)" class="btn btn-danger">{{button_text}}</button>
												</div>

									</td>
								</tr>
							   </div> 

			</tr>
		  </td>

		</div>
	</div>
</div>


<modal #modal item-width="'400px'">
	  <modal-header [show-close]="true">
	  </modal-header>
	  <modal-body>


	  {{ msg }}

	  </modal-body>
</modal>








	`,
	providers: [ Register  ]

})
export class RegistrationComponent implements OnInit, ActionObserver{

	msg:string = "";
	helm:string;
	button_text:string = 'Register'
	disabled:boolean = false;
	oligo:HELMStructure = new HELMStructure ();
	registerd_isis_no:string = "";

	@ViewChild ('modal')modal:ModalComponent;



	constructor( private ref:ChangeDetectorRef, private oligoreg:Register,  private sanitizer: DomSanitizer) {
	}
	ngOnInit():any {
		this.oligo.helm = this.helm;
	}


	register () : void {

	}

	action_update ( res:string ): void{

		this.ref.detectChanges();
			this.msg = res;
			this.ref.detectChanges();
			this.modal.open ( 'lg');
			
	}
	action_successful ( response:RegistrationResponse ): void{
		this.disabled = false;
		this.registerd_isis_no = "Registerd as id: " + response.id;
		this.msg = response.msg + "   IsisNo:" + response.id;
		this.ref.detectChanges();
		this.modal.open ( 'lg');
		this.button_text="Register";
		this.ref.detectChanges();
	}


	action_failed (o): void
	{
		this.disabled = false;
		this.button_text="(failed).. try again.";
		this.ref.detectChanges();
	}


	qprompt (msg:string) : void {
		this.msg = msg;
		this.modal.open ( 'lg');
	}

	submit( event ) {

		this.disabled = true;
		if ( this.helm == null || this.helm.length <= 0 ){
			this.msg = "Please enter a valid helm string.";
			this.qprompt ( this.msg );
			return;
		}




		if ( this.helm.length > 0 )
		{
			this.helm = this.helm.trim();
		}

		this.oligo.helm = this.helm;
		this.oligoreg.submitAsJSON( this.oligo, this);
	}

}


/**
 * Created by jmilton on 10/07/2016
 */
import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {OnInit} from "@angular/core";
import {ApplicationControls} from "../lib/application_control_manager";
import {RegisterOligo} from "../services/register_oligo";
import { SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {Ng2Bs3ModalModule, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {IOligo} from "../ioligo";
import {URLs} from "../services/urls";
import {HELMViewer} from './../../../helm/helm_viewer';
import {ActionObserverOligo} from './../../../ui/action_observer_oligo';
import {IonisOligo} from "../ionisoligo";
import {OligoRegistrationResponse} from "../oligoregistrationresponse"

@Component({
	selector: 'oligo-registration-form',
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
											<label for="pwd">Password:</label>
											<input type="password" #pass class="form-control" id="pwd" [(ngModel)]="oligo.pass" [ngModelOptions]="{standalone: true}">
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
												[placeholder]="'Description...'" name="comment" [(ngModel)]="oligo.comment" rows="2" wrap="Off" [ngModelOptions]="{standalone: true}"></textarea>
											</div>
								</div>
							</form> 
						</div>   
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
												<button type="submit" (click)="submit($event)" class="btn btn-danger">Register</button>
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
	providers: [ApplicationControls, RegisterOligo ]

})
export class OligoRegistrationForm implements OnInit, ActionObserverOligo{

	msg:string = "";
	helm:string;

	oligo:IonisOligo = new IonisOligo ();

	@ViewChild ('modal')modal:ModalComponent;



	constructor( private ref:ChangeDetectorRef, private oligoreg:RegisterOligo,  private sanitizer: DomSanitizer) {
	}
	ngOnInit():any {
		this.oligo.helm = this.helm;
	}


	register () : void {

	}

	action_successful ( response:OligoRegistrationResponse ): void{

		if (response.msg != null && response.msg.length > 0 && response.isisno!=null && response.isisno.length >  0 ){
			this.msg = "Oligo was not registered." + response.msg + " IsisNo:" + response.isisno;

			this.modal.open ( 'lg');
		}else {
		this.msg = response.msg + " IsisNo : " + response.isisno;
		this.modal.open ( 'lg');
		}
	}
	action_failed (monomer:IonisOligo): void{}


	qprompt (msg:string) : void {
		this.msg = msg;
		this.modal.open ( 'lg');
	}

	submit( event ) {

		if ( this.helm == null || this.helm.length <= 0 ){
			this.msg = "Please enter a valid helm string.";
			this.qprompt ( this.msg );
			return;
		}

		this.oligo.helm = this.helm;


		this.oligoreg.submitAsJSON( this.oligo, this);
		// this.chemistry.buildOligo(this.helm).subscribe(m=>this.updateStatus ( m ))
			// OkHttpClient client = new OkHttpClient();
			// MediaType mediaType = MediaType.parse("application/json");
			// RequestBody body = RequestBody.create(mediaType, "{}");
			// Request request = new Request.Builder()
			//   .url("http://192.168.128.52/wslegacy/v1/register/new_oligo")
			//   .post(body)
			//   .addHeader("content-type", "application/json")
			//   .addHeader("cache-control", "no-cache")
			//   .addHeader("postman-token", "54253070-1840-f344-e730-4831ef698283")
			//   .build();

			// Response response = client.newCall(request).execute();



	}

}


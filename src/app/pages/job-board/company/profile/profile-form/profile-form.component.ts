import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Company } from 'src/app/models/job-board/company';
import {MessageService} from '../../../../shared/services/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {FormArray,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import {MessageService as MessagePnService} from 'primeng/api';
import {SharedService} from '../../../../shared/services/shared.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input() formCompanyIn: FormGroup;
  @Output() displayOut = new EventEmitter<boolean>();
  identificationTypes:Catalogue[];
  personType:Catalogue[];
  activityTypes:Catalogue[];
  types: Catalogue[];
  filteredTypes: any[];
  filteredActivityTypes:any[];
  filteredpersonTypes:any[];
  filteredidentificationTypes: any[];
  formAddress: FormGroup;
  formLocation: FormGroup;
  auth:User;

  constructor(
    private formBuilder: FormBuilder,
                public messageService: MessageService,
                private messagePnService: MessagePnService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private jobBoardHttpService: JobBoardHttpService,
                private authServices:AuthService,
  ) {
    this.auth = this.authServices.getAuth();
   }

  ngOnInit() {
    this.getCompany();
    this.getActivityTypes();
    this. getIdentificationTypes();
    this.getPersonType();
    this.getTypes();
  }
  get identificationField() {
    return this.formCompanyIn['controls']['user'].get('identification');
  }
  get emailField() {
    return this.formCompanyIn['controls']['user'].get('email');
  }
  get phoneField() {
    return this.formCompanyIn['controls']['user'].get('phone');
  }
  get identificationTypeField() {
    return this.formCompanyIn['controls']['user'].get('identification_type');
  }
  get addressField() {
    return this.formCompanyIn['controls']['user'].get('address');
  }
  get tradeNameField() {
    return this.formCompanyIn.get('trade_name');
  }
  get prefixField(){
    return this.formCompanyIn.get('prefix');
  }
  get comercialActivitiesField() {
    return this.formCompanyIn.get('comercial_activities')as FormArray;
  }

  addComercialActivity(){
      this.comercialActivitiesField.push(this.formBuilder.control(null,Validators.required));
  }
  removeComercialActivity(index){
      this.comercialActivitiesField.removeAt(index);
  }

  get webField() {
    return this.formCompanyIn.get('web');
  }

  get typeField() {
      return this.formCompanyIn.get('type');
  }

  get activityTypesField() {
      return this.formCompanyIn.get('activity_type');
  }

  get personTypeField() {
      return this.formCompanyIn.get('person_type');
  }

  onSubmit(flag = false) {
   
    if (this.formCompanyIn.valid) {
        this.updateCompany(this.formCompanyIn.value);
    } else {
        this.markAllAsTouchedFormCompany();
    }
}
  updateCompany(company: Company) {
    this.spinnerService.show();
    this.jobBoardHttpService.update('company/update', {company})
        .subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            console.log(response);
            this.displayOut.emit(false);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
  }

  getCompany(){
    this.spinnerService.show();
    this.jobBoardHttpService.get('company/show')
        .subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.formCompanyIn.patchValue(response['data']);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
  }

  markAllAsTouchedFormCompany(){
    this.formCompanyIn.markAllAsTouched();
  }

  // Types of catalogues
  getIdentificationTypes() {
    const params = new HttpParams().append('type', 'IDENTIFICATION_TYPE');
    this.appHttpService.getCatalogues(params).subscribe(response => {
      this.identificationTypes = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }
  getTypes() {
    const params = new HttpParams().append('type', 'COMPANY_TYPE');
    this.appHttpService.getCatalogues(params).subscribe(response => {
      this.types = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }
  getPersonType() {
    const params = new HttpParams().append('type', 'COMPANY_PERSON_TYPE');
    this.appHttpService.getCatalogues(params).subscribe(response => {
      this.personType = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }
  getActivityTypes() {
    const params = new HttpParams().append('type', 'COMPANY_ACTIVITY_TYPE');
    this.appHttpService.getCatalogues(params).subscribe(response => {
      this.activityTypes = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }
  // Filter type of companies
  filterTypes(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.types) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredTypes = filtered;
  }
  filterIdentificationType(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.identificationTypes) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredidentificationTypes = filtered;
  }
  filterPersonType(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.personType) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredpersonTypes = filtered;
  }
  filterActivityType(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.activityTypes) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredActivityTypes = filtered;
  }

  markAllAsTouchedFormSkill() {
    this.formCompanyIn.markAllAsTouched();
    this.formLocation.markAllAsTouched();
    this.formAddress.markAllAsTouched();
  }

  setFormLocation(event) {
    this.formLocation = event;
}
}

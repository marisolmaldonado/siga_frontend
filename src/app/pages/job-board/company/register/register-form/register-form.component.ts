import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../../../models/job-board/company';
import {MessageService} from '../../../../shared/services/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import { Catalogue } from 'src/app/models/app/catalogue';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Input() formRegisterIn: FormGroup;
  @Output() displayOut = new EventEmitter<boolean>();
  identificationTypes:Catalogue[];
  personType:Catalogue[];
  activityType:Catalogue[];
  types: Catalogue[];
  filteredTypes: any[];
  filteredactivityType:any[];
  filteredpersonType:any[];
  filteredidentificationTypes: any[];

  formAddress: FormGroup;
  formLocation: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
                public messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService,
                private router:Router,
  ) { }

  ngOnInit() {
    this.getIdentificationTypes(),
    this.getPersonType(),
    this.getActivityType(),
    this.getTypes();
  }
   // Fields of Form
   get usernameField() {
    return this.formRegisterIn['controls']['user'].get('username');
}

    get identificationField() {
        return this.formRegisterIn['controls']['user'].get('identification');
    }

    get emailField() {
        return this.formRegisterIn['controls']['user'].get('email');
    }

    get passwordField() {
        return this.formRegisterIn['controls']['user'].get('password');
    }

    get passwordConfirmationField() {
        return this.formRegisterIn['controls']['user'].get('password_confirmation');
    }

    get addressField() {
        return this.formRegisterIn['controls']['user'].get('address');
    }

    get locationField() {
        return this.formRegisterIn['controls']['user'].get('location');
    }

    get statusField() {
        return this.formRegisterIn['controls']['user'].get('status');
    }

    get identificationTypeField() {
        return this.formRegisterIn['controls']['user'].get('identificationType');
    }

    get tradeNameField() {
        return this.formRegisterIn.get('trade_name');
    }

    get comercialActivitiesField() {
        return this.formRegisterIn.get('comercial_activities') as FormArray;
    }

    addComercialActivity(){
        this.comercialActivitiesField.push(this.formBuilder.control(null,Validators.required));
    }
    removeComercialActivity(index){
        this.comercialActivitiesField.removeAt(index);
    }

    get webField() {
        return this.formRegisterIn.get('web');
    }

    get typeField() {
        return this.formRegisterIn.get('type');
    }

    get activityTypeField() {
        return this.formRegisterIn.get('activityType');
    }

    get personTypeField() {
        return this.formRegisterIn.get('personType');
    }

    get dateField() {
        return this.formRegisterIn['controls']['user'].get('date');
    }


  register(company: Company, flag = false) {
    this.spinnerService.show();
    this.jobBoardHttpService.store('company/register', {company}).subscribe(response => {
        this.spinnerService.hide();
        this.messageService.success(response); 
        this.router.navigate(['/auth/login'])

    }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
    });
} 

onSubmit(flag = false) {
    //if (this.formRegisterIn.valid) {
         this.register(this.formRegisterIn.value, flag);
      //  }else {
          //  this.formRegisterIn.markAllAsTouched();
       // }
   
    }
        // Types of catalogues
        getTypes() {
            const params = new HttpParams().append('type', 'COMPANY_TYPE');
            this.appHttpService.getCatalogues(params).subscribe(response => {
              this.types = response['data'];
            }, error => {
              this.messageService.error(error);
            });
          }

        getIdentificationTypes() {
            const params = new HttpParams().append('type', 'IDENTIFICATION_TYPE');
            this.appHttpService.getCatalogues(params).subscribe(response => {
                this.identificationTypes = response['data'];
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
        getActivityType() {
            const params = new HttpParams().append('type', 'COMPANY_ACTIVITY_TYPE');
            this.appHttpService.getCatalogues(params).subscribe(response => {
                this.activityType = response['data'];
            }, error => {
                this.messageService.error(error);
            });
        } 
        // Filter type of companies
    filterType(event) {
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
    filterPersonType(event){
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.personType) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredpersonType = filtered;
    }
    filterActivityType(event){
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.activityType) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredactivityType = filtered;
    }

    setFormLocation(event) {
        this.formLocation = event;
    }
}

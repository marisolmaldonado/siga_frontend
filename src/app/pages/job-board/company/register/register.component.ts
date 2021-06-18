import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/auth/user';
import { Company } from '../../../../models/job-board/company';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateValidators } from 'src/app/pages/shared/validators/date.validators';
import {Validations} from './utils/validations';
import { HttpParams } from '@angular/common/http';
import {MessageService} from '../../../shared/services/message.service'; 
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import { CustomValidators } from 'src/app/pages/shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  company: Company;
  registerDialog: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void{
    this.buildFormRegister();
  }

  buildFormRegister() {

    this.formRegister = this.formBuilder.group({

      user: this.formBuilder.group({
        username: [null, Validators.required],
        identification: [null, Validators.required,Validations.validateIdentification(this.jobBoardHttpService)],
        email: [null, Validators.required],
        password: [null, Validators.required],
        password_confirmation: [null, Validators.required],
        address: [null, Validators.required],
        status: [null, Validators.required],
        identificationType: [null, Validators.required],
      },{validator:CustomValidators.passwordMatchValidator}),
      trade_name: [null, Validators.required],
      comercial_activities: this.formBuilder.array([
        this.formBuilder.control(null, Validators.required)
      ]),
      web: [null, Validators.required],
      type: [null, Validators.required],
      activityType: [null, Validators.required],
      personType: [null, Validators.required],

    });
    console.log(this.formRegister['controls']['user']);
  }
}

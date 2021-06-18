import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Company } from 'src/app/models/job-board/company';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {MessageService} from '../../../shared/services/message.service'
import { User } from 'src/app/models/auth/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  paginator: Paginator;
  professionals: Company[];
  professional:Company;
  formCompany: FormGroup;
  formProfessional:FormGroup;
  company: Company;
  companyDialog: boolean;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.paginator = { current_page: 1, per_page: 3 };
    this.professionals = [];
  }

  ngOnInit(): void {
    this.buildFormCompany();
  }
  //Formulario de compañia//
  buildFormCompany() {
    this.formCompany = this.formBuilder.group({
      user: this.formBuilder.group({
        identification: [null, Validators.required],
        email: [null, Validators.required],
        phone:[null, Validators.required],
        address: [null],
        identification_type: [null, Validators.required],   
      }),
      trade_name: [null, Validators.required],
      prefix:[null,Validators.required],
      comercial_activities: this.formBuilder.array([
        this.formBuilder.control(null, Validators.required)
      ]),
      web: [null, Validators.required],
      type: [null, Validators.required],
      activity_type: [null, Validators.required],
      person_type: [null, Validators.required],
    });
   console.log(this.formCompany['controls']['user']);
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Reference } from '../../../../models/job-board/reference';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import {MessageService} from '../../../shared/services/message.service';
import { DateValidators } from "../../../shared/validators/date.validators";

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})

export class ReferenceComponent implements OnInit {
  paginator: Paginator;
  references: Reference[];
  formReference: FormGroup;
  reference: Reference;
  referenceDialog: boolean;
  flagReferences: boolean;

  constructor(private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService) {

    this.paginator = { current_page: 1, per_page: 2 };
    this.references = [];
  }

  ngOnInit(): void {
    this.getReferences(this.paginator);
    this.buildFormReference();
  }

  // Build form reference
  buildFormReference() {
    this.formReference = this.formBuilder.group({
      id: [null],
      professional: [null],
      institution: [null, Validators.required],
      position: [null, Validators.required],
      contact_name: [null, Validators.required],
      contact_phone: [null, Validators.required],
      contact_email: [null, Validators.required],
    });
  }

  // references of backend
  getReferences(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.flagReferences = true;
    // this.spinnerService.show();
    this.jobBoardHttpService.get('references', params).subscribe(
      response => {
        // this.spinnerService.hide();
        this.flagReferences = false;
        this.references = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        // this.spinnerService.hide();
        this.flagReferences = false;
        this.messageService.error(error);
      });
  }
}

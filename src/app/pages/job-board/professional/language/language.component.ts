import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Language } from '../../../../models/job-board/language';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  paginator: Paginator;
  languages: Language[];
  formLanguage: FormGroup;
  language: Language;
  languageDialog: boolean;
  flagLanguages: boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService) {

    this.paginator = {current_page: 1, per_page: 5};
    this.languages = [];
  }

  ngOnInit(): void {
    this.getLanguages(this.paginator);
    this.buildFormLanguage();
  }
  // Build form language
  buildFormLanguage() {
    this.formLanguage = this.formBuilder.group({
      id: [null],
      professional: [null, Validators.required],
      idiom: [null, Validators.required],
      written_level: [null, Validators.required],
      spoken_level: [null, Validators.required],
      read_level: [null, Validators.required],

    });
  }
  // languages of backend
  getLanguages(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

  this.flagLanguages = true;
      // this.spinnerService.show();
      this.jobBoardHttpService.get('languages', params).subscribe(
        response => {
            // this.spinnerService.hide();
            this.flagLanguages = false;
            this.languages = response['data'];
            this.paginator = response as Paginator;
        }, error => {
            // this.spinnerService.hide();
            this.flagLanguages = false;
            this.messageService.error(error);
        });
}
}

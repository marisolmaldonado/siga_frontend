import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Company } from 'src/app/models/job-board/company';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../shared/services/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {
  @Input() professionalsIn: Company[];
  @Input() paginatorIn: Paginator;
  @Input() formProfessionalIn: FormGroup;
  @Output() professionalsOut = new EventEmitter<Company[]>();
  @Output() formProfessionalOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  selectedProfessionals: any[];
  selectedProfessional: Company;
  dialogUploadFiles: boolean;
  paginatorFiles: Paginator;

  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private jobBoardHttpService: JobBoardHttpService
  ) { }

  ngOnInit() {
  }

  pageChange(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }

  selectProfessional(professional: Company) {
    this.selectedProfessional = professional;
    console.log(this.selectedProfessional);
  }
  deleteProfessional(){
  }
}

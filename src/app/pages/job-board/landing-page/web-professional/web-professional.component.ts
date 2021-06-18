import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Paginator } from 'src/app/models/setting/paginator';
import { Professional } from 'src/app/models/job-board/professional';
import { Category } from 'src/app/models/job-board/category';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { MessageService } from 'src/app/pages/shared/services/message.service';

@Component({
  selector: 'app-web-professional',
  templateUrl: './web-professional.component.html',
  styleUrls: ['./web-professional.component.scss']
})
export class WebProfessionalComponent implements OnInit {

  professionals: Professional[];
  categories: Category[]
  paginator: Paginator;
  body: any;
  flagProfessionals: boolean;

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private messageService: MessageService) {
      this.paginator = {current_page: 1, per_page: 9};
      this.body = {ids: null, search: null};
      this.professionals = [];
    }

  ngOnInit(): void {
    this.getProfessionals(this.paginator, this.body);
  }

  getProfessionals(paginator: Paginator, body: any): void {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.flagProfessionals = true;
    this.jobBoardHttpService.store('web-professional/professionals', body, params).subscribe(
      response => {
        this.flagProfessionals = false;
        this.professionals = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.flagProfessionals = false;
        this.messageService.error(error);
      }
    );
  }

  changePaginator(event: Paginator): void {
    this.paginator = event;
    this.getProfessionals(this.paginator, this.body);
  }

  changeBody(event: any): void {
    this.body = event;
    this.getProfessionals(this.paginator, this.body);
  }

}

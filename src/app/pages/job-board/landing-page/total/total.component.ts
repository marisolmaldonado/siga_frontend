import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { MessageService } from 'src/app/pages/shared/services/message.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

  totalCompanies: number;
  totalOffers: number;
  totalProfessionals: number;

  flagTotal: boolean;

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private messageService: MessageService) {
      this.totalCompanies = 0;
      this.totalOffers = 0;
      this.totalProfessionals = 0;
    }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(): void {
    this.flagTotal = true;
    this.jobBoardHttpService.get('web-professional/total').subscribe(
      response => {
        this.flagTotal = false;
        this.totalCompanies = response['data']['totalCompanies'];
        this.totalOffers = response['data']['totalOffers'];
        this.totalProfessionals = response['data']['totalProfessionals'];
      }, error => {
        this.flagTotal = false;
        this.messageService.error(error);
      }
    );
  }

}

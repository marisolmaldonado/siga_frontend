import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { Professional } from 'src/app/models/job-board/professional';
import { Paginator } from 'src/app/models/setting/paginator';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {

  @Input() professionalsIn: Professional[];
  @Input() paginatorIn: Paginator;
  @Input() flagProfessionals: boolean;

  @Output() paginatorOut = new EventEmitter<Paginator>();
  @Output() bodyOut = new EventEmitter<any>();

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void { }

  pageChange(event): void {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }

  professionalAplied(professional: Professional): void {
    const user = this.authService.getAuth();
    
    if (user) {
      this.spinnerService.show();
      this.jobBoardHttpService.applyProfessional(professional.id).subscribe(
        response => {
          this.spinnerService.hide();
          console.log(response);
          this.messageService.success(response);
        },
        error => {
          this.spinnerService.hide();
          console.error(error);
          this.messageService.error(error);
        }
      );
    } else {
      console.error('Primero necesitas iniciar sesión');
    }
  }

  loggedIn(): boolean {
    return this.authService.getAuth()? true : false;
  }
}

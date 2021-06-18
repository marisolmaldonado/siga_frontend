import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Experience } from '../../../../models/job-board/experience';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../shared/services/message.service';
import { DateValidators } from '../../../shared/validators/date.validators';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})

export class ExperienceComponent implements OnInit {
  paginator: Paginator;
  experiences: Experience[];
  formExperience: FormGroup;
  experience: Experience;
  experienceDialog: boolean;
  flagExperiences: boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService) {

    this.paginator = { current_page: 1, per_page: 2 };
    this.experiences = [];
  }

  ngOnInit(): void {
    this.getExperiences(this.paginator);
    this.buildFormExperience();
  }

  // Build form experience
  buildFormExperience() {
    this.formExperience = this.formBuilder.group({
      id: [null],
      professional: [null, Validators.required],
      area: [null, Validators.required],
      employer: [null, Validators.required],
      position: [null, [Validators.required, Validators.minLength(10)]],
      start_date: [null, Validators.required, DateValidators.valid],
      end_date: [null, Validators.required, DateValidators.valid],
      activities: this.formBuilder.array([this.formBuilder.control(null, Validators.required)]),
      is_working: [null, Validators.required],
    });
  }

  // experiences of backend
  getExperiences(paginator: Paginator) {
    const params = new HttpParams()
      .append('professional_id', "1")
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.flagExperiences = true;
    // this.spinnerService.show();
    this.jobBoardHttpService.get('experiences', params).subscribe(
      response => {
        // this.spinnerService.hide();
        this.flagExperiences = false;
        this.experiences = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        // this.spinnerService.hide();
        this.flagExperiences = false;
        this.messageService.error(error);
      });
  }
}
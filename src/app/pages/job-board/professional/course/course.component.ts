import { Professional } from './../../../../models/job-board/professional';
import { Institution } from './../../../../models/app/institution';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Course } from '../../../../models/job-board/course';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { MessageService } from '../../../shared/services/message.service';
import { DateValidators } from "../../../shared/validators/date.validators";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
    paginator: Paginator;
    courses: Course[];
    formCourse: FormGroup;
    course: Course;
    courseDialog: boolean;
    flagCourses: boolean;

    constructor(private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService,
        private breadcrumbService: BreadcrumbService) {
        this.paginator = { current_page: 1, per_page: 5 };
        this.courses = [];
    }

    ngOnInit(): void {
        this.getCourses(this.paginator);
        this.buildFormCourse();
    }

    // Build form course
    buildFormCourse() {
        this.formCourse = this.formBuilder.group({
            id: [null],
            name: [null, Validators.required],
            description: [null, [Validators.required, Validators.minLength(10)]],
            start_date: [null, Validators.required, DateValidators.valid],
            end_date: [null, Validators.required, DateValidators.valid],
            hours: [null, Validators.required],
            professional: [null, Validators.required],
            type: [null, Validators.required],
            institution: [null, Validators.required],
            certification_type: [null, Validators.required],
            area: [null, Validators.required],

        });
    }

    // courses of backend
    getCourses(paginator: Paginator) {
        const params = new HttpParams()
            .append('professional_id', "1")
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagCourses = true;
        // this.spinnerService.show();
        this.jobBoardHttpService.get('courses', params).subscribe(
            response => {
                // this.spinnerService.hide();
                this.flagCourses = false;
                this.courses = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                // this.spinnerService.hide();
                this.flagCourses = false;
                this.messageService.error(error);
            });
    }
}

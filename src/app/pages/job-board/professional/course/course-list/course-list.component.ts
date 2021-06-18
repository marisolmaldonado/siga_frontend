import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../../../../models/job-board/course';
import { FormGroup } from '@angular/forms';
import { Col } from '../../../../../models/setting/col';
import { Paginator } from '../../../../../models/setting/paginator';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { HttpParams } from '@angular/common/http';
import { File } from '../../../../../models/app/file';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
    @Input() flagCourses: boolean;
    @Input() coursesIn: Course[];
    @Input() paginatorIn: Paginator;
    @Input() formCourseIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() coursesOut = new EventEmitter<Course[]>();
    @Output() formCourseOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedCourses: any[];
    selectedCourse: Course;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;
    colsCourse: Col[];

    constructor(private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private jobBoardHttpService: JobBoardHttpService) {
        this.resetPaginatorCourses();
        //this.resetPaginatorFiles();
    }

    resetPaginatorCourses() {
        this.paginatorIn = { current_page: 1, per_page: 5 };
    }

    // resetPaginatorFiles() {
    //     this.paginatorFiles = { current_page: 1, per_page: 5 };
    // }
    ngOnInit(): void {

    }

    // Search courses in backend
    searchCourses(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('courses', params).subscribe(response => {
                this.coursesIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormCourse() {
        this.formCourseIn.reset();
        this.formCourseOut.emit(this.formCourseIn);
        this.displayOut.emit(true);
    }

    openEditFormCourse(course: Course) {
        this.formCourseIn.patchValue(course);
        this.formCourseOut.emit(this.formCourseIn);
        this.displayOut.emit(true);
    }
    openUploadFilesCourse() {
        this.dialogUploadFiles = true;
    }

    selectCourse(course: Course) {
        this.selectedCourse = course;
    }

    openViewFilesCourse() {
        this.getFiles(this.paginatorFiles);
    }

    getFiles(paginator: Paginator = null) {
        let params = new HttpParams().append('id', this.selectedCourse.id.toString());
        if (paginator) {
            params = params.append('page', paginator.current_page.toString())
                .append('per_page', paginator.per_page.toString());
        }
        this.spinnerService.show();
        this.jobBoardHttpService.getFiles('course/file', params).subscribe(response => {
            this.spinnerService.hide();
            this.files = response['data'];
            this.paginatorFiles = response as Paginator;
            this.dialogViewFiles = true;
        }, error => {
            this.spinnerService.hide();
            this.files = [];
            this.dialogViewFiles = true;
            this.messageService.error(error);
        });
    }

    pageChange(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

    deleteCourses(course = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (course) {
                        this.selectedCourses = [];
                        this.selectedCourses.push(course);
                    }

                    const ids = this.selectedCourses.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('course/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeCourses(ids);
                            this.selectedCourses = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeCourses(ids) {
        for (const id of ids) {
            this.coursesIn = this.coursesIn.filter(element => element.id !== id);
        }
        this.coursesOut.emit(this.coursesIn);
    }

    upload(event, id) {
        console.log(event);
        const formData = new FormData();
        for (const file of event) {
            formData.append('files[]', file);
        }
        formData.append('id', id.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.uploadFiles('course/file', formData).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.getFiles(this.paginatorFiles);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    searchFiles(search) {
        let params = new HttpParams().append('id', this.selectedCourse.id.toString());
        params = search.length > 0 ? params.append('search', search) : params;
        this.spinnerService.show();
        this.jobBoardHttpService.get('course/file', params).subscribe(response => {
            this.files = response['data'];
            this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}

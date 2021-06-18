import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from '../../../../../models/job-board/experience';
import { FormGroup } from '@angular/forms';
import { Col } from '../../../../../models/setting/col';
import { Paginator } from '../../../../../models/setting/paginator';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { HttpParams } from '@angular/common/http';
import { File } from '../../../../../models/app/file';

@Component({
    selector: 'app-experience-list',
    templateUrl: './experience-list.component.html',
    styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {
    @Input() flagExperiences: boolean;
    @Input() experiencesIn: Experience[];
    @Input() paginatorIn: Paginator;
    @Input() formExperienceIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() experiencesOut = new EventEmitter<Experience[]>();
    @Output() formExperienceOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedExperiences: any[];
    selectedExperience: Experience;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;
    colsExperience: Col[];

    constructor(private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private jobBoardHttpService: JobBoardHttpService) {
        this.resetPaginatorExperiences();
        this.resetPaginatorFiles();
    }

    ngOnInit(): void {
        this.loadColsExperience();
    }

    loadColsExperience() {
        this.colsExperience = [
            { field: 'type', header: 'Tipo' },
            { field: 'description', header: 'Descripción' },
        ];
    }

    // Search experiences in backend
    searchExperiences(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('experiences', params).subscribe(response => {
                this.experiencesIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormExperience() {
        this.formExperienceIn.reset();
        this.formExperienceOut.emit(this.formExperienceIn);
        this.displayOut.emit(true);
    }

    openEditFormExperience(experience: Experience) {
        this.formExperienceIn.patchValue(experience);
        this.formExperienceOut.emit(this.formExperienceIn);
        this.displayOut.emit(true);
    }

    selectExperience(experience: Experience) {
        this.selectedExperience = experience;
    }

    openViewFilesExperience() {
        this.getFiles();
    }

    getFiles(paginator: Paginator = null) {
        let params = new HttpParams().append('id', this.selectedExperience.id.toString());
        if (paginator) {
            params = params.append('page', paginator.current_page.toString())
                .append('per_page', paginator.per_page.toString());
        }
        this.spinnerService.show();
        this.jobBoardHttpService.getFiles('experience/file', params).subscribe(response => {
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

    paginateExperience(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

    deleteExperiences(experience = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (experience) {
                        this.selectedExperiences = [];
                        this.selectedExperiences.push(experience);
                    }

                    const ids = this.selectedExperiences.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('experience/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeExperiences(ids);
                            this.selectedExperiences = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeExperiences(ids) {
        for (const id of ids) {
            this.experiencesIn = this.experiencesIn.filter(element => element.id !== id);
        }
        this.paginatorIn.total = this.experiencesIn?.length;
        this.experiencesOut.emit(this.experiencesIn);
    }

    upload(files, id) {
        const formData = new FormData();
        for (const file of files) {
            formData.append('files[]', file);
        }
        formData.append('id', id.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.uploadFiles('experience/file', formData).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.getFiles(this.paginatorFiles);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    resetPaginatorExperiences() {
        this.paginatorIn = { current_page: 1, per_page: 5 };
    }

    resetPaginatorFiles() {
        this.paginatorFiles = { current_page: 1, per_page: 5 };
    }

    searchFiles(search) {
        let params = new HttpParams().append('id', this.selectedExperience.id.toString());
        params = search.length > 0 ? params.append('search', search) : params;
        this.spinnerService.show();
        this.jobBoardHttpService.get('experience/file', params).subscribe(response => {
            this.files = response['data'];
            this.paginatorFiles = response as Paginator;
            this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}

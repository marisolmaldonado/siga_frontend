import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skill} from '../../../../../models/job-board/skill';
import {FormGroup} from '@angular/forms';
import {Col} from '../../../../../models/setting/col';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../shared/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';
import {File} from '../../../../../models/app/file';

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
    @Input() flagSkills: boolean;
    @Input() skillsIn: Skill[];
    @Input() paginatorIn: Paginator;
    @Input() formSkillIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() skillsOut = new EventEmitter<Skill[]>();
    @Output() formSkillOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedSkills: any[];
    selectedSkill: Skill;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;
    colsSkill: Col[];

    constructor(public messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.resetPaginator();
    }

    resetPaginator() {
        this.paginatorFiles = {current_page: 1, per_page: 5};
    }

    ngOnInit(): void {
        this.loadColsSkill();
    }

    // Columns table
    loadColsSkill() {
        this.colsSkill = [
            {field: 'type', header: 'Tipo'},
            {field: 'description', header: 'Descripción'},
        ];
    }

    // Search skills in backend
    searchSkills(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('skills', params).subscribe(response => {
                this.skillsIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormSkill() {
        this.formSkillIn.reset();
        this.formSkillOut.emit(this.formSkillIn);
        this.displayOut.emit(true);
    }

    openEditFormSkill(skill: Skill) {
        this.formSkillIn.patchValue(skill);
        this.formSkillOut.emit(this.formSkillIn);
        this.displayOut.emit(true);
    }

    openUploadFilesSkill()  {
        this.dialogUploadFiles = true;
    }

    selectSkill(skill: Skill) {
        this.selectedSkill = skill;
    }

    openViewFilesSkill() {
        this.getFiles(this.paginatorFiles);
    }

    getFiles(paginator: Paginator) {
        const params = new HttpParams()
            .append('id', this.selectedSkill.id.toString())
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.getFiles('skill/file', params).subscribe(response => {
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

    deleteSkills(skill = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (skill) {
                        this.selectedSkills = [];
                        this.selectedSkills.push(skill);
                    }

                    const ids = this.selectedSkills.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('skill/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeSkills(ids);
                            this.selectedSkills = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeSkills(ids) {
        for (const id of ids) {
            this.skillsIn = this.skillsIn.filter(element => element.id !== id);
        }
        this.skillsOut.emit(this.skillsIn);
    }

    upload(event, id) {
        console.log(event);
        const formData = new FormData();
        for (const file of event) {
            formData.append('files[]', file);
        }
        formData.append('id', id.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.uploadFiles('skill/file', formData).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.getFiles(this.paginatorFiles);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    searchFiles(search) {
        let params = new HttpParams().append('id', this.selectedSkill.id.toString());
        params = search.length > 0 ? params.append('search', search) : params;
        this.spinnerService.show();
        this.jobBoardHttpService.get('skill/file', params).subscribe(response => {
            this.files = response['data'];
            this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}

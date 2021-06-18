import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../../../../models/job-board/language';
import {FormGroup} from '@angular/forms';
import {Col} from '../../../../../models/setting/col';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../shared/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';
import {File} from "../../../../../models/app/file";

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {
    @Input() flagLanguages: boolean;
    @Input() languagesIn: Language[];
    @Input() paginatorIn: Paginator;
    @Input() formLanguageIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() languagesOut = new EventEmitter<Language[]>();
    @Output() formLanguageOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedLanguages: any[];
    selectedLanguage: Language;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;

    constructor(private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private jobBoardHttpService: JobBoardHttpService) {
                    this.resetPaginatorLanguages();
                    this.resetPaginatorFiles();
    }

    resetPaginatorLanguages() {
        this.paginatorIn = {current_page: 1, per_page: 5};
    }

    resetPaginatorFiles() {
        this.paginatorFiles = {current_page: 1, per_page: 5};
    }

    ngOnInit(): void {
    }

    // Search languages in backend
    searchLanguages(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('languages', params).subscribe(response => {
                this.languagesIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormLanguage() {
        this.formLanguageIn.reset();
        this.formLanguageOut.emit(this.formLanguageIn);
        this.displayOut.emit(true);
    }

    openEditFormLanguage(language: Language) {
        this.formLanguageIn.patchValue(language);
        this.formLanguageOut.emit(this.formLanguageIn);
        this.displayOut.emit(true);
    }

    openUploadFilesLanguage() {
        this.dialogUploadFiles = true;
    }

    selectLanguage(language: Language) {
        this.selectedLanguage = language;
    }

    openViewFilesLanguage() {
        this.getFiles(this.paginatorFiles);
    }

    getFiles(paginator: Paginator = null) {
        let params = new HttpParams().append('id', this.selectedLanguage.id.toString());
        if (paginator) {
            params = params.append('page', paginator.current_page.toString())
                .append('per_page', paginator.per_page.toString());
        }
        this.spinnerService.show();
        this.jobBoardHttpService.getFiles('language/file', params).subscribe(response => {
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

    deleteLanguages(language = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (language) {
                        this.selectedLanguages = [];
                        this.selectedLanguages.push(language);
                    }

                    const ids = this.selectedLanguages.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('language/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeLanguages(ids);
                            this.selectedLanguages = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeLanguages(ids) {
        for (const id of ids) {
            this.languagesIn = this.languagesIn.filter(element => element.id !== id);
        }
        this.languagesOut.emit(this.languagesIn);
    }

    upload(event, id) {
        console.log(event);
        const formData = new FormData();
        for (const file of event) {
            formData.append('files[]', file);
        }
        formData.append('id', id.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.uploadFiles('language/file', formData).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.getFiles(this.paginatorFiles);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    searchFiles(search) {
        let params = new HttpParams().append('id', this.selectedLanguage.id.toString());
        params = search.length > 0 ? params.append('search', search) : params;
        this.spinnerService.show();
        this.jobBoardHttpService.get('language/file', params).subscribe(response => {
            this.files = response['data'];
            this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}

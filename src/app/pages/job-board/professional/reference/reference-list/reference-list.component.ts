import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reference } from '../../../../../models/job-board/reference';
import { FormGroup } from '@angular/forms';
import { Col } from '../../../../../models/setting/col';
import { Paginator } from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { HttpParams } from '@angular/common/http';
import { File } from '../../../../../models/app/file';

@Component({
    selector: 'app-reference-list',
    templateUrl: './reference-list.component.html',
    styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {
    @Input() flagReferences: boolean;
    @Input() referencesIn: Reference[];
    @Input() paginatorIn: Paginator;
    @Input() formReferenceIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() referencesOut = new EventEmitter<Reference[]>();
    @Output() formReferenceOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedReferences: any[];
    selectedReference: Reference;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;

    constructor(private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private jobBoardHttpService: JobBoardHttpService) {
            this.resetPaginatorReferences();
            this.resetPaginatorFiles();
    }

   resetPaginatorReferences() {
        this.paginatorIn = {current_page: 1, per_page: 5};
    }

    resetPaginatorFiles() {
        this.paginatorFiles = {current_page: 1, per_page: 5};
    }

    ngOnInit(): void {
    }

    // Search references in backend
    searchReferences(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('references', params).subscribe(response => {
                this.referencesIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormReference() {
        this.formReferenceIn.reset();
        this.formReferenceOut.emit(this.formReferenceIn);
        this.displayOut.emit(true);
    }

    openEditFormReference(reference: Reference) {
        this.formReferenceIn.patchValue(reference);
        this.formReferenceOut.emit(this.formReferenceIn);
        this.displayOut.emit(true);
    }

    openUploadFilesReference() {
        this.dialogUploadFiles = true;
    }

    selectReference(reference: Reference) {
        this.selectedReference = reference;
    }

    openViewFilesReference() {
        this.getFiles(this.paginatorFiles);
    }

    getFiles(paginator: Paginator = null) {
        let params = new HttpParams().append('id', this.selectedReference.id.toString());
        if (paginator) {
            params = params.append('page', paginator.current_page.toString())
                .append('per_page', paginator.per_page.toString());
        }
        this.spinnerService.show();
        this.jobBoardHttpService.getFiles('reference/file', params).subscribe(response => {
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

    deletReferences(reference = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (reference) {
                        this.selectedReferences = [];
                        this.selectedReferences.push(reference);
                    }

                    const ids = this.selectedReferences.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('reference/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeReferences(ids);
                            this.selectedReferences = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeReferences(ids) {
        for (const id of ids) {
            this.referencesIn = this.referencesIn.filter(element => element.id !== id);
        }
        this.referencesOut.emit(this.referencesIn);
    }

    upload(event, id) {
        console.log(event);
        const formData = new FormData();
        for (const file of event) {
            formData.append('files[]', file);
        }
        formData.append('id', id.toString());
        this.spinnerService.show();
        this.jobBoardHttpService.uploadFiles('reference/file', formData).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.getFiles(this.paginatorFiles);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    searchFiles(search) {
        let params = new HttpParams().append('id', this.selectedReference.id.toString());
        params = search.length > 0 ? params.append('search', search) : params;
        this.spinnerService.show();
        this.jobBoardHttpService.get('reference/file', params).subscribe(response => {
            this.files = response['data'];
            this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}
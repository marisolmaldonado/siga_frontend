import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import {Professional} from '../../../../models/job-board/professional';
import {Paginator} from '../../../../models/setting/paginator';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../shared/services/message.service';
import {DateValidators} from '../../../shared/validators/date.validators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfessionalComponent implements OnInit {
    paginator: Paginator;
    profiles: Professional[];
    formProfile: FormGroup;
    profile: Professional;
    profileDialog: boolean;
    flagProfiles: boolean;

    constructor(
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService) {

        this.paginator = {current_page: 1, per_page: 2};
        this.profiles = [];
    }

    ngOnInit(): void {
        this.getProfiles(this.paginator);
        this.buildFormProfile();
    }

    // Build form profile
    buildFormProfile() {
        this.formProfile = this.formBuilder.group({
            id: [null],
            address: [null],
            type: [null, Validators.required],
            description: [null, [Validators.required, Validators.minLength(10)]],
        });
    }

    // profiles of backend
    getProfiles(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagProfiles = true;
        // this.spinnerService.show();
        this.jobBoardHttpService.get('profiles', params).subscribe(
            response => {
                // this.spinnerService.hide();
                this.flagProfiles = false;
                this.profiles = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                // this.spinnerService.hide();
                this.flagProfiles = false;
                this.messageService.error(error);
            });
    }
}

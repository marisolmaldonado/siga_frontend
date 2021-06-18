import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthHttpService} from '../../../../services/auth/auth-http.service';
import {MessageService} from '../../../shared/services/message.service';
import {CustomValidators} from '../../../shared/validators/custom-validators';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    @Input() passwordOld: string;
    @Output() flagLogin = new EventEmitter<string>();
    formChangePassword: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private spinnerService: NgxSpinnerService,
                public messageService: MessageService,
                private authHttpService: AuthHttpService
    ) {
    }

    ngOnInit(): void {
        this.buildFormChangePassword();
    }

    buildFormChangePassword() {
        this.formChangePassword = this.formBuilder.group({
            password_old: [this.passwordOld],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
        }, {validators: CustomValidators.passwordMatchValidator});
    }

    changePassword() {
        this.spinnerService.show();
        this.authHttpService.changePassword(this.formChangePassword.value).subscribe(
            response => {
                this.spinnerService.hide();
                this.flagLogin.emit('selectInstitutionRole');
            },
            error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    onSubmitChangePassword() {
        if (this.formChangePassword.valid) {
            this.changePassword();
        } else {
            this.formChangePassword.markAllAsTouched();
        }
    }

    get passwordField() {
        return this.formChangePassword.get('password');
    }

    get passwordConfirmationField() {
        return this.formChangePassword.get('password_confirmation');
    }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/auth/user';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../shared/services/message.service';
import {CustomValidators} from '../../shared/validators/custom-validators';

@Component({
    selector: 'app-unlock-user',
    templateUrl: './unlock-user.component.html',
    styleUrls: ['./unlock-user.component.scss']
})
export class UnlockUserComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    user: User;
    formPasswordReset: FormGroup;

    constructor(
        private authHttpService: AuthHttpService,
        private spinnerService: NgxSpinnerService,
        public messageService: MessageService,
        private router: Router,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildFormPasswordReset();
    }

    buildFormPasswordReset() {
        this.formPasswordReset = this.formBuilder.group({
            token: [this.activatedRoute.snapshot.queryParams.token, Validators.required],
            username: [this.activatedRoute.snapshot.queryParams.username, Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
        }, {validators: CustomValidators.passwordMatchValidator});
    }

    onSubmitResetPassword() {
        if (this.formPasswordReset.valid) {
            this.resetPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }

    resetPassword() {
        this.spinnerService.show();
        this.authHttpService.unlock(this.formPasswordReset.value).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.success(response);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    get usernameField() {
        return this.formPasswordReset.get('username');
    }

    get passwordField() {
        return this.formPasswordReset.get('password');
    }

    get passwordConfirmationField() {
        return this.formPasswordReset.get('password_confirmation');
    }
}

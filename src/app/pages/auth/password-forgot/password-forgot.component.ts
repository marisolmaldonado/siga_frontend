import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../shared/services/message.service';

@Component({
    selector: 'app-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
    @ViewChild('grecaptchaPasswordForgot') captcha: any;
    dark: boolean;
    checked: boolean;
    formPasswordReset: FormGroup;
    flagPasswordReset: boolean;
    SITE_KEY: string;

    constructor(
        private authHttpService: AuthHttpService,
        private spinnerService: NgxSpinnerService,
        public messageService: MessageService,
        private router: Router,
        private formBuilder: FormBuilder) {
        this.SITE_KEY = environment.SITE_KEY;
    }

    ngOnInit(): void {
        this.buildFormPasswordReset();
    }

    buildFormPasswordReset() {
        this.formPasswordReset = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }

    onSubmitForgotPassword() {
        if (this.formPasswordReset.valid) {
            this.forgotPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }

    forgotPassword() {
        this.spinnerService.show();
        this.authHttpService.passwordForgot(this.formPasswordReset.controls['username'].value).subscribe(
            response => {
                this.spinnerService.hide();
                this.flagPasswordReset = false;
                this.captcha.reset();
                this.messageService.success(response);
            }, error => {
                this.spinnerService.hide();
                this.flagPasswordReset = false;
                this.captcha.reset();
                this.messageService.error(error);
            });
    }

    showResponse() {
        this.flagPasswordReset = true;
    }

    get usernameField() {
        return this.formPasswordReset.get('username');
    }
}

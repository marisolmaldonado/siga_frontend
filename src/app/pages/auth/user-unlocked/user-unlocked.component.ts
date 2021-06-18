import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../shared/services/message.service';

@Component({
    selector: 'app-user-unlocked',
    templateUrl: './user-unlocked.component.html',
    styleUrls: ['./user-unlocked.component.scss']
})
export class UserUnlockedComponent implements OnInit {
    @ViewChild('grecaptchaUserUnlock') captcha: any;
    dark: boolean;
    checked: boolean;
    formPasswordReset: FormGroup;
    flagUserLocked: boolean;
    SITE_KEY: string;

    constructor(private authHttpService: AuthHttpService,
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
        this.authHttpService.userUnlock(this.formPasswordReset.controls['username'].value).subscribe(response => {
            this.spinnerService.hide();
            this.flagUserLocked = false;
            this.captcha.reset();
            this.messageService.success(response);
        }, error => {
            this.spinnerService.hide();
            this.flagUserLocked = false;
            this.captcha.reset();
            this.messageService.error(error);
        });
    }

    showResponse() {
        this.flagUserLocked = true;
    }

    get usernameField() {
        return this.formPasswordReset.get('username');
    }
}

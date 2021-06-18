import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/auth/user';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../shared/services/message.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-unlock-user',
    templateUrl: './register-socialite-user.component.html',
    styleUrls: ['./register-socialite-user.component.scss']
})
export class RegisterSocialiteUserComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    user: User;
    formSocialiteUser: FormGroup;

    constructor(
        private authHttpService: AuthHttpService,
        private authService: AuthService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private router: Router,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildFormRegisterSocialiteUser();
    }

    buildFormRegisterSocialiteUser() {
        let givenName = this.activatedRoute.snapshot.queryParams.given_name;
        let familyName = this.activatedRoute.snapshot.queryParams.family_name;

        givenName = givenName.toString().split(' ', 2);
        familyName = familyName.toString().split(' ', 2);

        this.formSocialiteUser = this.formBuilder.group({
            username: [this.activatedRoute.snapshot.queryParams.username, Validators.required],
            first_name: [givenName[0], Validators.required],
            second_name: [givenName[1], Validators.required],
            first_lastname: [familyName[0], Validators.required],
            second_lastname: [familyName[1], Validators.required],
            email: [this.activatedRoute.snapshot.queryParams.email, Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmitResetPassword(event: Event) {
        event.preventDefault();
        if (this.formSocialiteUser.valid) {
            this.register();
        } else {
            this.formSocialiteUser.markAllAsTouched();
        }
    }

    register() {
        if (this.checkPasswords()) {
            this.spinnerService.show();
            this.authHttpService.post('auth/register-socialite-user', this.formSocialiteUser.value).subscribe(
                response => {
                    this.spinnerService.hide();
                    this.messageService.success(response);
                    this.authService.setToken({access_token: response['data']});
                }, error => {
                    this.spinnerService.hide();
                    this.messageService.error(error);
                });
        }
    }

    checkPasswords() {
        return this.passwordField.value === this.passwordConfirmationField.value;
    }

    get usernameField() {
        return this.formSocialiteUser.get('username');
    }

    get firstNameField() {
        return this.formSocialiteUser.get('first_name');
    }

    get secondNameField() {
        return this.formSocialiteUser.get('second_name');
    }

    get firstLastnameField() {
        return this.formSocialiteUser.get('first_lastname');
    }

    get secondLastnameField() {
        return this.formSocialiteUser.get('second_lastname');
    }

    get emailField() {
        return this.formSocialiteUser.get('email');
    }

    get passwordField() {
        return this.formSocialiteUser.get('password');
    }

    get passwordConfirmationField() {
        return this.formSocialiteUser.get('password_confirmation');
    }
}

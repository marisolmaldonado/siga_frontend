import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {MessageService} from '../../../shared/services/message.service';
import {User, Role} from '../../../../models/auth/models.index';
import {Institution} from '../../../../models/app/institution';
import {AuthHttpService} from '../../../../services/auth/auth-http.service';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-select-role',
    templateUrl: './select-role.component.html',
    styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit {
    @Output() flagLogin = new EventEmitter<string>();
    formRole: FormGroup;
    roles: Role[];
    auth: User;
    STORAGE_URL: string = environment.STORAGE_URL;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authHttpService: AuthHttpService,
                private spinnerService: NgxSpinnerService,
                public messageService: MessageService,
                private authService: AuthService
    ) {
        this.auth = authService.auth;
    }

    ngOnInit(): void {
        this.buildFormRole();
        this.getRoles();
    }

    buildFormRole() {
        this.formRole = this.formBuilder.group({
            role: [null, Validators.required],
        });
    }

    onSubmitContinue() {
        if (this.formRole.valid) {
            this.continueLogin();
        } else {
            this.formRole.markAllAsTouched();
        }
    }

    continueLogin() {
        this.authService.setAuth(this.authService.auth);
        this.authService.setRole(this.roleField.value);
        this.router.navigate(['/']);
    }

    getRoles() {
        this.spinnerService.show();
        this.authHttpService.get('auth/roles').subscribe(response => {
            this.spinnerService.hide();
            this.roles = response['data'];
            if (this.roles?.length === 1) {
                this.roleField.setValue(this.roles[0]);
                this.getPermissions();
            }
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
            this.roles = [];
        });
    }

    getPermissions() {
        const params = new HttpParams().append('role', this.roleField.value['id']);
        this.spinnerService.show();
        this.authHttpService.get('auth/permissions', params).subscribe(response => {
            this.spinnerService.hide();
            const permissions = response['data'];
            this.authService.setPermissions(permissions);
            this.continueLogin();
        }, error => {
            this.spinnerService.hide();
            this.messageService.success(error);
        });
    }

    returnLogin() {
        this.flagLogin.emit('login');
    }

    get roleField() {
        return this.formRole.get('role');
    }
}

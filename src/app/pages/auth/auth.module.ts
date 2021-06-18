// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthRoutes} from './auth.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CaptchaModule} from 'primeng/captcha';
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DividerModule} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';

// My Components
import {AppNotFoundComponent} from './app.not-found.component';
import {AppAccessDeniedComponent} from './app.access-denied.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';
import {UserUnlockedComponent} from './user-unlocked/user-unlocked.component';
import {UnlockUserComponent} from './unlock-user/unlock-user.component';
import {AppUnderMaintenanceComponent} from './app.under-maintenance.component';
import {SecurityQuestionComponent} from './security-question/security-question.component';
import {ChangePasswordComponent} from './login/change-password/change-password.component';
import {SelectRoleComponent} from './login/select-institution-role/select-role.component';
import {RegisterSocialiteUserComponent} from './register-socialite-user/register-socialite-user.component';
import {AppUnregisteredUserComponent} from './app.unregistered-user.component';
import {SharedModule} from '../shared/shared.module';
import {RippleModule} from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        CaptchaModule,
        CheckboxModule,
        DividerModule,
        SharedModule,
        RippleModule,
    ],
    declarations: [
        AppNotFoundComponent,
        AppAccessDeniedComponent,
        AppLoginComponent,
        PasswordResetComponent,
        PasswordForgotComponent,
        UserUnlockedComponent,
        UnlockUserComponent,
        AppUnderMaintenanceComponent,
        SecurityQuestionComponent,
        ChangePasswordComponent,
        SelectRoleComponent,
        RegisterSocialiteUserComponent,
        AppUnregisteredUserComponent,
    ],
    providers: []
})
export class AuthModule {
}

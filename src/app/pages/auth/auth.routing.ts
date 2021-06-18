// Angular Router
import {Routes} from '@angular/router';

// My Components
import {AppNotFoundComponent} from './app.not-found.component';
import {AppAccessDeniedComponent} from './app.access-denied.component';
import {AppUnderMaintenanceComponent} from './app.under-maintenance.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';
import {UserUnlockedComponent} from './user-unlocked/user-unlocked.component';
import {UnlockUserComponent} from './unlock-user/unlock-user.component';
import {RegisterSocialiteUserComponent} from './register-socialite-user/register-socialite-user.component';
import {AppUnregisteredUserComponent} from './app.unregistered-user.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'not-found',
                component: AppNotFoundComponent
            },
            {
                path: 'access-denied',
                component: AppAccessDeniedComponent
            },
            {
                path: 'under-maintenance',
                component: AppUnderMaintenanceComponent
            },
            {
                path: 'login',
                component: AppLoginComponent
            },
            {
                path: 'password-reset',
                component: PasswordResetComponent
            },
            {
                path: 'password-forgot',
                component: PasswordForgotComponent
            },
            {
                path: 'user-unlocked',
                component: UserUnlockedComponent
            },
            {
                path: 'unlock-user',
                component: UnlockUserComponent
            },
            {
                path: 'register-socialite-user',
                component: RegisterSocialiteUserComponent
            },
            {
                path: 'unregistered-user',
                component: AppUnregisteredUserComponent
            },
        ]
    }
];

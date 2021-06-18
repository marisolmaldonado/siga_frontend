// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {CompanyComponent} from './company.component';
import {RegisterComponent} from './register/register.component';

// My Components

export const CompanyRouting: Routes = [
    {
        path: '',
        component: CompanyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
];

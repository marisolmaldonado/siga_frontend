// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {ProfessionalComponent} from './professional.component';

// My Components

export const ProfessionalRouting: Routes = [
    {
        path: '',
        component: ProfessionalComponent,
        canActivate: [AuthGuard]
    }
];

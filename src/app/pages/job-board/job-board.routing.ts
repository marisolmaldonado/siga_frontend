// Angular Router
import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfessionalComponent } from './professional/professional.component';

// My Components

export const JobBoardRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'professional',
                loadChildren: () => import('./professional/professional.module').then(m => m.ProfessionalModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'company',
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'web',
                loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
            },
        ]
    },
    {
        path: 'category', component: CategoryComponent
    }
];

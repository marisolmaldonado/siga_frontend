import {PreloadAllModules, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

// Components
import {AppMainComponent} from './shared/components/main/app.main.component';
import {AppBlankComponent} from './shared/components/blank/app.blank.component';

// Guards
import {AuthGuard} from './shared/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'job-board',
                        loadChildren: () => import('./pages/job-board/job-board.module').then(m => m.JobBoardModule),
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'job-board-web',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/job-board/job-board.module').then(m => m.JobBoardModule)
            },
            {
                path: 'auth',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
            {path: '**', redirectTo: '/auth/not-found'},
        ], {
            // enableTracing: true,
            // preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRouting {
}

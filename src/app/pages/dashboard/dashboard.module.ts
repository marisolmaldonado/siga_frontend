import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutes} from './dashboard.routing';

// PrimeNG Modules
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

// My Components
import {DashboardComponent} from './dashboard.component';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {DividerModule} from 'primeng/divider';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        TooltipModule,
        DialogModule,
        MessagesModule,
        DividerModule,
    ],
    declarations: [DashboardComponent],
    providers: []
})
export class DashboardModule {
}

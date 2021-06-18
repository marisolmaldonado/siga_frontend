// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CompanyRouting} from './company.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';

// My Components
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../../shared/shared.module';
import {RippleModule} from 'primeng/ripple';
import {CompanyComponent} from './company.component';
import {OfferComponent} from "./offer/offer.component";
import {ProfileComponent} from './profile/profile.component';
import {ProfessionalComponent} from './professional/professional.component';
import {RegisterComponent} from './register/register.component';
import {RegisterFormComponent} from './register/register-form/register-form.component';
import {ProfileFormComponent} from './profile/profile-form/profile-form.component';
import {ProfessionalListComponent} from './professional/professional-list/professional-list.component';
import {OfferListComponent} from './offer/offer-list/offer-list.component';
import {OfferFormComponent} from './offer/offer-form/offer-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CompanyRouting),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        DialogModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        TooltipModule,
        DropdownModule,
        PaginatorModule,
        KeyFilterModule,
        TabViewModule,
        TreeModule,
        AccordionModule,
        OverlayPanelModule,
        SharedModule,
        CardModule,
        SkeletonModule,
        RippleModule,
    ],
    declarations: [
        CompanyComponent,
        OfferComponent,
        OfferListComponent,
        OfferFormComponent,
        ProfileComponent,
        ProfileFormComponent,
        ProfessionalComponent,
        ProfessionalListComponent,
        RegisterComponent,
        RegisterFormComponent,
    ],
    providers: []
})
export class CompanyModule {
}

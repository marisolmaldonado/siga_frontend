// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LandingPageRouting} from './landing-page.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';
import {DataViewModule} from 'primeng/dataview';
import {TabMenuModule} from 'primeng/tabmenu';
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
import {RippleModule} from 'primeng/ripple';
import {SplitButtonModule} from 'primeng/splitbutton';

// My Components
import {SharedModule} from '../../shared/shared.module';
import {LandingPageComponent} from './landing-page.component';
import {WebOfferComponent} from './web-offer/web-offer.component';
import {WebProfessionalComponent} from './web-professional/web-professional.component';
import { OfferDataViewComponent } from './web-offer/offer-data-view/offer-data-view.component';
import {TotalComponent} from './total/total.component';
import {ProfessionalListComponent} from './web-professional/professional-list/professional-list.component';
import { DataViewGridItemComponent } from './web-offer/offer-data-view/data-view-grid-item/data-view-grid-item.component';
import { DataViewListItemComponent } from './web-offer/offer-data-view/data-view-list-item/data-view-list-item.component';
import {DividerModule} from 'primeng/divider';
import {CategoryFilterComponent} from './web-professional/category-filter/category-filter.component';
import {FilterComponent} from './web-professional/filter/filter.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LandingPageRouting),
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
        DataViewModule,
        TabMenuModule,
        DividerModule,
        SplitButtonModule
    ],
    declarations: [
        LandingPageComponent,
        WebOfferComponent,
        WebProfessionalComponent,
        TotalComponent,
        ProfessionalListComponent,
        CategoryFilterComponent,
        FilterComponent,
        OfferDataViewComponent,
        DataViewGridItemComponent,
        DataViewListItemComponent,
    ],
    providers: []
})
export class LandingPageModule {
}

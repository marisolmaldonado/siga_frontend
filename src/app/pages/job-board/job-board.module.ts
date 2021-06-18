// Angular Modules
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JobBoardRouting} from './job-board.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';
import {BreadcrumbModule} from 'primeng/breadcrumb';

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
import {TabPanel, TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../shared/shared.module';
import {JobBoardComponent} from './job-board.component';
import {RippleModule} from 'primeng/ripple';
import { CategoryComponent } from './category/category.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JobBoardRouting),
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
        CardModule,
        SkeletonModule,
        RippleModule,
        BreadcrumbModule,
    ],
    declarations: [
        JobBoardComponent,
        CategoryComponent,
    ],
    exports: [],
    providers: []
})
export class JobBoardModule {
}

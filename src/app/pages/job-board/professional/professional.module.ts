// Angular Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfessionalRouting } from './professional.routing';

// PrimeNG Modules
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';

// My Components
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../shared/shared.module';
import { RippleModule } from 'primeng/ripple';
import { ProfessionalComponent } from './professional.component';
import { SkillComponent } from './skill/skill.component';
import { SkillFormComponent } from './skill/skill-form/skill-form.component';
import { SkillListComponent } from './skill/skill-list/skill-list.component';
import { CourseComponent } from './course/course.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { CourseListComponent } from './course/course-list/course-list.Component';
import { ReferenceComponent } from './reference/reference.component';
import { ReferenceFormComponent } from './reference/reference-form/reference-form.component';
import { ReferenceListComponent } from './reference/reference-list/reference-list.Component';
import { ExperienceComponent } from './experience/experience.component';
import { ExperienceFormComponent } from './experience/experience-form/experience-form.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.Component';
import { LanguageComponent } from './language/language.component';
import {LanguageFormComponent} from './language/language-form/language-form.component';
import {LanguageListComponent} from './language/language-list/language-list.component';
import {ProfileComponent} from '../company/profile/profile.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProfessionalRouting),
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
        ProfessionalComponent,
        ProfileComponent,
        SkillComponent,
        SkillFormComponent,
        SkillListComponent,
        CourseComponent,
        CourseFormComponent,
        CourseListComponent,
        ReferenceComponent,
        ReferenceListComponent,
        ReferenceFormComponent,
        ExperienceComponent,
        ExperienceListComponent,
        ExperienceFormComponent,
        LanguageComponent,
        LanguageFormComponent,
        LanguageListComponent

    ],
    providers: []
})
export class ProfessionalModule {
}

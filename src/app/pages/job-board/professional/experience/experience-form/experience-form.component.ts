import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from '../../../../../models/job-board/experience';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';
import { MessageService as MessagePnService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
    selector: 'app-experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.scss']
})

export class ExperienceFormComponent implements OnInit {
    @Input() formExperienceIn: FormGroup;
    @Input() experiencesIn: Experience[];
    @Output() experiencesOut = new EventEmitter<Experience[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    // filteredProfessionals: any[];
    // professionals: Catalogue[];
    filteredAreas: any[];
    areas: Catalogue[];
    isWorking: boolean;

    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        //this.getProfessional();
        this.getArea();
    }

    // Fields of Form
    get idField() {
        return this.formExperienceIn.get('id');
    }

    get professionalField() {
        return this.formExperienceIn.get('professional');
    }

    get areaField() {
        return this.formExperienceIn.get('area');
    }

    get employerField() {
        return this.formExperienceIn.get('employer');
    }

    get positionField() {
        return this.formExperienceIn.get('position');
    }

    get startDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get endDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get activitiesField() {
        return this.formExperienceIn.get('activities') as FormArray;
    }

    get reasonLeaveField() {
        return this.formExperienceIn.get('reason_leave');
    }

    get isWorkingField() {
        return this.formExperienceIn.get('is_working');
    }

    addActivities() {
        this.activitiesField.push(this.formBuilder.control(null, Validators.required));
    }
    removeActivities(activity) {
        this.activitiesField.removeAt(activity);
    }

    // Submit Form

    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formExperienceIn.valid) {
            if (this.idField.value) {
                this.updateExperience(this.formExperienceIn.value);
            } else {
                this.storeExperience(this.formExperienceIn.value, flag);
            }
        } else {
            this.formExperienceIn.markAllAsTouched();
        }
    }
    working() {
        const params = new HttpParams().append('type', 'EXPERIENCE_IS-WORKING');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.isWorking = false;
            this.messageService.success(response);
        }, error => {
            this.isWorking = false;
            this.messageService.error(error);
        });
    }

    // Types of catalogues
    getArea() {
        const params = new HttpParams().append('type', 'EXPERIENCE_AREA');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.areas = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    // getProfessional() {
    //     const params = new HttpParams().append('type', 'EXPERIENCE_PROFESSIONAL');
    //     this.appHttpService.getCatalogues(params).subscribe(response => {
    //         this.areas = response['data'];
    //     }, error => {
    //         this.messageService.error(error);
    //     });
    // }

    // Save in backend
    storeExperience(experience: Experience, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('experiences', { experience }).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveExperience(response['data']);
            if (!flag) {
                this.displayOut.emit(false);
            }
            this.resetFormExperience();

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateExperience(experience: Experience) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('experiences/' + experience.id, { experience })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveExperience(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveExperience(experience: Experience) {
        const index = this.experiencesIn.findIndex(element => element.id === experience.id);
        if (index === -1) {
            this.experiencesIn.push(experience);
        } else {
            this.experiencesIn[index] = experience;
        }
        this.experiencesOut.emit(this.experiencesIn);
    }

    // Filter area of experiences
    filterArea(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const area of this.areas) {
            if (area.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(area);
            }
        }
        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione un tipo del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.areaField.setValue(null);
        }
        this.filteredAreas = filtered;
    }
    // filterProfessional(event) {
    //     const filtered: any[] = [];
    //     const query = event.query;
    //     for (const professional of this.professionals) {
    //         if (professional.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
    //             filtered.push(professional);
    //         }
    //     }
    //     if (filtered.length === 0) {
    //         this.messagePnService.clear();
    //         this.messagePnService.add({
    //             severity: 'error',
    //             summary: 'Por favor seleccione un tipo del listado',
    //             detail: 'En el caso de no existir comuníquese con el administrador!',
    //             life: 5000
    //         });
    //         this.professionalField.setValue(null);
    //     }
    //     this.filteredProfessionals = filtered;
    // }
    showResponse() {
        this.isWorking = true;
    }


    test(event) {
        event.markAllAsTouched();
    }

    resetFormExperience() {
        this.formExperienceIn.reset();
    }

    markAllAsTouchedFormExperience() {
        this.formExperienceIn.markAllAsTouched();
    }

}

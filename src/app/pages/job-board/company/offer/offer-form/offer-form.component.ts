import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../pages/shared/services/message.service';
import {MessageService as MessagePnService} from 'primeng/api';

import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import { Offer } from 'src/app/models/job-board/offer';
import { Location } from 'src/app/models/app/location';

@Component({
    selector: 'app-offer-form',
    templateUrl: './offer-form.component.html',
    styleUrls: ['./offer-form.component.scss']
})

export class OfferFormComponent implements OnInit {
    @Input() formOfferIn: FormGroup;
    @Input() offersIn: Offer[];
    @Output() offersOut = new EventEmitter<Offer[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredContracTypes: any[];
    contractTypes: Catalogue[];
    filteredPositions: any[];
    positions: Catalogue[];
    filteredSectors: any[];
    sectors: Catalogue[];
    filteredWorkingDays: any[];
    workingDays: Catalogue[];
    filteredExperienceTimes: any[];
    experienceTimes: Catalogue[];
    filteredTrainingHours: any[];
    trainingHours: Catalogue[];
    filteredlocations: any[];
    locations: Location[];

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService,
                private messagePnService: MessagePnService) {
    }

    ngOnInit(): void {
        this.getContractType();
        this.getPosition();
        this.getSector();
        this.getWorkingDay();
        this.getExperienceTime();
        this.getTrainingHours();
        this.getLocation();
    }

    // Fields of Form
    get idField() {
        return this.formOfferIn.get('id');
    }
    get vacanciesField() {
        return this.formOfferIn.get('vacancies');
    }
    get aditionalInformationField() {
        return this.formOfferIn.get('aditional_information');
    }
    get contactNameField() {
        return this.formOfferIn.get('contact_name');
    }
    get contactEmailField() {
        return this.formOfferIn.get('contact_email');
    }
    get contactPhoneField() {
        return this.formOfferIn.get('contact_phone');
    }
    get contactCellphoneField() {
        return this.formOfferIn.get('contact_cellphone');
    }
    get remunerationField() {
        return this.formOfferIn.get('remuneration');
    }
    get contractTypeField() {
        return this.formOfferIn.get('contract_type');
    }
    get positionField() {
        return this.formOfferIn.get('position');
    }
    get sectorField() {
        return this.formOfferIn.get('sector');
    }
    get workingDayField() {
        return this.formOfferIn.get('working_day');
    }
    get experienceTimeField() {
        return this.formOfferIn.get('experience_time');
    }
    get trainingHoursField() {
        return this.formOfferIn.get('training_hours');
    }
    get locationField() {
        return this.formOfferIn.get('location');
    }
    get activitiesField() {
        return this.formOfferIn.get('activities') as FormArray;
    }
    get requirementsField() {
        return this.formOfferIn.get('requirements') as FormArray;
    }

    addActivities(){
        this.activitiesField.push(this.formBuilder.control(null, Validators.required));
    }
    removeActivities(activity){
        this.activitiesField.removeAt(activity);
    }
    addRequirements(){
        this.requirementsField.push(this.formBuilder.control(null, Validators.required));
    }
    removeRequirements(requirement){
        this.requirementsField.removeAt(requirement);
    }

    // Submit Form
    /**
     * codigo mandar con la empresa (de donde saco?)
     * actividades y requerimientos sin arrays de strings como deberia llenar el uuario?
     * campo remuneration debe validaarse como numerico en html?
     * campo email como le valido el email
     * 
     * 
     * 
     * 
     */
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        console.log(this.formOfferIn.valid);
        if (this.formOfferIn.valid) {
            if (this.idField.value) {
                this.updateOffer(this.formOfferIn.value);
            } else {
                this.storeOffer(this.formOfferIn.value, flag);
            }
        } else {
            this.formOfferIn.markAllAsTouched();
        }
    }

    // Get Catalogues 
    getContractType() {
        const params = new HttpParams().append('type', 'OFFER_CONTRACT_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.contractTypes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getPosition() {
        const params = new HttpParams().append('type', 'OFFER_POSITION');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.positions = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getSector() {
        const params = new HttpParams().append('type', 'SECTOR');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.sectors = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getWorkingDay() {
        const params = new HttpParams().append('type', 'OFFER_WORKING_DAY');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.workingDays = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getExperienceTime() {
        const params = new HttpParams().append('type', 'OFFER_EXPERIENCE_TIME');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.experienceTimes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getTrainingHours() {
        const params = new HttpParams().append('type', 'OFFER_TRAINING_HOURS');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.trainingHours = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getLocation() {
        const params = new HttpParams().append('type', 'LOCATION');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.locations = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeOffer(offer: Offer, flag = false) {
        this.spinnerService.show();

        this.jobBoardHttpService.store('offers', {offer}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveOffer(response['data']);
            if (flag) {
                this.formOfferIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateOffer(offer: Offer) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('offers/' + offer.id, {offer})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveOffer(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveOffer(offer: Offer) {
        const index = this.offersIn.findIndex(element => element.id === offer.id);
        if (index === -1) {
            this.offersIn.push(offer);
        } else {
            this.offersIn[index] = offer;
        }
        this.offersOut.emit(this.offersIn);
    }

    // Filters offers
    filterContracType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const contractType of this.contractTypes) {
            if (contractType.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(contractType);
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
            this.contractTypeField.setValue(null);
        }
        this.filteredContracTypes = filtered;
    }

    filterPosition(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const position of this.positions) {
            if (position.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(position);
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
            this.positionField.setValue(null);
        }
        this.filteredPositions = filtered;
    }

    filterSector(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const sector of this.sectors) {
            if (sector.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(sector);
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
            this.sectorField.setValue(null);
        }
        this.filteredSectors = filtered;
    }

    filterWorkingDay(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const workingDay of this.workingDays) {
            if (workingDay.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(workingDay);
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
            this.workingDayField.setValue(null);
        }
        this.filteredWorkingDays = filtered;
    }

    filterExperienceTime(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const experienceTime of this.experienceTimes) {
            if (experienceTime.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(experienceTime);
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
            this.experienceTimeField.setValue(null);
        }
        this.filteredExperienceTimes = filtered;
    }

    filterTrainingHour(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const trainingHour of this.trainingHours) {
            if (trainingHour.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(trainingHour);
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
            this.trainingHoursField.setValue(null);
        }
        this.filteredTrainingHours = filtered;
    }

    filterLocation(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const location of this.locations) {
            if (location.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(location);
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
            this.locationField.setValue(null);
        }
        this.filteredlocations = filtered;
    }
}

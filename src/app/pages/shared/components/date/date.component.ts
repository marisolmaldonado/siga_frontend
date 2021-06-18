import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { format } from 'date-fns';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true
        }
    ]
})

export class DateComponent implements OnInit, ControlValueAccessor {
    days: SelectItem[];
    months: SelectItem[];
    years: SelectItem[];
    value: string;
    onChange: (value: string) => void;
    onTouch: () => void;
    isDisabled: boolean;
    formDate: FormGroup;

    constructor(private sharedService: SharedService, private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.buildFormDate();
        this.generateYears();
        this.generateMonths();
        this.generateDays(31);
    }

    buildFormDate() {
        this.formDate = this.formBuilder.group({
            year: [null, Validators.required],
            month: [null, Validators.required],
            day: [null, Validators.required],
        });
    }

    generateDays(totalDays: number) {
        this.days = [];
        for (let i = 1; i <= totalDays; i++) {
            this.days.push({ label: (i < 10 ? '0' : '') + i, value: (i < 10 ? '0' : '') + i });
        }
    }

    generateMonths() {
        this.months = [];
        for (let i = 1; i <= 12; i++) {
            this.months.push({ label: i.toString(), value: (i < 10 ? '0' : '') + i });
        }
    }

    generateYears() {
        this.years = [];
        const currentYear = parseInt(format(new Date(), 'yyyy'), 10);
        for (let i = currentYear; i >= (currentYear - 100); i--) {
            this.years.push({ label: i.toString(), value: i.toString() });
        }
    }

    calculateTotalDays() {
        if (this.dayField.value > 28) {
            this.dayField.setValue(null);
        }
        if (this.monthField.valid) {
            switch (this.monthField.value) {
                case '01':
                case '03':
                case '05':
                case '07':
                case '08':
                case '10':
                case '12':
                    this.generateDays(31);
                    break;

                case '02':
                    this.generateDays(this.validateLeapYear(this.yearField.value) ? 29 : 28);
                    break;

                case '04':
                case '06':
                case '09':
                case '11':
                    this.generateDays(30);
                    break;
                default:
                    this.generateDays(31);
            }
        }
    }

    validateLeapYear(year: string) {
        if (year === '' || year === null) {
            return false;
        }
        const yearInt = parseInt(year, 10);
        return ((yearInt % 4 === 0) && (yearInt % 100 !== 0)) || (yearInt % 400 === 0);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: string): void {
        this.value = value;
        if (this.value) {
            const [year, month, day] = this.value.split('-');
            this.yearField.setValue(year);
            this.monthField.setValue(month);
            this.dayField.setValue(day);
        }
    }

    updateValue(): void {
        if (this.formDate.valid) {
            this.value = `${this.yearField.value}-${this.monthField.value}-${this.dayField.value}`;
            this.onChange(this.value);
        }
    }

    get yearField() {
        return this.formDate.get('year');
    }

    get monthField() {
        return this.formDate.get('month');
    }

    get dayField() {
        return this.formDate.get('day');
    }
}
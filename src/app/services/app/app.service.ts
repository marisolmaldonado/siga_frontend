import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    formAddress: FormGroup;
    formDate: FormGroup;
    formLocation: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formAddress = this.buildFormAddress();
        this.formDate = this.buildFormDate();
        this.formLocation = this.buildFormLocation();
    }

    buildFormAddress() {
        return this.formBuilder.group({
            main_street: [null, Validators.required],
            secondary_street: [null, Validators.required],
            number: [null],
            post_code: [null],
            sector: [null, Validators.required],
            reference: [null],
            latitude: [null],
            longitude: [null]
        });
    }

    buildFormDate() {
        return this.formBuilder.group({
            year: [null, Validators.required],
            month: [null, Validators.required],
            day: [null, Validators.required],
        });
    }

    buildFormLocation() {
        return this.formBuilder.group({
            country: [null, Validators.required],
            province: [null, Validators.required],
            canton: [null, Validators.required],
            parish: [null, Validators.required],
        });
    }
}

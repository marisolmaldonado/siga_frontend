import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

    static hasNumber(control: AbstractControl) {
        const value = control.value;
        return /\d/.test(value) ? null : {hasNumber: true};
    }

    static hasLowerCase(control: AbstractControl) {
        const value = control.value;
        return /[a-z]/.test(value) ? null : {hasLowerCase: true};
    }

    static hasUpperCase(control: AbstractControl) {
        const value = control.value;
        return /[A-Z]/.test(value) ? null : {hasUpperCase: true};
    }

    static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password: string = control.get('password').value; // get password from our password form control
        const passwordConfirmation: string = control.get('password_confirmation').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== passwordConfirmation) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('password_confirmation')?.setErrors({noPasswordMatch: true});
            return ({noPasswordMatch: true});
        }
        return null;
    }

}

import {Catalogue} from '../../../models/app/catalogue';
import {Role} from '../../../models/auth/role';
import {Institution} from '../../../models/app/institution';

export class UserValidators {
    ethnic_origin?: Catalogue;
    location?: Catalogue;
    identification_type?: Catalogue;
    sex?: Catalogue;
    gender?: Catalogue;
    avatar?: string;
    roles?: Role[];
    role?: Role;
    institutions?: Institution[];

    static validator() {
        return {
            identification: {minlength: 9, maxlength: 13},
            first_name: {minlength: 3, maxlength: 25},
            second_name: {minlength: 3, maxlength: 25},
            first_lastname: {minlength: 3, maxlength: 25},
            second_lastname: {minlength: 3, maxlength: 25},
            email: {maxlength: 50},
        };
    }

    static identification() {
        return {
            minlength: 9, maxlength: 13
        };
    }

    static firstName() {
        return {
            minlength: 3, maxlength: 25
        };
    }

    static secondName() {
        return {
            minlength: 3, maxlength: 25
        };
    }

    static firstLastname() {
        return {
            minlength: 3, maxlength: 25
        };
    }

    static secondLastname() {
        return {
            minlength: 3, maxlength: 25
        };
    }

    static email() {
        return {
            maxlength: 50
        };
    }
}

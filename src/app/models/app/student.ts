import {User} from '../auth/models.index';
import {Address, Catalogue} from './models.index';

export interface Student {
    id?: number;
    user?: User;
    address?: Address;
    school_type?: Catalogue;
}

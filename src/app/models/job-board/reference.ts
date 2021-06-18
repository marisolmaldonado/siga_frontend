import { Professional } from './professional';

export interface Reference {
    id?: number;
    professional?: Professional;
    institution?: string;
    position?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
}

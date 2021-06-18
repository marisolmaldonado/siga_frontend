import { Professional } from './professional';
import { Catalogue } from '../app/catalogue';

export interface Experience {
    id?: number;
    professional?: Professional;
    area?: Catalogue;
    employer?: string;
    position?: string;
    start_date?: string;
    end_date?: string;
    activities?: string;
    reason_leave?: string;
    is_working?: string;
}

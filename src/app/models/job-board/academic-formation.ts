import { Professional } from './professional';
import { Category } from './category';

export interface AcademicFormation {
    id?: number;
    professional?: Professional;
    professional_degree?: Category;
    registration_date?: Date;
    senescyt_code?: string;
    has_titling?: boolean;
}

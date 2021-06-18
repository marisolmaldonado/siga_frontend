import { Professional } from './professional';
import { Catalogue } from '../app/catalogue';

export interface Course {
    id?: number;
    professional?: Professional;
    type?: Catalogue;
    institution?: Catalogue;
    certification_type?: Catalogue;
    area?: Catalogue;
    name?: Text;
    description?: Text;
    start_date?: Date;
    end_date?: Date;
    hours?: string;
}
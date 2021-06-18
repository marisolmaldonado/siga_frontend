import {Professional} from './professional';
import {Catalogue} from '../app/catalogue';

export interface Skill {
    id?: number;
    professional?: Professional;
    type?: Catalogue;
    description?: string;
}

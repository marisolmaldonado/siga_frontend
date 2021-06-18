import {Institution} from '../app/models.index';
import {Role, Route, Shortcut} from './models.index';

export interface Permission {
    id?: number;
    route: Route;
    role: Role;
    institution: Institution;
    shortcut: Shortcut;
    actions: string[];
}

import {System} from './system';

export interface Module {
    id?: number;
    parent?: Module;
    system?: System;
    code?: string;
    name?: string;
    description?: string;
    icon?: string;
}

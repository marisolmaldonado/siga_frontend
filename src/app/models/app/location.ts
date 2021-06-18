import {Catalogue} from './models.index';

export interface Location {
    id?: number;
    parent?: Location;
    type?: Catalogue;
    code?: string;
    name?: string;
    alpha2_code?: string;
    alpha3_code?: string;
    region?: string;
    subregion?: string;
    calling_code?: string;
    capital?: string;
    top_level_domain?: string;
    flag?: string;
    timezones?: Array<string>;
}

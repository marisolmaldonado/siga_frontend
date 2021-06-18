import {Catalogue, Location} from './models.index';

export interface Address {
    id?: number;
    sector?: Catalogue;
    location?: Location;
    main_street?: string;
    secondary_street?: string;
    number?: string;
    post_code?: string;
    reference?: string;
    latitude?: number;
    longitude?: number;
}

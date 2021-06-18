import {Catalogue, Image} from '../app/models.index';

export interface Route {
    id?: number;
    uri: string;
    name: string;
    icon?: string;
    order: number;
    description?: string;
    module: Catalogue;
    type: Catalogue;
    status: Catalogue;
    parent?: Catalogue;
    images?: Image[];
    image?: Image;
    logo?: Image;
}

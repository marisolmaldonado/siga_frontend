export interface Catalogue {
    id?: number;
    parent?: Catalogue;
    children?: Catalogue[];
    code?: string;
    name?: string;
    type?: string;
    color?: string;
    icon?: string;
}

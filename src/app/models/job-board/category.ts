
export interface Category{
    id?: number;
    parent?: Category;
    code?: string;
    name?: string;
    icon?: null;
    children?: Category[];
    deleted_at?:null;
    created_at?: string;
    updated_at?:string;    

}




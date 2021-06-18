export interface Paginator {
    current_page: number;
    first_page_url?: string;
    from?: string;
    last_page?: string;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string;
    path?: string;
    per_page: number;
    prev_page_url?: string;
    to?: string;
    total?: number;
}

export interface Link {
    url?: string;
    label?: string;
    active?: string;
}

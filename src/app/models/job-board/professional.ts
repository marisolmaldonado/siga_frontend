import { User } from '../auth/user';
export interface Professional {
    id?: number;
    user?: User;
    is_travel?: boolean;
    is_disability?: boolean;
    is_familiar_disability?: boolean;
    identification_familiar_disability?: boolean;
    is_catastrophic_illness?: boolean;
    is_familiar_catastrophic_illness?: boolean;
    about_me?: string;
}

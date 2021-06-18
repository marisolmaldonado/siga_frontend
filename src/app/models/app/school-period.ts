import {Status} from './status';

export interface SchoolPeriod {
    id?: number;
    status?: Status;
    code?: string;
    name?: string;
    start_date?: Date;
    end_date?: Date;
}

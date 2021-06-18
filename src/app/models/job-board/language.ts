import { Professional } from './professional';
import { Catalogue } from '../app/catalogue';

export interface Language {
    id?: number;
    professional?: Professional;
    idiom?: Catalogue;
    written_level?: Catalogue;
    spoken_level?: Catalogue;
    read_level?: Catalogue;
}

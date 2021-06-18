// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {LandingPageComponent} from './landing-page.component';
import {WebProfessionalComponent} from './web-professional/web-professional.component';
import {WebOfferComponent} from './web-offer/web-offer.component';

// My Components

export const LandingPageRouting: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    }
];

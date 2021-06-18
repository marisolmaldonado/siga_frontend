import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {System} from '../../../models/auth/system';
import {Institution} from '../../../models/app/institution';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-footer',
    templateUrl: 'app.footer.component.html'
})
export class AppFooterComponent {
    institution: Institution;
    system: System;
    STORAGE_URL: string;

    constructor(private authService: AuthService) {
        this.institution = this.authService.getInstitution();
        this.STORAGE_URL = environment.STORAGE_URL;
        this.system = authService.getSystem();
    }
}

import {Component, OnDestroy} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {User} from '../../../models/auth/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;
    items: MenuItem[];
    auth: User;

    constructor(public breadcrumbService: BreadcrumbService, private authService: AuthService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response as MenuItem[];
        });
        this.auth = this.authService.getAuth();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';
import {Permission, System} from '../../../models/auth/models.index';
import {AuthService} from '../../../services/auth/auth.service';
import {environment} from '../../../../environments/environment';
import {Institution} from '../../../models/app/institution';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../../pages/shared/services/message.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    menus: any[];
    permissions: Permission[];
    institution: Institution;
    STORAGE_URL: string;
    system: System;

    constructor(public appMain: AppMainComponent,
                private authHttpService: AuthHttpService,
                private authService: AuthService,
                private messageService: MessageService,
    ) {
        this.institution = this.authService.getInstitution();
        this.STORAGE_URL = environment.STORAGE_URL;
        this.system = this.authService.getSystem();
    }

    ngOnInit() {
        this.getMenus();
    }

    getMenus() {
        this.authHttpService.getMenus().subscribe(response => {
            this.permissions = response['data'];
            this.menus = [];
            let i = 0;
            for (const module of this.permissions) {
                this.menus.push(
                    {
                        module: module['id'],
                        label: module['name'],
                        icon: module['icon']
                    }
                );
                this.menus[i]['items'] = [];
                for (const route of module['routes']) {
                    if (route.type.code === 'NORMAL') {
                        this.menus[i]['items'].push(
                            {
                                label: route.name,
                                icon: route.icon,
                                routerLink: [route.uri]
                            },
                        );
                    }
                }
                i++;
            }
        }, error => {
            console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            console.log(error);
            this.messageService.error(error);
        });
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}

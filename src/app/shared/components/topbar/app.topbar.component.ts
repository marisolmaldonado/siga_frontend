import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppMainComponent} from '../main/app.main.component';
import {Permission, Role, User} from '../../../models/auth/models.index';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../../environments/environment';
import {Institution} from '../../../models/app/institution';
import {AuthHttpService} from '../../../services/auth/auth-http.service';


@Component({
    selector: 'app-topbar',
    templateUrl: 'app.topbar.component.html'
})
export class AppTopBarComponent {

    activeItem: number;
    role: Role;
    auth: User;
    institution: Institution;
    megaMenus: any[];
    permissions: Permission[];
    langs: string[];
    urlAvatar: string;
    STORAGE_URL: string;
    constructor(public appMain: AppMainComponent,
                public authHttpService: AuthHttpService,
                public authService: AuthService,
                private router: Router,
                private spinnerService: NgxSpinnerService) {
        this.role = this.authService.getRole();
        this.auth = this.authService.getAuth();
        this.institution = this.authService.getInstitution();
        this.getMegaMenus();
        this.getUrlAvatar();
        this.STORAGE_URL = environment.STORAGE_URL;
    }

    getMegaMenus() {
        this.permissions = this.authService.getPermissions();
        this.megaMenus = [];
        if (this.permissions) {
            this.permissions.forEach(permission => {
                const moduleIndex = this.megaMenus.findIndex(menu => menu.module === permission.route.module.id);
                // if (permission.route.type.code === TYPE_MENUS.MEGA_MENU) {
                if (permission.route.type.code === 'MEGA') {
                    if (moduleIndex === -1) {
                        this.megaMenus.push(
                            {
                                module: permission.route.module.id,
                                label: permission.route.module.name,
                                icon: permission.route.module.icon,
                                items: [
                                    {
                                        label: permission.route.name,
                                        icon: permission.route.icon,
                                        routerLink: permission.route.uri,
                                        description: permission.route.description
                                    },
                                ]
                            }
                        );
                    } else {
                        this.megaMenus[moduleIndex]['items'].push(
                            {
                                label: permission.route.name,
                                icon: permission.route.icon,
                                routerLink: permission.route.uri,
                                description: permission.route.description
                            },
                        );

                    }
                }
            });
        }
    }

    getUrlAvatar() {
        if (this.auth) {
            if (this.auth.avatar) {
                this.urlAvatar = this.auth.avatar;
            } else {
                if (this.auth.sex) {
                    if (this.auth.sex.code === 'MALE') {
                        this.urlAvatar = 'avatars/male.png';
                    } else {
                        this.urlAvatar = 'avatars/famale.png';
                    }
                } else {
                    this.urlAvatar = 'avatars/anonymous.png';
                }
            }
            this.authService.setUrlAvatar(this.urlAvatar);
        }
    }

    mobileMegaMenuItemClick(index) {
        this.appMain.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }

    logOut() {
        this.spinnerService.show();
        this.authHttpService.logout().subscribe(response => {
            this.spinnerService.hide();
            this.authService.removeLogin();
            this.router.navigate(['/auth/login']);
        }, error => {
            this.spinnerService.hide();
            this.authService.removeLogin();
            this.router.navigate(['/auth/login']);
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {Role} from '../../models/auth/role';
import {Permission} from '../../models/auth/permission';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/auth/user';
import {Institution} from '../../models/app/institution';
import {Message} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {format} from 'date-fns';
import {AuthHttpService} from '../../services/auth/auth-http.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    shortcuts: any[];
    editShortcuts: any[];
    role: Role;
    auth: User;
    institution: Institution;
    permissions: Permission[];
    STORAGE_URL: string;
    msgs: Message[];
    flagBirhday: boolean;
    randomNumber: number;
    flagShortcuts: boolean;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private authHttpService: AuthHttpService,
        private authService: AuthService,
        private spinnerService: NgxSpinnerService
    ) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard'},
        ]);
        this.role = this.authService.getRole();
        this.auth = this.authService.getAuth();
        this.institution = this.authService.getInstitution();
        this.permissions = this.authService.getPermissions();
        this.shortcuts = [];
        this.editShortcuts = [];
        this.randomNumber = 0;
        this.STORAGE_URL = environment.STORAGE_URL;
    }

    ngOnInit(): void {
        this.getShortcuts();
        this.showBirthdate();
    }

    getShortcuts() {
        this.spinnerService.show();
        this.authHttpService.get('shortcuts').subscribe(response => {
            this.spinnerService.hide();
            if (response) {
                this.spinnerService.hide();
                this.shortcuts = [];
                response['data'].forEach(shortcut => {
                    this.shortcuts.push({
                        id: shortcut?.id,
                        permission_id: shortcut?.permission?.id,
                        image: shortcut?.image,
                        title: shortcut?.permission?.route?.name,
                        name: shortcut?.permission?.route?.name,
                        uri: shortcut?.permission?.route?.uri,
                        toolTip: shortcut?.permission?.route?.description,
                    });
                });
                this.shortcuts.sort(
                    (a, b) => {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (a.title < b.title) {
                            return -1;
                        }
                        return 0;
                    }
                );
                if (this.shortcuts.length === 0) {
                    this.msgs = [
                        {
                            severity: 'info',
                            summary: 'No tiene accesos directos disponibles',
                            detail: 'Haga click en Activar Edición'
                        },
                    ];
                }
            }
        }, error => {
            this.spinnerService.hide();
        });
    }

    showBirthdate() {
        if (!localStorage.getItem('birthdate')) {
            if (this.auth && this.auth.birthdate && this.auth.birthdate.toString().substr(5, 5) === format(new Date(), 'LL-dd')) {
                this.randomNumber = Math.floor(Math.random() * (5 - 1) + 1);
                localStorage.setItem('birthdate', 'true');
                this.flagBirhday = true;
            }
        }
    }

    administrateShortcuts() {
        this.editShortcuts = [];
        this.permissions.forEach(permission => {
            if (this.shortcuts.find(shortcut => shortcut.permission_id === permission.id) === undefined) {
                this.editShortcuts.push({
                    permission_id: permission.id,
                    name: permission.route.name,
                    image: permission.route.logo,
                    title: permission.route.name,
                    uri: permission.route.uri,
                    toolTip: permission.route.description,
                });
            }

        });
        this.flagShortcuts = true;
    }

    showShortcut(shortcut) {
        this.spinnerService.show();
        this.authHttpService.post('shortcuts', {shortcut}).subscribe(
            response => {
                this.spinnerService.hide();
                this.editShortcuts = this.editShortcuts.filter(element => element.uri !== shortcut.uri);
                shortcut.id = response['data']['id'];
                this.shortcuts.unshift(shortcut);
            }, error => {
                this.spinnerService.hide();
                if (error.status === 400) {
                    this.editShortcuts = this.editShortcuts.filter(element => element.uri !== shortcut.uri);
                    this.getShortcuts();
                }
            });
    }

    hideShortcut(shortcut) {
        this.spinnerService.show();
        this.authHttpService.delete('shortcuts/' + shortcut.id).subscribe(response => {
            this.spinnerService.hide();
            this.shortcuts = this.shortcuts.filter(element => element.id !== shortcut.id);
            this.editShortcuts.push(shortcut);
        }, error => {
            this.spinnerService.hide();
            if (error.status === 400) {
                this.shortcuts = this.shortcuts.filter(element => element.id !== shortcut.id);
                this.editShortcuts.push(shortcut);
            }
        });
    }
}

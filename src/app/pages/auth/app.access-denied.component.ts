import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-access-denied',
    template: `
        <div class="exception-body access">
            <div class="exception-content">
                <div class="moon">
                    <img src="assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
                </div>
                <div class="exception-panel">
                    <div class="exception-panel-content">
                        <span class="tag"><i class="pi pi-lock" style="vertical-align: bottom"></i> 401</span>
                        <h1>Acceso Denegado</h1>
                        <div class="seperator"></div>
                        <p>No tienes los permisos necesarios. Por favor contacta con el administrador.</p>
                        <button pButton pRipple type="button" id="btnToLogin"
                                label="Regresar al Login"
                                icon="pi pi-sign-in"
                                class="p-mr-6"
                                [routerLink]="['/auth/login']"></button>
                        <button *ngIf="role" pButton pRipple type="button" id="btnToDashboard"
                                label="Ir al Dashboard"
                                icon="pi pi-home"
                                [routerLink]="['/dashboard']"></button>
                    </div>
                </div>
                <div class="desert"></div>
            </div>
        </div>
    `,
})
export class AppAccessDeniedComponent {
    role: Role;

    constructor(private authService: AuthService) {
        this.role = authService.getRole();
    }
}

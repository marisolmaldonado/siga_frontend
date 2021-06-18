import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-unregistered-user',
    template: `
        <div class="exception-body access">
            <div class="exception-content">
                <div class="moon">
                    <img src="assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
                </div>
                <div class="exception-panel">
                    <div class="exception-panel-content">
                        <span class="tag"><i class="pi pi-lock" style="vertical-align: bottom"></i> 403</span>
                        <h1>Cuenta de correo no registrada</h1>
                        <div class="seperator"></div>
                        <p>La cuenta de correo electrónico <b>{{email}}</b> no se encuentra registrada en nuestro
                            sistema.</p>
                        <p>Por favor ingrese con <a href="https://www.gmail.com/">otra cuenta de correo electrónico</a> o comuníquese con el
                            administrador.</p>
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
export class AppUnregisteredUserComponent {
    role: Role;
    email: string;

    constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
        this.role = authService.getRole();
        this.email = this.activatedRoute.snapshot.queryParams?.email;
    }
}

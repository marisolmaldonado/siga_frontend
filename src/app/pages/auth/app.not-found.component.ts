import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-not-found',
    template: `
		<div class="exception-body notfound">
			<div class="exception-content">
				<div class="moon">
					<img src="assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
				</div>
				<div class="exception-panel">
					<div class="exception-panel-content">
						<span class="tag"><i class="pi pi-exclamation-triangle" style="vertical-align: bottom"></i> 404</span>
						<h1>Página no encontrada</h1>
						<div class="seperator"></div>
						<p>El recurso solicitado no está disponible en este momento. Por favor, inténtelo de nuevo más tarde.</p>
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
export class AppNotFoundComponent {
    role: Role;

    constructor(private authService: AuthService) {
        this.role = authService.getRole();
    }
}

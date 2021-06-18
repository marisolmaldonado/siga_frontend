import {Component, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';
import {Inplace} from 'primeng/inplace';
import {Offer} from '../../../../../../models/job-board/offer';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../../../shared/services/message.service';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {JobBoardHttpService} from '../../../../../../services/job-board/job-board-http.service';
import {OfferDataViewComponent} from '../offer-data-view.component';
import {User} from '../../../../../../models/auth/user';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-data-view-list-item',
    templateUrl: './data-view-list-item.component.html',
    styleUrls: ['./data-view-list-item.component.scss']
})
export class DataViewListItemComponent implements OnInit {

    @Input() offer: Offer;
    @Output() idOffer = new EventEmitter<string>();
    @Output() displayModalMoreInformation = new EventEmitter<string>();
    displayButtonApply: boolean;
    auth: User;

    constructor(private authService: AuthService,
                private router: Router) {
        this.auth = authService.getAuth();
        this.auth ? this.displayButtonApply = true : this.displayButtonApply = false;
    }

    ngOnInit(): void {

    }

    sendIdOffer(id: number) {
        this.idOffer.emit(id.toString())   ;
    }

    moreInformation(offer) {
        this.displayModalMoreInformation.emit(offer);
    }

    redirectToLogin() {
        Swal.fire({
            title: 'Usuario no logeado.',
            text: 'Para ver más aplicar tiene que iniciar sesión como Profesional.',
            icon: 'info',
            showCancelButton: false,
            showDenyButton: true,
            confirmButtonColor: '#5E81AC',
            denyButtonColor: '#6c757d',
            confirmButtonText: '<i class="pi pi-sign-in"></i>&nbsp; Iniciar Sesión',
            denyButtonText: '<i class="pi pi-user-edit"></i>&nbsp; Regístrarse',
        }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['/auth/login']);
            } else if (result.isDenied) {
                this.router.navigate(['/job-board-web/company/register']);
            }
        });
    }

}

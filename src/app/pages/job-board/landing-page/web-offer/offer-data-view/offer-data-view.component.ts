import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../../../../models/job-board/offer';
import {Paginator} from '../../../../../models/setting/paginator';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../../shared/services/message.service';
import {User} from '../../../../../models/auth/user';
import {AuthService} from '../../../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-offer-data-view',
    templateUrl: './offer-data-view.component.html',
    styleUrls: ['./offer-data-view.component.scss']
})
export class OfferDataViewComponent implements OnInit {

    @Input() offers: Offer[];
    auth: User;
    paginator: Paginator;
    moreInformation: Offer;
    displayButtonApply: boolean;
    displayMaxeableButton: boolean;
    displayModalMoreInformation: boolean;

    constructor(private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private authService: AuthService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.auth = authService.getAuth();
        this.auth ? this.displayButtonApply = true : this.displayButtonApply = false;
    }

    ngOnInit(): void {
        this.test();
    }

    applyOffer(idOffer: string) {
        const params = new HttpParams()
            .append('id', String(idOffer));
        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/apply-offer', params).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.success(response);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    showModalMoreInformation(offer) {
        this.displayModalMoreInformation = true;
        this.moreInformation = offer;
    }

    closeModalMoreInformation() {
        this.displayModalMoreInformation = false;
        this.moreInformation = null;
    }

    test() {
        if (screen.width < 1024) {
            console.log('Pequeña');
        } else if (screen.width < 1280) {
            console.log('Mediana');
        } else {
            console.log('Grande');
        }
    }
}

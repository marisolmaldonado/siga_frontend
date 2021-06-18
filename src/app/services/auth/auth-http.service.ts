import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment, WEB} from '../../../environments/environment';
import {User} from '../../models/auth/models.index';
import {URL} from '../../../environments/environment';
import {MessageService} from '../../pages/shared/services/message.service';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthHttpService {
    auth: User;

    constructor(private httpClient: HttpClient,
                private authService: AuthService,
                private router: Router,
                private messageService: MessageService) {
    }

    login(userCredentials: any, params = new HttpParams()) {
        const url = URL + 'oauth/token';
        const credentials = {
            client_id: environment.CLIENT_ID,
            client_secret: environment.CLIENT_SECRET,
            grant_type: environment.GRANT_TYPE,
            username: userCredentials.username,
            password: userCredentials.password
        };
        return this.httpClient.post(url, credentials, {params});
    }

    loginGoogle() {
        const url = WEB + 'login/google';
        return window.open(url, '_self');
    }

    incorrectPassword(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/incorrect-password/' + username;
        return this.httpClient.get(url, {params});
    }

    resetAttempts(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset-attempts';
        return this.httpClient.get(url, {params});
    }

    passwordForgot(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/password-forgot';
        return this.httpClient.post(url, {username}, {params});
    }

    resetPassword(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset-password';
        return this.httpClient.post(url, credentials, {params});
    }

    userUnlock(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/user-locked';
        return this.httpClient.post(url, {username}, {params});
    }

    generateTransactionalCode(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/transactional-code';
        return this.httpClient.post(url, null, {params});
    }

    unlock(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/unlock-user';
        return this.httpClient.post(url, credentials, {params});
    }

    getUser(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'user/' + username;
        return this.httpClient.get(url, {params});
    }

    getMenus(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'module/menus';
        return this.httpClient.get(url, {params});
    }

    logout(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        return this.httpClient.get(url, {params});
    }

    logoutAll(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout-all';
        return this.httpClient.get(url, {params}).subscribe(response => {
            this.authService.removeLogin();
            this.router.navigate(['/auth/login']);
        }, error => {
            this.messageService.error(error);
        });
    }

    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.get(url, {params});
    }

    post(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.delete(url, {params});
    }

    uploadAvatar(data: FormData, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'users/avatars';
        return this.httpClient.post(url, data, {params});
    }

    changePassword(data: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/change-password';
        return this.httpClient.put(url, data, {params});
    }
}

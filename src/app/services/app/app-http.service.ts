import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {File} from '../../models/app/file';

@Injectable({
    providedIn: 'root'
})

export class AppHttpService {
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {

    }

    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_APP + url;
        return this.httpClient.get(url, {headers: this.headers});
    }

    post(url: string, data: any) {
        url = environment.API_URL_APP + url;
        return this.httpClient.post(url, data, {headers: this.headers});
    }

    update(url: string, data: any) {
        url = environment.API_URL_APP + url;
        return this.httpClient.put(url, data, {headers: this.headers});
    }

    delete(url: string) {
        url = environment.API_URL_APP + url;
        return this.httpClient.delete(url, {headers: this.headers});
    }

    updateFile(file: File, params = new HttpParams()) {
        const url = environment.API_URL_APP + 'file/update/' + file.id;
        return this.httpClient.put(url, file, {params});
    }


    downloadFiles(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'file/download';
        return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
    }

    deleteFiles(ids, params = new HttpParams()) {
        const url = environment.API_URL_APP + 'file/delete';
        return this.httpClient.put(url, {ids}, {params});
    }

    uploadImages(data: FormData, params = new HttpParams()) {
        const url = environment.API_URL_APP + 'images';
        return this.httpClient.post(url, data, {params});
    }

    getCatalogues(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'catalogues';
        return this.httpClient.get(url, {params});
    }

    getLocations(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'location/get';
        return this.httpClient.get(url, {params});
    }

    getCountries(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'countries';
        return this.httpClient.get(url, {params});
    }
}

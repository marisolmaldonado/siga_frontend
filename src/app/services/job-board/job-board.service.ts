import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment, WEB} from '../../../environments/environment';
import {Institution} from '../../models/app/institution';

import {MessageService} from '../../pages/shared/services/message.service';


import {Course} from '../../models/job-board/course';
import {Experience} from '../../models/job-board/experience';
import {Language} from '../../models/job-board/language';
import {Professional} from '../../models/job-board/professional';
import {Reference} from '../../models/job-board/reference';
import {Skill} from '../../models/job-board/skill';
import {Category} from '../../models/job-board/category';

@Injectable({
    providedIn: 'root'
})

export class JobBoardService {
    urlAvatar: string;
    institutions: Institution[];
    
  

    constructor(private httpClient: HttpClient, private router: Router, private messageService: MessageService) {
        this.urlAvatar = environment.STORAGE_URL;

    }
    removeLogin() {
        localStorage.removeItem('course');
        localStorage.removeItem('experience');
        localStorage.removeItem('language');
        localStorage.removeItem('professional');
        localStorage.removeItem('reference');
        localStorage.removeItem('skill');
        localStorage.removeItem('category');

    }
    setUrlAvatar(url: string) {
        this.urlAvatar = environment.STORAGE_URL + url;
    }

    getUrlAvatar() {
        return this.urlAvatar;
    }
    getCourse(): Course {
        return localStorage.getItem('course') ? JSON.parse(localStorage.getItem('course')) : null;
    }
    getExperience(): Experience {
        return localStorage.getItem('experience') ? JSON.parse(localStorage.getItem('experience')) : null;
    }
    getLanguage(): Language {
        return localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : null;
    }
    getProfessional(): Professional {
        return localStorage.getItem('professional') ? JSON.parse(localStorage.getItem('professional')) : null;
    }
    getReference(): Reference {
        return localStorage.getItem('reference') ? JSON.parse(localStorage.getItem('reference')) : null;
    }
    getSkill(): Skill {
        return localStorage.getItem('skill') ? JSON.parse(localStorage.getItem('skill')) : null;
    }
    getCategory(): Category {
        return localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : null;
    }
    setCourse(course) {
        localStorage.setItem('course', JSON.stringify(course));
    }
    setExperience(experience) {
        localStorage.setItem('institution', JSON.stringify(experience));
    }
    setLanguage(language) {
        localStorage.setItem('language', JSON.stringify(language));
    }
    setProfessional(professional) {
        localStorage.setItem('professional', JSON.stringify(professional));
    }
    setReference(reference) {
        localStorage.setItem('reference', JSON.stringify(reference));
    }
    setSkill(skill) {
        localStorage.setItem('skill', JSON.stringify(skill));
    }

    setCategory(category) {
        localStorage.setItem('category', JSON.stringify(category));
    }

    }

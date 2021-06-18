import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-professional',
    templateUrl: './professional.component.html',
    styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

    constructor(private breadcrumbService: BreadcrumbService, private fb: FormBuilder) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['/dashboard'] },
            { label: 'Profesional' }
        ]);
    }

    form: FormGroup;

    ngOnInit(): void {
        this.form = this.fb.group({
            location: [null]
        });
    }

}

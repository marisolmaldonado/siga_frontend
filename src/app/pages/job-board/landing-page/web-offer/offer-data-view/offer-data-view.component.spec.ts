import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDataViewComponent } from './offer-data-view.component';

describe('OfferDataViewComponent', () => {
  let component: OfferDataViewComponent;
  let fixture: ComponentFixture<OfferDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDataViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

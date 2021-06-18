import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewGridItemComponent } from './data-view-grid-item.component';

describe('DataViewGridItemComponent', () => {
  let component: DataViewGridItemComponent;
  let fixture: ComponentFixture<DataViewGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

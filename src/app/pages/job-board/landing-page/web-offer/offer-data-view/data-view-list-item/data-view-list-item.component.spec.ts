import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewListItemComponent } from './data-view-list-item.component';

describe('DataViewListItemComponent', () => {
  let component: DataViewListItemComponent;
  let fixture: ComponentFixture<DataViewListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

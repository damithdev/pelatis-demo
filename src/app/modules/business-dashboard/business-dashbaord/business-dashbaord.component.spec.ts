import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDashbaordComponent } from './business-dashbaord.component';

describe('BusinessDashbaordComponent', () => {
  let component: BusinessDashbaordComponent;
  let fixture: ComponentFixture<BusinessDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

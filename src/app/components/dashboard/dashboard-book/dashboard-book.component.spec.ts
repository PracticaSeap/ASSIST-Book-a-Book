import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBookComponent } from './dashboard-book.component';

describe('DashboardBookComponent', () => {
  let component: DashboardBookComponent;
  let fixture: ComponentFixture<DashboardBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

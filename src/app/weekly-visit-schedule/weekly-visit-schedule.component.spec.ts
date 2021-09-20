import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyVisitScheduleComponent } from './weekly-visit-schedule.component';

describe('WeeklyVisitScheduleComponent', () => {
  let component: WeeklyVisitScheduleComponent;
  let fixture: ComponentFixture<WeeklyVisitScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyVisitScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyVisitScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

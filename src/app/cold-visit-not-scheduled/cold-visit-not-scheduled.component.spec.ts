import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdVisitNotScheduledComponent } from './cold-visit-not-scheduled.component';

describe('ColdVisitNotScheduledComponent', () => {
  let component: ColdVisitNotScheduledComponent;
  let fixture: ComponentFixture<ColdVisitNotScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColdVisitNotScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdVisitNotScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

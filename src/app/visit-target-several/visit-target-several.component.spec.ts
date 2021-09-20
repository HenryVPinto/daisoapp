import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTargetSeveralComponent } from './visit-target-several.component';

describe('VisitTargetSeveralComponent', () => {
  let component: VisitTargetSeveralComponent;
  let fixture: ComponentFixture<VisitTargetSeveralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitTargetSeveralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTargetSeveralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

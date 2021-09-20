import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostponedReportComponent } from './postponed-report.component';

describe('PostponedReportComponent', () => {
  let component: PostponedReportComponent;
  let fixture: ComponentFixture<PostponedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostponedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostponedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

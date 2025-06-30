import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrcaseAttemptsComponent } from './cvrcase-attempts.component';

describe('CvrcaseAttemptsComponent', () => {
  let component: CvrcaseAttemptsComponent;
  let fixture: ComponentFixture<CvrcaseAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrcaseAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrcaseAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

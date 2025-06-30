import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRcaseAttemptsComponent } from './cvrcase-attempts.component';

describe('CVRcaseAttemptsComponent', () => {
  let component: CVRcaseAttemptsComponent;
  let fixture: ComponentFixture<CVRcaseAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRcaseAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRcaseAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

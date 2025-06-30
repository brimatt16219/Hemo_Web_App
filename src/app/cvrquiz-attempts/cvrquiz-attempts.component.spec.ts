import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrquizAttemptsComponent } from './cvrquiz-attempts.component';

describe('CvrquizAttemptsComponent', () => {
  let component: CvrquizAttemptsComponent;
  let fixture: ComponentFixture<CvrquizAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrquizAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrquizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

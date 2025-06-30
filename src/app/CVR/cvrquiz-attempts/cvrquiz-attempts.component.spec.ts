import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRquizAttemptsComponent } from './cvrquiz-attempts.component';

describe('CVRquizAttemptsComponent', () => {
  let component: CVRquizAttemptsComponent;
  let fixture: ComponentFixture<CVRquizAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRquizAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRquizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

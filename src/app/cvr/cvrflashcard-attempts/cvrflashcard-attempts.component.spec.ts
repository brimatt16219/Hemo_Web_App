import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrflashcardAttemptsComponent } from './cvrflashcard-attempts.component';

describe('CvrflashcardAttemptsComponent', () => {
  let component: CvrflashcardAttemptsComponent;
  let fixture: ComponentFixture<CvrflashcardAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrflashcardAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrflashcardAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

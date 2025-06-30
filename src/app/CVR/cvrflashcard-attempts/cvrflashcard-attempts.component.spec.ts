import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRflashcardAttemptsComponent } from './cvrflashcard-attempts.component';

describe('CVRflashcardAttemptsComponent', () => {
  let component: CVRflashcardAttemptsComponent;
  let fixture: ComponentFixture<CVRflashcardAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRflashcardAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRflashcardAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

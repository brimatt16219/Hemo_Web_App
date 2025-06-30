import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrflashcardsComponent } from './cvrflashcards.component';

describe('CvrflashcardsComponent', () => {
  let component: CvrflashcardsComponent;
  let fixture: ComponentFixture<CvrflashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrflashcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrflashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

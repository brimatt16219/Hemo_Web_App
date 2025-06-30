import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRflashcardsComponent } from './cvrflashcards.component';

describe('CVRflashcardsComponent', () => {
  let component: CVRflashcardsComponent;
  let fixture: ComponentFixture<CVRflashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRflashcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRflashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

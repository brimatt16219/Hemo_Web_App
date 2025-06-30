import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhemoPuzzlestepsComponent } from './drhemo-puzzlesteps.component';

describe('DrhemoPuzzlestepsComponent', () => {
  let component: DrhemoPuzzlestepsComponent;
  let fixture: ComponentFixture<DrhemoPuzzlestepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrhemoPuzzlestepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrhemoPuzzlestepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

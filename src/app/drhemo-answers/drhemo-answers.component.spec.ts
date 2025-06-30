import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhemoAnswersComponent } from './drhemo-answers.component';

describe('DrhemoAnswersComponent', () => {
  let component: DrhemoAnswersComponent;
  let fixture: ComponentFixture<DrhemoAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrhemoAnswersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrhemoAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

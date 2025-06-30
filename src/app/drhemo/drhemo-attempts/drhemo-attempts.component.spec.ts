import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhemoAttemptsComponent } from './drhemo-attempts.component';

describe('DrhemoAttemptsComponent', () => {
  let component: DrhemoAttemptsComponent;
  let fixture: ComponentFixture<DrhemoAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrhemoAttemptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrhemoAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

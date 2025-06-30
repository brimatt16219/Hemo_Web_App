import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrquizesComponent } from './cvrquizes.component';

describe('CvrquizesComponent', () => {
  let component: CvrquizesComponent;
  let fixture: ComponentFixture<CvrquizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrquizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrquizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

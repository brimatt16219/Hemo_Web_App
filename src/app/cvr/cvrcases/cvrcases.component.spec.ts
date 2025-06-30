import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvrcasesComponent } from './cvrcases.component';

describe('CvrcasesComponent', () => {
  let component: CvrcasesComponent;
  let fixture: ComponentFixture<CvrcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvrcasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvrcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

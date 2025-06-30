import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRcasesComponent } from './cvrcases.component';

describe('CVRcasesComponent', () => {
  let component: CVRcasesComponent;
  let fixture: ComponentFixture<CVRcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRcasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

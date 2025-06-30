import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVRquizesComponent } from './cvrquizes.component';

describe('CVRquizesComponent', () => {
  let component: CVRquizesComponent;
  let fixture: ComponentFixture<CVRquizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVRquizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVRquizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

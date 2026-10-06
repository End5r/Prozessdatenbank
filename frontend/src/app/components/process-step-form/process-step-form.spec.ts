import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessStepForm } from './process-step-form';

describe('ProcessStepForm', () => {
  let component: ProcessStepForm;
  let fixture: ComponentFixture<ProcessStepForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStepForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessStepForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

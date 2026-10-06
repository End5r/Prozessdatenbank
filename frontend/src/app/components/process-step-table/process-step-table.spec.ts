import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessStepTable } from './process-step-table';

describe('ProcessStepTable', () => {
  let component: ProcessStepTable;
  let fixture: ComponentFixture<ProcessStepTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStepTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessStepTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

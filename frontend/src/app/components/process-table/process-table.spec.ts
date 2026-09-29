import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessTable } from './process-table';

describe('ProcessTable', () => {
  let component: ProcessTable;
  let fixture: ComponentFixture<ProcessTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

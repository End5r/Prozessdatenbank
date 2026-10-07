import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Eval } from './eval';

describe('Eval', () => {
  let component: Eval;
  let fixture: ComponentFixture<Eval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eval],
    }).compileComponents();

    fixture = TestBed.createComponent(Eval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

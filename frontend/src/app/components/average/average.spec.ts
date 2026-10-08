import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Average } from './average';

describe('Average', () => {
  let component: Average;
  let fixture: ComponentFixture<Average>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Average],
    }).compileComponents();

    fixture = TestBed.createComponent(Average);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

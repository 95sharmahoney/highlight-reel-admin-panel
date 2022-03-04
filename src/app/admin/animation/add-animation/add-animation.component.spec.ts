import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimationComponent } from './add-animation.component';

describe('AddAnimationComponent', () => {
  let component: AddAnimationComponent;
  let fixture: ComponentFixture<AddAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

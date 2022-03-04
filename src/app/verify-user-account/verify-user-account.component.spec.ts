import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserAccountComponent } from './verify-user-account.component';

describe('VerifyUserAccountComponent', () => {
  let component: VerifyUserAccountComponent;
  let fixture: ComponentFixture<VerifyUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

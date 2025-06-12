import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReadyComponent } from './account-ready.component';

describe('AccountReadyComponent', () => {
  let component: AccountReadyComponent;
  let fixture: ComponentFixture<AccountReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountReadyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

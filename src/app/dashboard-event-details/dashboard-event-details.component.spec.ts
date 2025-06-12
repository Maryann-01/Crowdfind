import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventDetailsComponent } from './dashboard-event-details.component';

describe('DashboardEventDetailsComponent', () => {
  let component: DashboardEventDetailsComponent;
  let fixture: ComponentFixture<DashboardEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

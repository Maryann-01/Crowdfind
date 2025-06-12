import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInfoSharedComponent } from './home-info-shared.component';

describe('HomeInfoSharedComponent', () => {
  let component: HomeInfoSharedComponent;
  let fixture: ComponentFixture<HomeInfoSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInfoSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeInfoSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWrapperComponent } from './maps-wrapper.component';

describe('MapsWrapperComponent', () => {
  let component: MapsWrapperComponent;
  let fixture: ComponentFixture<MapsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

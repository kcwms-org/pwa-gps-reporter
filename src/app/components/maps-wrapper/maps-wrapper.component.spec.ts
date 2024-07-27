import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWrapperComponent } from './maps-wrapper.component';
import { SafeResourceUrl } from '@angular/platform-browser';

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
    component.mapParameters = { longitude: 1.000, lattitude: 1.000 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getMapSource should return a valid url', () => {
    const url: SafeResourceUrl | null = component.mapSource;
    console.info(`mapSource returned`, url);

    expect(url).not.toBeNull();
  });
});

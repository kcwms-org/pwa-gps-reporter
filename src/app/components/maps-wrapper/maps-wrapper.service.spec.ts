import { TestBed } from '@angular/core/testing';

import { MapsWrapperService } from './maps-wrapper.service';

describe('MapsWrapperService', () => {
  let service: MapsWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getMapsSource should pass
  it('getMapsSource() should return an empty string when one input is 0', () => {
    
    const badLattitude = 0;
    const badLongitude = Math.random() * (1 - 10000) + 1;

    console.info(`badLattitude=${badLattitude}, badLongitude=${badLongitude}`);
    expect(service.getMapsSource(badLattitude, badLongitude)).toBe('');
  })

  it('getMapsSource() should return url when both inputs are not 0', () => {
    const goodLattitude = Math.random() * (1 - 9999999) + 1;
    const goodLongitude = Math.random() * (1 - 9999999) + 1;
    expect(service.getMapsSource(goodLattitude, goodLongitude)).not.toBe('');
  })

  //isValidUrl should pass
  it('isValidUrl() should pass for http://tbd.com', () => {
    const url: string = 'http://tbd.com';
    expect(service.isValidUrl(url)).toBeTrue();
  })

  //isValidUrl should pass
  it('isValidUrl() should pass for https://tbd.com', () => {
    const url: string = 'https://tbd.com';
    expect(service.isValidUrl(url)).toBeTrue();
  })

  it('isValidUrl() should pass for ftp://tbd.com', () => {
    const url: string = 'ftp://tbd.com';
    expect(service.isValidUrl(url)).toBeTrue();
  })

  it('isValidUrl() should pass for file://home', () => {
    const url: string = 'file://home';
    expect(service.isValidUrl(url)).toBeTrue();
  })

  //isValidUrl should fail
  it('isValidUrl() should fail for fake.com', () => {
    const url: string = 'fake.com';
    expect(service.isValidUrl(url)).toBeFalse();
  })
  it('isValidUrl() should fail for empty string', () => {
    const url: string = '';
    expect(service.isValidUrl(url)).toBeFalse();
  })

});

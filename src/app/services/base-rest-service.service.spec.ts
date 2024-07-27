import { TestBed } from '@angular/core/testing';

import { BaseRestServiceService } from './base-rest-service.service';

describe('BaseRestServiceService', () => {
  let service: BaseRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

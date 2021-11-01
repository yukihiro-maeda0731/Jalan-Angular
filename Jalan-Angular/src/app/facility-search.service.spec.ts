import { TestBed } from '@angular/core/testing';

import { FacilitySearchService } from './facility-search.service';

describe('FacilitySearchService', () => {
  let service: FacilitySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilitySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

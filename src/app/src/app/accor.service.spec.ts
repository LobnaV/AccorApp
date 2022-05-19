import { TestBed } from '@angular/core/testing';

import { AccorService } from './accor.service';

describe('AccorService', () => {
  let service: AccorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

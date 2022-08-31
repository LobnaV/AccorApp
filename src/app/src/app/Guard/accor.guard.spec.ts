import { TestBed } from '@angular/core/testing';

import { AccorGuard } from './accor.guard';

describe('AccorGuard', () => {
  let guard: AccorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

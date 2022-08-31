import { TestBed } from '@angular/core/testing';

import { AccorInterceptor } from './accor.interceptor';

describe('AccorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AccorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AccorInterceptor = TestBed.inject(AccorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

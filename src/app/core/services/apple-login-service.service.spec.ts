import { TestBed } from '@angular/core/testing';

import { AppleLoginServiceService } from './apple-login-service.service';

describe('AppleLoginServiceService', () => {
  let service: AppleLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppleLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

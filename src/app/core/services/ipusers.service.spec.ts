import { TestBed } from '@angular/core/testing';

import { IpusersService } from './ipusers.service';

describe('IpusersService', () => {
  let service: IpusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

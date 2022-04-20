import { TestBed } from '@angular/core/testing';

import { ProposalsTriviaService } from './proposals-trivia.service';

describe('ProposalsTriviaService', () => {
  let service: ProposalsTriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalsTriviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

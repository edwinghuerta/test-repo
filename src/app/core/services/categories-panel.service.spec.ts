import { TestBed } from '@angular/core/testing';

import { CategoriesPanelService } from './categories-panel.service';

describe('CategoriesPanelService', () => {
  let service: CategoriesPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TotdosService } from './todos.service';

describe('TotdosService', () => {
  let service: TotdosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotdosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

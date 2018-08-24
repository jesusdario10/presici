import { TestBed, inject } from '@angular/core/testing';

import { TipomttoService } from './tipomtto.service';

describe('TipomttoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipomttoService]
    });
  });

  it('should be created', inject([TipomttoService], (service: TipomttoService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { InmuebleServiceService } from './inmueble-service.service';

describe('InmuebleServiceService', () => {
  let service: InmuebleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmuebleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

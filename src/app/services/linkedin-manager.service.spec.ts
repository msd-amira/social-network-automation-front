import { TestBed } from '@angular/core/testing';

import { LinkedinManagerService } from './linkedin-manager.service';

describe('LinkedinManagerService', () => {
  let service: LinkedinManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedinManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

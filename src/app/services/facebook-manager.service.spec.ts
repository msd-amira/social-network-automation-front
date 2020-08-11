import { TestBed } from '@angular/core/testing';

import { FacebookManagerService } from './facebook-manager.service';

describe('FacebookManagerService', () => {
  let service: FacebookManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RoleLanguageService } from './role-language.service';

describe('RoleLanguageService', () => {
  let service: RoleLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

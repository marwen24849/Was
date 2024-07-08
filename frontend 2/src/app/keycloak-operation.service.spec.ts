import { TestBed } from '@angular/core/testing';

import { KeycloakOperationService } from './keycloak-operation.service';

describe('KeycloakOperationService', () => {
  let service: KeycloakOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

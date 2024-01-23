import { TestBed } from '@angular/core/testing';

import { PlayerSelectionService } from './player-selection.service';

describe('PlayerSelectionService', () => {
  let service: PlayerSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

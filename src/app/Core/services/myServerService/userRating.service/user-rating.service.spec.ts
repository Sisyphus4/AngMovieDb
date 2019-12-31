import { TestBed } from '@angular/core/testing';

import { UserRatingService } from './user-rating.service';

describe('UserRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRatingService = TestBed.get(UserRatingService);
    expect(service).toBeTruthy();
  });
});

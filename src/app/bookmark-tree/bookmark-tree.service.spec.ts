import { TestBed } from '@angular/core/testing';

import { BookmarkTreeService } from './bookmark-tree.service';

describe('BookmarkTreeService', () => {
  let service: BookmarkTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommentSearchService } from './comment-search.service';

describe('CommentSearchService', () => {
  let service: CommentSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

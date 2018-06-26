import { TestBed, inject } from '@angular/core/testing';
import { isEqual } from 'lodash';
import { of } from 'rxjs';

import { mockPosts } from '../test/mock-posts';
import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;
  let httpClient;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(of(mockPosts));
    postService = new PostService(httpClient);
  });

  it('should get all posts', () => {
    postService.getAllPosts().subscribe(
      posts => { expect(isEqual(posts, mockPosts)); },
      () => { fail(); }
    );
    expect(httpClient.get).toHaveBeenCalled();
  });

  it('should get all post titles', () => {
    postService.getAllPostTitles().subscribe(
      titles => {
        expect(titles.length).toBe(2);
        expect(titles[0]).toBe(mockPosts[0].title);
        expect(titles[1]).toBe(mockPosts[1].title);
      },
      () => { fail(); }
    );
  });
});

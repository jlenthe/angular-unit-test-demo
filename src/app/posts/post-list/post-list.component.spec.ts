import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { asyncData, asyncError } from '../../core/test/test-utils';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../core/services/post.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService;

  const spinner = () => fixture.debugElement.query(By.css('app-spinner'));
  const errorMessage = () => fixture.debugElement.query(By.css('.error-message'));
  const postTitles = () => fixture.debugElement.queryAll(By.css('.post-title'));

  beforeEach(async(() => {
    postService = jasmine.createSpyObj('PostService', ['getAllPostTitles']);
    postService.getAllPostTitles.and.returnValue(asyncData(['title 1', 'title 2']));

    TestBed.configureTestingModule({
      declarations: [
        PostListComponent,
        SpinnerStubComponent
      ],
      providers: [
        { provide: PostService, useValue: postService }
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should show the spinner until the data is loaded', async(() => {
    createComponent();
    expect(spinner()).toBeTruthy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spinner()).toBeFalsy();
    });
  }));

  it('should show an error message is the data cannot be loaded', async() => {
    postService.getAllPostTitles.and.returnValue(asyncError(new Error()));
    createComponent();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spinner()).toBeFalsy();
      expect(errorMessage()).toBeTruthy();
    });
  });

  it('should show titles when successfully loaded', () => {
    createComponent();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const titles = postTitles();
      expect(titles.length).toBe(2);
      expect(titles[0].nativeElement.textContent.trim()).toBe('title 1');
      expect(titles[1].nativeElement.textContent.trim()).toBe('title 2');
    });
  });
});

@Component({selector: 'app-spinner', template: '' })
export class SpinnerStubComponent { }

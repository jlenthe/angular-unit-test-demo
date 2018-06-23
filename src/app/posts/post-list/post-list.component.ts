import { Component, OnInit } from '@angular/core';

import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  loading = false;
  error = false;
  titles: string[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loading = true;
    this.postService.getAllPostTitles().subscribe(
      titles => {
        this.loading = false;
        this.titles = titles;
      },
      () => {
        this.loading = false;
        this.error = true;
      }
    );
  }
}

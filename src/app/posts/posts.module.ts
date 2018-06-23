import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    PostListComponent
  ],
  exports: [
    PostListComponent
  ]
})
export class PostsModule { }

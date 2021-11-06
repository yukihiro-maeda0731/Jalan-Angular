import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../model/comment';
import { CommentSearchService } from '../service/comment-search.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  facilityNo = "";
  comments: Comment[] = [];

  constructor(private service: CommentSearchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // 画面遷移時に遷移元から宿Noを取得
    this.activatedRoute.queryParams.subscribe(
      qparams=>{
        this.facilityNo = qparams['facilityNo'];
        console.log(this.facilityNo);
      }
    )
    this.getComments(); 
  }

  getComments()  {
  this.service.getComments(this.facilityNo).subscribe(data => {
    console.log("data:" + data);
    this.comments = data;
    console.log(this.comments);
  });


}
}

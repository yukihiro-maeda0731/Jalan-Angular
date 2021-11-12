import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../model/comment';
import { CommentSearchService } from '../service/comment-search.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  facilityNo = "";
  comments: Comment[] = [];

  constructor(private service: CommentSearchService, private activatedRoute: ActivatedRoute, private router: Router, private overlay: Overlay) { }

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

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
  this.overlayRef.attach(new ComponentPortal(MatSpinner));
  this.service.getComments(this.facilityNo).subscribe(data => {
    console.log("data:" + data);
    this.comments = data;
    console.log(this.comments);
    this.overlayRef.detach();
  });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}

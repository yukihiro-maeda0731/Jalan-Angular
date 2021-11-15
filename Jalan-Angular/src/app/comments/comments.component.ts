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
  currentIndex: number = 1;

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
  this.service.getComments(this.facilityNo, this.currentIndex).subscribe(data => {
    console.log("data:" + data);
    console.log(this.comments);
    this.comments = data;
    this.overlayRef.detach();
  });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

    /**
   * 前の30件取得
   */
  prevComment(){
   this.overlayRef.attach(new ComponentPortal(MatSpinner));
   this.currentIndex = this.currentIndex - 1;
   this.service.getComments(this.facilityNo, this.currentIndex).subscribe(data => {
     console.log("data:" + data)
     this.comments = data;
     console.log(data.fa);
     this.overlayRef.detach();
     this.scrollToTop();
   });
 }
  
  /**
   * 次の30件取得
   */
  nextComment(){
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.currentIndex = this.currentIndex + 1;
    this.service.getComments(this.facilityNo, this.currentIndex).subscribe(data => {
      console.log("data:" + data)
      this.comments = data;
      console.log(data.fa);
      this.overlayRef.detach();
      this.scrollToTop();
    });
  }

  // ページ上部へ移動
  scrollToTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  /**
   * 星を動的に表示する。
   */
  countStar(i: number){
    return  Array(Number(i));
  }

}

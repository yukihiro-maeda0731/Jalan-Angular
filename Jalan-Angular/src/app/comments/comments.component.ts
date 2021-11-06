import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  facilityNo = "";


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // 画面遷移時に遷移元から宿Noを取得
    this.activatedRoute.queryParams.subscribe(
      qparams=>{
        this.facilityNo = qparams['facilityNo'];
        console.log(this.facilityNo);
      }
    )
  }

}

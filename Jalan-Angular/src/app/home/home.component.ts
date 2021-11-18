import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilitySearchService } from '../service/facility-search.service';
import { Facility } from '../model/facility';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public inputJP: String = '';

  facilities: Facility[] = [];

  currentIndex: number = 0;

  noFacilityMessageFlg: boolean = false;

  constructor(private service: FacilitySearchService, private router: Router, private overlay: Overlay) { }

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  ngOnInit(): void {
  }

  /**
   * 宿泊施設名取得。
   */
   getFacilities()  {
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.service.getFacilities(this.inputJP, 0).subscribe(data => {
      console.log("data:" + data)
      if(data.length === 0){
        this.noFacilityMessageFlg = true;
      } else {
        this.noFacilityMessageFlg = false;
      }
      this.facilities = data;
      console.log(data.fa)
      this.overlayRef.detach();
    });
  }

  /**
   * コメント一覧へ遷移。
   */
  displayComments(facilityNo :any){
    this.router.navigate(['/comments'], { queryParams: {facilityNo: facilityNo}});
  }

  /**
   * 前の30件取得
   */
  prevFacility(){
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.currentIndex = this.currentIndex - 30;
    this.service.getFacilities(this.inputJP, this.currentIndex).subscribe(data => {
      console.log("data:" + data)
      this.facilities = data;
      console.log(data.fa);
      this.overlayRef.detach();
      this.scrollToTop();
    });
  }

  /**
   * 次の30件取得
   */
  nextFacility(){
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.currentIndex = this.currentIndex + 30;
    this.service.getFacilities(this.inputJP, this.currentIndex).subscribe(data => {
      console.log("data:" + data)
      this.facilities = data;
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
  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilitySearchService } from '../service/facility-search.service';
import { Facility } from '../model/facility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public inputJP: String = '';

  facilities: Facility[] = [];

  currentIndex: String = "0";

  constructor(private service: FacilitySearchService, private router: Router) { }

  ngOnInit(): void {
  }


  /**
   * 宿泊施設名取得。
   */
   getFacilities()  {
    this.service.getFacilities(this.inputJP, this.currentIndex).subscribe(data => {
      console.log("data:" + data)
      this.facilities = data;
      console.log(data.fa)
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
    console.log('前へ');
  }

  /**
   * 次の30件取得
   */
  nextFacility(){
    console.log('次へ');
  }
  

}

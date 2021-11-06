import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilitySearchService } from '../facility-search.service';
import { Facility } from '../model/facility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public inputJP: String = '';

  facilities: Facility[] = [];

  constructor(private service: FacilitySearchService, private router: Router) { }

  ngOnInit(): void {
  }


  /**
   * 宿泊施設名取得。
   */
   getFacilities()  {
    this.service.getFacilities(this.inputJP).subscribe(data => {
      console.log("data:" + data)
      this.facilities = data;
      console.log(data.fa)
    });
  }

  displayComments(facilityNo :any){
    this.router.navigate(['/comments'], { queryParams: {facilityNo: facilityNo}});
  }

}

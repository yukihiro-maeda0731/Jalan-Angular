import { Component, OnInit } from '@angular/core';
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

  constructor(private service: FacilitySearchService) { }

  ngOnInit(): void {
  }


  /**
   * 翻訳文取得。
   */
   getFacilities()  {
    this.service.getFacilities(this.inputJP).subscribe(data => {
      console.log("data:" + data)
      this.facilities = data.facilities;
    });
  }

}

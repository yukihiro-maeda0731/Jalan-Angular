import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const apigatewayURL: string = environment.apigatewayURL;

@Injectable({
  providedIn: 'root'
})
export class FacilitySearchService {
  constructor(private http: HttpClient) { }

   /**
   * 宿泊施設取得。
   */
    getFacilities(keyword: String, currentIndex: number): Observable<any> {
      return this.http.get(`${apigatewayURL}?keyword=${keyword}&currentIndex=${currentIndex}`);
    }

}

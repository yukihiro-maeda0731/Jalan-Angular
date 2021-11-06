import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const apigatewayURL: string = environment.apigatewayURL;
const httpOptions = {
  headers: { 'Content-Type': 'application/json' }
};

@Injectable({
  providedIn: 'root'
})
export class FacilitySearchService {
  constructor(private http: HttpClient) { }

   /**
   * 宿泊施設取得。
   */
    getFacilities(keyword: String): Observable<any> {
      return this.http.get(`${apigatewayURL}?keyword=${keyword}`);
    }

}

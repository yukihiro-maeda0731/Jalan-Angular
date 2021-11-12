import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const apigatewaySearchCommentsURL: string = environment.apigatewaySearchCommentsURL;

@Injectable({
  providedIn: 'root'
})
export class CommentSearchService {

  constructor(private http: HttpClient) { }

  /**
   * 宿泊施設取得。
   */
  getComments(facilityNo: string, currentIndex: number): Observable<any> {
    return this.http.get(`${apigatewaySearchCommentsURL}?facilityNo=${facilityNo}&currentIndex=${currentIndex}`);
  }
  
}

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
  execTaskName = '';
  constructor(private http: HttpClient) { }

   /**
   * 宿泊施設取得。
   */
    getFacilities(keyword: String): Observable<any> {
      return this.http.get(`${apigatewayURL}${keyword}`);
    }


    exec_task(keyword: String): Observable<any> {
      const reqbody = {
        input: `{"keyword": ${keyword}}`,
        name: 'MyExecution_',
        stateMachineArn:
          'arn:aws:states:ap-northeast-1:473405973194:stateMachine:JalanMachine'
      };
      return this.http.post<any>(apigatewayURL, reqbody, httpOptions);
    }
  
    status_task(): Observable<any> {
      const reqbody = {
        executionArn: this.execTaskName
      };
      const statusUrl = apigatewayURL + '/status';
      return this.http.post<any>(statusUrl, reqbody, httpOptions);
    }
}

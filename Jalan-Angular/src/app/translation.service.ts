import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const apigatewayURL: string = environment.apigatewayURL;
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

   /**
   * 翻訳文取得。
   */
    getTranslatedSentence(japanese: String): Observable<any> {
      return this.http.get(`${apigatewayURL}${japanese}`);
    }
}

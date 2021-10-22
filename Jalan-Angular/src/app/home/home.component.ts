import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public inputJP: String = '';

  translatedSentence: String = '';

  constructor(private service: TranslationService) { }

  ngOnInit(): void {
  }


  /**
   * 翻訳文取得。
   */
   getTranslatedSentence()  {
    this.service.getTranslatedSentence(this.inputJP).subscribe(data => {
      console.log("data.TranslatedText" + data.TranslatedText)
      this.translatedSentence = data.english.TranslatedText;
    });
  }

}

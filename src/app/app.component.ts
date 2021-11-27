import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pelatis-demo';

  constructor(
    private translate: TranslateService,
    private configService: ConfigService,
    // public auth: AuthService
  ) {
    this.setupLanguage();
    this.getNotificationOptions();
  }
  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    const localization: any = this.configService.get('localization');
    const languages: Array<string> = localization.languages.map((lang: { code: any; }) => lang.code);
    const browserLang: string = this.translate.getBrowserLang() as string;

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);
    const selectedLang =
      languages.indexOf(browserLang) > -1 ? browserLang : localization.defaultLanguage;
    const selectedCulture = localization.languages.filter((lang : {code: any;}) => lang.code === selectedLang)[0]
      .culture;
    this.translate.use(selectedLang);

    
  }

  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
    return this.configService.get('notifications').options;
  }
}

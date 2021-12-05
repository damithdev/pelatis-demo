import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ConfigService } from './app-config.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'pelatis-demo';

  private authSub!: Subscription;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private translate: TranslateService,
    private configService: ConfigService,
    private auth: AuthService
  ) {
    this.setupLanguage();
    this.getNotificationOptions();
  }
  ngOnDestroy(): void {
    console.log("on destroy")
    this.authSub.unsubscribe();
  }
  ngOnInit(): void {
    this.auth.autoLogin();
    this.authSub = this.auth.user.subscribe(user => {
      if (user.token) {
        console.log(user)
        this.isLoggedIn$.next(true)
        return;
      }
      this.isLoggedIn$.next(false);
    });
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

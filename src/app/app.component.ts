import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Settings, SettingsService } from 'helgoland-toolbox';
import { NavController, Platform } from 'ionic-angular';

import { DiagramPage } from '../pages/diagram/diagram';
import { MapPage } from '../pages/map/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;

  rootPage: any = MapPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private settingsSrvc: SettingsService<Settings>,
    private translate: TranslateService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'map.header', component: MapPage },
      { title: 'diagram.header', component: DiagramPage }
    ];

  }

  initializeApp() {
    const langCode = navigator.language.split('-')[0];
    const language = this.settingsSrvc.getSettings().languages.find(lang => lang.code === langCode);
    if (language) {
      this.translate.use(language.code)
    } else {
      this.translate.use('en');
    }

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.nav.getActive().name != page.component.name) {
      this.nav.push(page.component);
    }
  }
}

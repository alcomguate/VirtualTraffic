import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import StreetScene from './Scene/StreetScene';

import Phaser from 'phaser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // initializa phaser
      this.initializePhaser();
    });
  }

  initializePhaser() {
    this.config = {
      type: Phaser.AUTO,
      width: '100%',
      height: '100%',
      parent: 'game',
      scene: [StreetScene],
      render: {
        pixelArt: true
      }
    };
    this.phaserGame = new Phaser.Game(this.config);
  }
}

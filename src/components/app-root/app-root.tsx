import { Component, State } from '@stencil/core';
import * as child_process from 'child_process';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @State()
  xml: string = '<RSAKeyValue>\n\t<Modulus>b\'1dsY3ah...\'</Modulus>\n\t<Exponent>b\'AQAB\'</Exponent>\n</RSAKeyValue>';
  
  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="dark">
            <ion-title>ssh-rsa - xml</ion-title>
            <ion-buttons slot="primary">
              <ion-button
                color="secondary"
                onClick={() => window.open("https://gist.github.com/hbldh/1c99de93987cad0fe0b59983132b9f3c", "_blank")}
              >
                algorithm
              </ion-button>
              created by
              <ion-button
                color="primary" 
                onClick={() => window.open("https://gist.github.com/hbldh", "_blank")}>
                Henrik Blidh
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content padding>
          <ion-item>
            <ion-label position="floating">
              ssh-rsa AABBB3NzaC1yc2EAADDDAQABAAA...
            </ion-label>
            <ion-input debounce={300} onIonChange={event => this.onKeyChange(event.detail.value)}/>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">xml output</ion-label>
            <ion-textarea disabled readonly value={this.xml} rows={10}/>
          </ion-item>
        </ion-content>
        <ion-footer>
          <ion-toolbar>
            <ion-title text-center>
              <ion-button fill="clear" onClick={() => window.open("https://github.com/")}>
                <ion-icon slot="icon-only" name="logo-github" size="large" />
              </ion-button>
            </ion-title>
          </ion-toolbar>
        </ion-footer>
      </ion-app>
    );
  }

  onKeyChange(value: string) {
    const process = child_process.spawn('python', [
      '../../converter.py',
      value
    ]);

    process.on('data', data => {
      const xml = `${data}`.substr(`${data}`.indexOf('<'));
      this.xml = xml;
    });
    
    process.stderr.on('data', () => {
      this.xml = 'something went wrong...';
    });
  }
}

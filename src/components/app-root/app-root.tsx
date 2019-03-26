import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @Prop()
  xml: string = '<RSAKeyValue>\n\t<Modulus>1dsY3ah...</Modulus>\n\t<Exponent>AQAB</Exponent>\n</RSAKeyValue>';

  @Event() keyEmiter: EventEmitter<string>;

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="dark">
            <ion-title>ssh-rsa - xml</ion-title>
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
            <ion-textarea disabled readonly value={this.xml} rows={20}/>
          </ion-item>
        </ion-content>
        <ion-footer>
          <ion-toolbar>
            <ion-title>sources</ion-title>
            <ion-buttons slot="primary">
              <ion-button
                color="secondary"
                onClick={() =>
                  window.open(
                    'https://gist.github.com/hbldh/1c99de93987cad0fe0b59983132b9f3c',
                    '_blank'
                  )
                }
              >
                <ion-icon slot="icon-only" name="logo-python" />
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="secondary">
              <ion-button
                color="dark"
                onClick={() =>
                  window.open(
                    'https://github.com/dzziwny/shh-rsa-to-xml-converter'
                  )
                }
              >
                <ion-icon slot="icon-only" name="logo-github" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-footer>
      </ion-app>
    );
  }

  onKeyChange(value: string) {
    this.keyEmiter.emit(value);
  }

}

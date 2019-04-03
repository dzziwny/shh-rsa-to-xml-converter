import { Component, Event, EventEmitter, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop()
  xml: string =
    '<RSAKeyValue>\n\t<Modulus>1dsY3ah...</Modulus>\n\t<Exponent>AQAB</Exponent>\n</RSAKeyValue>';

  @Watch('xml')
  validateName(newValue: string) {
    const generatedXml = newValue !== 'error!';
    if (!generatedXml) return;
    const copied = this.copyToClipboard(newValue);
    if (copied) this.showSavedAlert();
  }

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
        <ion-list>
          <ion-item>
            <ion-label position="floating">
              ssh-rsa AABBB3NzaC1yc2EAADDDAQABAAA...
            </ion-label>
            <ion-input
              debounce={300}
              onIonChange={event => this.onKeyChange(event.detail.value)}
            />
          </ion-item>
        </ion-list>

        <ion-list>
          <ion-item>
            <ion-label text-wrap color="medium">
              {this.xml}
            </ion-label>
          </ion-item>
        </ion-list>
          <ion-toast-controller />
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

  copyToClipboard(text: string): boolean {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

    return copied;
  }

  async showSavedAlert() {
    const toastController = document.querySelector('ion-toast-controller');
    await toastController.componentOnReady();

    const toast = await toastController.create({
      message: 'xml copied to clipboard',
      duration: 1000,
      color: 'secondary',
      position: 'middle'
    });

    return await toast.present();
  }
}

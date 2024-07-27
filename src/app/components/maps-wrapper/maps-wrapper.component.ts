import { Component, Inject, inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/embed';

@Component({
  selector: 'app-maps-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './maps-wrapper.component.html',
  styleUrl: './maps-wrapper.component.scss'
})
export class MapsWrapperComponent {
  /**
   * the google sheets api key. this should be injected   * 
   */
  private _googleSheetsApiKey: string = 'AIzaSyDBK2pxTLYSxtcu-P29JLtOmTcKJfCBKIo';
  private _lattitude: number = 0;
  private _longitude: number = 0;

  /**
   * get the url to google maps passing in the longitute and lattitude as querystring parameters
   */
  public get mapSource(): SafeResourceUrl | null {
    let safeUrl : SafeResourceUrl | null = null;
    const url = this.getMapsSource(this._lattitude, this._longitude);
    if (this.isValidUrl(url))
      safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }
  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {

  }

  /**
   * pass in the longitude and lattitude parameters
   * @param params 
   */
  @Input()
  public set mapParameters(params: { longitude: number, lattitude: number }) {
    if (params?.lattitude && params.longitude) {
      this._lattitude = params.lattitude;
      this._longitude = params.longitude;
    }
    else {
      console.error('expected { longitutde: number, lattitude: number } got ', params);
    }
  }

  /**
   * get the url to the 
   * @param latitude the lattitude
   * @param longitude the longitude
   * @returns 
   */
  protected getMapsSource = (latitude: number, longitude: number) => `${GOOGLE_MAPS_BASE_URL}/v1/place?q=%20${this._lattitude}%2C${this._longitude}&key=${this._googleSheetsApiKey}`;

  protected isValidUrl = (input: string) => (input) ? true : false;

}


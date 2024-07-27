import { Component, Inject, inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapsWrapperService } from './maps-wrapper.service';

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
  private _lattitude: number = 0;
  private _longitude: number = 0;

  /**
   * get the url to google maps passing in the longitute and lattitude as querystring parameters
   */
  public get mapSource(): SafeResourceUrl | null {
    let safeUrl: SafeResourceUrl | null = null;
    
    const url = this.logic.getMapsSource(this._lattitude, this._longitude);
    if (url)
      safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    return safeUrl;
  }

  constructor(private sanitizer: DomSanitizer, private logic: MapsWrapperService) {

  }

  /**
   * pass in the longitude and lattitude parameters
   * @param params 
   */
  @Input()
  public set mapParameters(params: { longitude: number, lattitude: number }) {
    if (params?.lattitude && params?.longitude) {
      this._lattitude = params.lattitude;
      this._longitude = params.longitude;
    }
    else {
      console.error('expected { longitutde: number, lattitude: number } got ', params);
    }
  }

}


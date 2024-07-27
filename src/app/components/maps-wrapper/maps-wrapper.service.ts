import { Injectable } from '@angular/core';
const GOOGLE_MAPS_BASE_URL: string = 'https://www.google.com/maps/embed';
const GOOGLE_SHEETS_API_KEY: string = 'AIzaSyDBK2pxTLYSxtcu-P29JLtOmTcKJfCBKIo';
@Injectable({
  providedIn: 'root'
})
export class MapsWrapperService {

  constructor() { }

  /**
   * validate that a string can act as a valid url
   * @param input a url string
   * @returns true or false
   */
  public isValidUrl(input: string): boolean {
    let isValid = true;
    try {
      new URL(input);
    } catch (error) {
      isValid = false;
      console.error(`isValid("${input}")`, error);
    }
    return isValid;
  }

  /**
   * get the url to the 
   * @param latitude the lattitude
   * @param longitude the longitude
   * @returns The formatted url or an empty string if that url would be invlaid
   */
  public getMapsSource(latitude: number, longitude: number): string {

    console.info(`called getMapsSource(${latitude}, ${longitude})`);

    if (latitude && longitude) {
      const url = `${GOOGLE_MAPS_BASE_URL}/v1/place?q=%20${latitude}%2C${longitude}&key=${GOOGLE_SHEETS_API_KEY}`;


      if (this.isValidUrl(url)) {
        return url;
      }
      else {
        return '';
      }
    }
    else {
      console.error(`getMapsSource received invlid longitude ${longitude} or lattitude ${latitude}`);
      return '';
    }

  };
}

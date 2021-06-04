
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'google-map-demo',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent  {
  apiLoaded: Observable<boolean>;  
  options: google.maps.MapOptions = {
    center: { lat: 50, lng: 36.2 },
    zoom: 10
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 50, lng: 36.2 }];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCbL8rgOtmuwHr7038PmPSeU7kpKKBL8vo&v', 'callback')
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  loadMap(){
      const map = new google.maps.Map( document.getElementById("map"), this.options);
      const latLng = new google.maps.LatLng(50, 36.2);
      createHTMLMapMarker({
        latlng: latLng,
        map: map,
        html: `<img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" style='width: 50px; height: 50px'>`
      });
  }
}/* global google */

const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    div; html; latlng; overlayImage;
    constructor() { 
      super();
      this.latlng = args.latlng;
      this.html = args.html;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      if (this.html) {
        this.div.innerHTML = this.html;
      }
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(this.div)
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - offset}px`;
        this.div.style.top = `${point.y - offset}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }

    getDraggable() {
      return false;
    }
  }

  return new HTMLMapMarker();
};

export default createHTMLMapMarker;

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapsWrapperComponent } from "./components/maps-wrapper/maps-wrapper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapsWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mcasey-gps-tracker';
}

import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APP';
}
let x=new AboutComponent()
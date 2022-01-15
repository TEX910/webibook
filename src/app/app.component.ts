import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'webibook';

  constructor(public auth: AuthService) { }
}

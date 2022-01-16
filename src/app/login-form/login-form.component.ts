import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() isLoggedIn = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onGoogleLogin() {
    this.authService.GoogleAuth();
  }
  onGoogleLogout() {
    this.authService.googleSignOut();
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onGoogleLogin() {
    this.authService.GoogleAuth();
  }

}

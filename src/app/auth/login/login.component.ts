import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  credentials: any = {};

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', data.accessToken);
        // Redirige al usuario o muestra un mensaje de éxito
      },
      error: (error) => console.error(error)
    });
  }
}

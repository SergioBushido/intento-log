import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  // Las propiedades del usuario
  user: any = {
    username: '',
    email: '',
    password: ''
  };

  // Variables para almacenar los tokens
  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        // Almacena los tokens en el localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // Asigna los tokens a las variables para mostrarlos en la plantilla
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;

        // Redirección u otra lógica después del registro
      },
      error: (error) => {
        console.error('Hubo un error al registrar', error);
      }
    });
  }
}

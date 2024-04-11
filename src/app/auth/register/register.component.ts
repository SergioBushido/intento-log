import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde '@angular/router'
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

  constructor(
    private authService: AuthService,
    private router: Router // Agrega Router como una dependencia
  ) { }

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        // Almacena los tokens en el localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // Asigna los tokens a las variables para mostrarlos en la plantilla
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;

        // Redirige al usuario a la página de artículos después del registro exitoso
        this.router.navigate(['/article']); // Utiliza el enrutador para navegar a la ruta de artículos
      },
      error: (error) => {
        console.error('Hubo un error al registrar', error);
      }
    });
  }
}

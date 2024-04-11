import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta del servicio es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [] // Asegúrate de que la ruta del CSS es correcta si tienes estilos
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false; // Puedes usar esta propiedad para mostrar un indicador de carga

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Indicador de inicio de la petición de inicio de sesión
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          // Aquí obtienes el access_token y refresh_token de la respuesta
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;

          // Almacenar los tokens en localStorage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          // Redirige al usuario a la página 'article'
          this.router.navigate(['/article']);
        },
        error => {
          console.error('Error during login', error);
          this.isLoading = false; // Detiene el indicador de carga si hay un error
        },
        () => {
          this.isLoading = false; // Detiene el indicador de carga una vez que se completa la petición
        }
      );
    } else {
      console.log('Formulario no válido');
      // Aquí podrías mostrar mensajes de validación o manejar la lógica de formularios inválidos
    }
  }
}

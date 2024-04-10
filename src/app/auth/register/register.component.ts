import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  user: any = {
    username: '', // Agrega las propiedades correspondientes al usuario
    email: '',
    password: ''
  }; // Objeto para almacenar los datos del usuario del formulario

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log(response); // Maneja la respuesta del servidor
        // Lógica adicional, por ejemplo, redireccionar al usuario a otra página
      },
      error: (error) => {
        console.error(error); // Maneja el error
        // Lógica adicional, por ejemplo, mostrar un mensaje de error al usuario
      }
    });
  }
}

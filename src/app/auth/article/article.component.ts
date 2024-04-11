import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
    <h1>Artículos</h1>
    <p>Token de acceso: {{ accessToken }}</p>
    <!-- Aquí iría el resto de tu contenido de la página de artículos -->
  `,
  styles: []
})
export class ArticleComponent implements OnInit {
  accessToken: string | null = null;

  ngOnInit(): void {
    this.loadToken();
  }

  loadToken(): void {
    // Recuperar el token de acceso del localStorage
    this.accessToken = localStorage.getItem('access_token');
  }
}

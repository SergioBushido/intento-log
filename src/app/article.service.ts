import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './auth/article/article.model'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081/api/v1'; // Reemplaza 'URL_DEL_API' por la URL de tu API

  constructor(private http: HttpClient) { }

  getArticles(token: string): Observable<Article[]> {
  
    const headers = new HttpHeaders({
      'accept': 'application/hal+json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Article[]>(`${this.apiUrl}/articles`, { headers });
  }

 
/*
   getTokenAsync() {
    return new Promise((resolve) => {
      
        const token = localStorage.getItem('access_token');
        resolve(token);
      
    });
  }


  async loadToken() {
    try {
      const token = await this.getTokenAsync();

      console.log('Token recuperado:', token);
      // Puedes hacer algo más con el token aquí
    } catch (error) {
      console.error('Error al recuperar el token:', error);
    }
  }*/
}

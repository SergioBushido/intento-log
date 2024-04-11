import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './auth/article/article.model'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081/api/v1'; // Reemplaza 'URL_DEL_API' por la URL de tu API
  articleService: any;
  articles: any;

  constructor(private http: HttpClient) { }

  getArticles(token: string): Observable<Article[]> {
  
    const headers = new HttpHeaders({
      'accept': 'application/hal+json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Article[]>(`${this.apiUrl}/articles`, { headers });
  }

  createArticle(article: Article, token: string): Observable<Article> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<Article>(`${this.apiUrl}/articles`, article, { headers });
  }
  deleteArticle(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/articles/${id}`, { headers });
}


  onDeleteArticle(id: number, index: number): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este artículo?');
    if (confirmation) {
      // Suponiendo que tengas un método en tu servicio para eliminar el artículo
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          console.log('Artículo eliminado con éxito');
          // Actualiza la lista de artículos eliminando el artículo eliminado
          this.articles.splice(index, 1);
        },
        error: (error: any) => {
          console.error('Error al eliminar el artículo:', error);
        }
      });
    }
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

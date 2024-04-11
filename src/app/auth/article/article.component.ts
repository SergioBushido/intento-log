import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../article.service';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: []
})
export class ArticleComponent implements OnInit {
  accessToken: string | null = null;
  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadToken();
    this.loadArticles();
  }

  loadToken(): void {
    // Recuperar el token de acceso del localStorage
    this.accessToken = localStorage.getItem('access_token');
  }

  loadArticles(): void {
    if (this.accessToken) {
      // Si hay un token de acceso, cargar los artículos
      this.articleService.getArticles(this.accessToken).subscribe(
        (articles: Article[]) => {
          console.log(articles)
          this.articles = articles;
        },
        (error: any) => {
          console.error('Error al cargar los artículos:', error);
        }
      );
    } else {
      console.error('No se encontró un token de acceso.');
    }
  }
}

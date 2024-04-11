import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder y FormGroup para el formulario reactivo

import { ArticleService } from '../../article.service';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: []
})
export class ArticleComponent implements OnInit {
  onDeleteArticle(id: number, index: number): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este artículo?');
    if (confirmation) {
      if (this.accessToken) {
        this.articleService.deleteArticle(id, this.accessToken).subscribe({
          next: () => {
            console.log('Artículo eliminado con éxito');
            this.articles.splice(index, 1); // Update the local articles array
          },
          error: (error) => {
            console.error('Error al eliminar el artículo:', error);
          }
        });
      } else {
        console.error('Access token is not available.');
      }
    }
  }
  

  accessToken: string | null = null;
  articles: Article[] = [];
  articleForm: FormGroup; // Agregar esta línea para el formulario reactivo

  constructor(private articleService: ArticleService, private fb: FormBuilder) { // Inyectar FormBuilder aquí
    this.articleForm = this.fb.group({ // Inicializar el formulario reactivo
      title: ['', Validators.required], // Asumiendo que tu modelo Article tiene un título
      content: ['', Validators.required] // Asumiendo que tu modelo Article tiene contenido
    });
  }

  ngOnInit(): void {
    this.loadToken();
    this.loadArticles();
  }

  loadToken(): void {
    this.accessToken = localStorage.getItem('access_token');
  }

  loadArticles(): void {
    if (this.accessToken) {
      this.articleService.getArticles(this.accessToken).subscribe(
        (articles: Article[]) => {
          this.articles = articles;
        },
        (error: any) => {
          console.error('Error al cargar los artículos:', error);
        }
      );
    }
  }

  createArticle(): void {
    if (this.articleForm.valid && this.accessToken) {
      this.articleService.createArticle(this.articleForm.value, this.accessToken).subscribe({
        next: (article) => {
          console.log('Artículo creado:', article);
          this.articles.push(article); // Agregar el nuevo artículo a la lista para actualizar la vista
          this.articleForm.reset(); // Restablecer el formulario
        },
        error: (error) => {
          console.error('Error al crear el artículo:', error);
        }
      });
    }
  }
}

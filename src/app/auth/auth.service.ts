import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/v1/auth'; // Asegúrate de que el puerto y la ruta sean correctos

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    // Usa baseUrl para construir la URL correctamente
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../../interfaces/login/login.model';  // Interfaz para las credenciales de login
import { LoginResponse } from '../../interfaces/login/login-response.model';  // Interfaz para la respuesta del backend (sin token)

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = "http://localhost:3000/";  // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: LoginModel): Observable<LoginResponse> {
    // Enviamos las credenciales al backend
    return this.http.post<LoginResponse>(`${this._baseUrl}auth/login`, credentials);
  }
  
  // Método para guardar al usuario en el almacenamiento local si es necesario
  setUserSession(response: LoginResponse) {
    // Aquí puedes guardar la información que te devuelva el backend (usuario, roles, etc.)
    localStorage.setItem('user', JSON.stringify(response)); // Ejemplo de guardar la respuesta
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('user');
  }
}

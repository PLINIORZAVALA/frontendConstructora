// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser } from '../../interfaces/users/create-user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users/create'; // URL del backend (ajusta según sea necesario)

  constructor(private http: HttpClient) { }

  // Método para crear un usuario
  createUser(user: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(this.apiUrl, user); // Hace el POST al backend
  }
}

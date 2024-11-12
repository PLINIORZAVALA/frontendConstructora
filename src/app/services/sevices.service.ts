import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Catalogo } from '../interfaces/create-catalogo.interface';

@Injectable({
  providedIn: 'root'  // Esto indica que el servicio está disponible globalmente en la aplicación
})
export class SevicesService {
  // Almacenamos la llamada de la dirección URL
  private apiURL = 'http://localhost:3000/catalogos';

  // Creamos el constructor para que obtenga los datos de la URL
  constructor(private http: HttpClient) {}

  // Realizamos la petición get desde el Backend
  getCatalogo(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.apiURL).pipe(
      catchError(error => {
        console.error('Error en la petición:', error);
        return throwError(() => new Error('Error en la petición HTTP'));
      })
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateCatalogo } from '../interfaces/create-catalogo.interface'; // Importar las interfaces
import { UpdateCatalogo } from '../interfaces/update-catalogo.interface';
import { DeleteCatalogo } from '../interfaces/delete-catalogo.interface';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private _baseUrl = 'http://localhost:3000/'; // Base URL para tu backend

  private http = inject(HttpClient);

  constructor() {}

  // Obtener todos los catálogos
  getCatalogos(): Observable<CreateCatalogo[]> {
    return this.http.get<CreateCatalogo[]>(`${this._baseUrl}api/catalogos/getAll`);
  }

  // Obtener un catálogo por ID
  getCatalogoById(id: number): Observable<CreateCatalogo> {
    return this.http.get<CreateCatalogo>(`${this._baseUrl}api/catalogos/getById/${id}`);
  }

  // Crear un nuevo catálogo
  postCatalogo(nuevoCatalogo: CreateCatalogo): Observable<CreateCatalogo> {
    return this.http.post<CreateCatalogo>(`${this._baseUrl}api/catalogos/create`, nuevoCatalogo);
  }

  // Actualizar un catálogo
  putCatalogo(id: number, catalogo: UpdateCatalogo): Observable<CreateCatalogo> {
    return this.http.put<CreateCatalogo>(`${this._baseUrl}api/catalogos/update/${id}`, catalogo);
  }

  // Eliminar un catálogo
  deleteCatalogo(id: number): Observable<DeleteCatalogo> {
    return this.http.delete<DeleteCatalogo>(`${this._baseUrl}api/catalogos/delete/${id}`);
  }
}
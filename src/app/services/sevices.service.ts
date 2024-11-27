import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCatalogo } from '../interfaces/create-catalogo.interface';
import { UpdateCatalogo } from '../interfaces/update-catalogo.interface';
import { DeleteCatalogo } from '../interfaces/delete-catalogo.interface';
import { CreateImgnAdiconal } from '../interfaces/create-catalogo.interface';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private _baseUrl = 'http://localhost:3000/api/catalogos'; // Ruta base del controlador

  constructor(private http: HttpClient) {}


  getCatalogos(): Observable<CreateCatalogo[]> {
    return this.http.get<CreateCatalogo[]>(this._baseUrl);  // Realiza la solicitud GET a la API
  }

  // Crear un nuevo catálogo
  // Método para crear un catálogo, acepta un FormData
  createCatalogo(formData: FormData): Observable<any> {
    // Realiza una solicitud POST para enviar el FormData al backend
    return this.http.post<any>(this._baseUrl, formData);
  }

  
   // Crear una imagen adicional en un catálogo
   createImagenAdicional(
    catalogoId: number,
    imagenDto: CreateImgnAdiconal // Usa la interfaz específica para imágenes adicionales
  ): Observable<CreateImgnAdiconal> {
    return this.http.post<CreateImgnAdiconal>(
      `${this._baseUrl}/${catalogoId}/imagenes`,
      imagenDto
    );
  }

  // Obtener todos los catálogos
  findAllCatalogos(): Observable<CreateCatalogo[]> {
    return this.http.get<CreateCatalogo[]>(`${this._baseUrl}`);
  }

  // Obtener un catálogo por su ID
  findCatalogoById(id: number): Observable<CreateCatalogo> {
    return this.http.get<CreateCatalogo>(`${this._baseUrl}/${id}`);
  }

  // Actualizar un catálogo
  updateCatalogo(id: number, updateCatalogoDto: UpdateCatalogo): Observable<CreateCatalogo> {
    return this.http.put<CreateCatalogo>(`${this._baseUrl}/${id}`, updateCatalogoDto);
  }

  // Eliminar un catálogo
  deleteCatalogo(id: number): Observable<DeleteCatalogo> {
    return this.http.delete<DeleteCatalogo>(`${this._baseUrl}/${id}`);
  }

  // Obtener todas las imágenes adicionales de un catálogo
  findAllImagenesAdicionales(catalogoId: number): Observable<CreateImgnAdiconal[]> {
    return this.http.get<CreateImgnAdiconal[]>(`${this._baseUrl}/${catalogoId}/imagenes`);
  }

  // Obtener una imagen adicional por su ID
  findImagenAdicionalById(imagenId: number): Observable<CreateImgnAdiconal> {
    return this.http.get<CreateImgnAdiconal>(`${this._baseUrl}/imagenes/${imagenId}`);
  }

  // Actualizar una imagen adicional
  updateImagenAdicional(
    imagenId: number,
    imagenDto: CreateImgnAdiconal // Usa la interfaz específica para imágenes adicionales
  ): Observable<CreateImgnAdiconal> {
    return this.http.put<CreateImgnAdiconal>(
      `${this._baseUrl}/imagenes/${imagenId}`,
      imagenDto
    );
  }

  // Eliminar una imagen adicional
  deleteImagenAdicional(imagenId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/imagenes/${imagenId}`);
  }
}

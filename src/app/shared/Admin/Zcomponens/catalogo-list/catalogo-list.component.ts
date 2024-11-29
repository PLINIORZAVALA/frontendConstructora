import { Component, OnInit, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CatalogosService } from '../../../../services/sevices.service';
import { CreateCatalogo } from '../../../../interfaces/create-catalogo.interface';
import { UpdateCatalogo } from '../../../../interfaces/update-catalogo.interface';
import { CreateImgnAdiconal } from '../../../../interfaces/create-catalogo.interface';

@Component({
  selector: 'app-catalogoDelete',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './catalogo-list.component.html',
  styleUrls: ['./catalogo-list.component.css']
})
export class CatalogoListComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];
  catalogoSeleccionado: CreateCatalogo | null = null;
  imagenesAdicionales: CreateImgnAdiconal[] = [];
  imagenSeleccionada: CreateImgnAdiconal | null = null;
  errorMessage: string | null = null;

  constructor(private catalogosService: CatalogosService) {}

  ngOnInit(): void {
    this.obtenerCatalogos();
    this.obtenerImagenesAdicionales();
  }

  // Obtener la lista de catálogos
  obtenerCatalogos(): void {
    this.catalogosService.findAllCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los catálogos';
      }
    });
  }

  // Obtener la lista de imágenes adicionales
  obtenerImagenesAdicionales(): void {
    if (this.catalogoSeleccionado && this.catalogoSeleccionado.id) {
      this.catalogosService.findAllImagenesAdicionales(this.catalogoSeleccionado.id).subscribe({
        next: (data) => {
          this.imagenesAdicionales = data;
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar las imágenes adicionales';
        }
      });
    } else {
      this.errorMessage = 'No se ha seleccionado un catálogo';
    }
  }
  
  eliminarCatalogo(id: number | undefined): void {
    if (id != null) {
      this.catalogosService.deleteCatalogo(id).subscribe({
        next: () => {
          this.obtenerCatalogos();  // Recargar la lista después de eliminar
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar el catálogo';
        }
      });
    }
  }
  
  eliminarImagenAdicional(id: number | undefined): void {
    if (id != null) {
      this.catalogosService.deleteImagenAdicional(id).subscribe({
        next: () => {
          this.obtenerImagenesAdicionales();
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar la imagen adicional';
        }
      });
    }
  }
  
  // Mostrar formulario de actualización de catálogo
  mostrarFormularioActualizar(catalogo: CreateCatalogo): void {
    this.catalogoSeleccionado = { ...catalogo };
  }

  // Mostrar formulario de actualización de imagen adicional
  mostrarFormularioActualizarImagen(imagen: CreateImgnAdiconal): void {
    this.imagenSeleccionada = { ...imagen };
  }

  // Actualizar un catálogo
  actualizarCatalogo(): void {
    if (this.catalogoSeleccionado?.id) {
      const updatedData: UpdateCatalogo = {
        id: this.catalogoSeleccionado.id,
        nombre: this.catalogoSeleccionado.nombre,
        tipo: this.catalogoSeleccionado.tipo,
        descripcion: this.catalogoSeleccionado.descripcion,
        imagen: this.catalogoSeleccionado.imagen
      };
      this.catalogosService.updateCatalogo(updatedData.id, updatedData).subscribe({
        next: () => {
          this.obtenerCatalogos();
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar el catálogo';
        }
      });
    } else {
      this.errorMessage = 'ID del catálogo no disponible';
    }
  }
  
 /*
  // Actualizar una imagen adicional
  actualizarImagenAdicional(): void {
    if (this.imagenSeleccionada) {
      const { id, catalogoId, ruta_imagen, descripcion_imagen } = this.imagenSeleccionada;
  
      // Verifica que 'id' y 'catalogoId' sean números
      if (id !== undefined && catalogoId !== undefined) {
        const updatedData: CreateImgnAdiconal = {
          id: id,  // Ahora 'id' y 'catalogoId' son números, no undefined
          catalogoId: catalogoId,
          ruta_imagen: ruta_imagen,
          descripcion_imagen: descripcion_imagen
        };
  
        this.catalogosService.updateImagenAdicional(updatedData.id, updatedData).subscribe({
          next: () => {
            this.obtenerImagenesAdicionales();  // Recargar las imágenes después de actualizar
          },
          error: (err) => {
            this.errorMessage = 'Error al actualizar la imagen adicional';
          }
        });
      } else {
        this.errorMessage = 'ID o catalogoId no válido';  // Error si no son válidos
      }
    }
  }
  
*/
  
  
}
  
  


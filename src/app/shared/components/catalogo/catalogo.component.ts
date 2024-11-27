import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { CatalogosService } from '../../../services/sevices.service';
import { CreateCatalogo } from '../../../interfaces/create-catalogo.interface';
import { UpdateCatalogo } from '../../../interfaces/update-catalogo.interface';
import { DeleteCatalogo } from '../../../interfaces/delete-catalogo.interface'; 

@Component({
  selector: 'app-add-listing',
  templateUrl: './catalogo.component.html',
  imports: [
    FormsModule,
    CommonModule,
  ],
  styleUrls: ['./catalogo.component.css'],
  standalone: true  // Hacer el componente standalone
})

export class CatalogoComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];
  catalogoSeleccionado: CreateCatalogo | null = null;
  nuevoCatalogo: CreateCatalogo = { nombre: '', tipo: '', descripcion: '', imagen: '' };
  errorMessage: string = '';

  constructor(private catalogosService: CatalogosService) {}

  ngOnInit(): void {
    this.obtenerCatalogos();
  }

  // Obtener todos los catálogos
  obtenerCatalogos(): void {
    this.catalogosService.findAllCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los catálogos. Intenta nuevamente más tarde.';
      }
    });
  }

  // Crear un nuevo catálogo
 


  // Mostrar formulario para actualizar un catálogo
  mostrarFormularioActualizar(catalogo: CreateCatalogo): void {
    this.catalogoSeleccionado = { ...catalogo }; // Copiar los datos del catálogo seleccionado
  }

// Actualizar catálogo
actualizarCatalogo(): void {
  if (this.catalogoSeleccionado && this.catalogoSeleccionado.id !== undefined) {
    // Asegurarse de que id es un número antes de enviar
    const catalogoParaActualizar: UpdateCatalogo = {
      id: this.catalogoSeleccionado.id,
      nombre: this.catalogoSeleccionado.nombre,
      tipo: this.catalogoSeleccionado.tipo,
      descripcion: this.catalogoSeleccionado.descripcion,
      imagen: this.catalogoSeleccionado.imagen
    };

    this.catalogosService.updateCatalogo(catalogoParaActualizar.id, catalogoParaActualizar).subscribe({
      next: (data) => {
        const index = this.catalogos.findIndex(c => c.id === data.id);
        if (index !== -1) {
          this.catalogos[index] = data; // Actualizar el catálogo en la lista
        }
        this.catalogoSeleccionado = null; // Limpiar formulario
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al actualizar el catálogo. Intenta nuevamente.';
      }
    });
  } else {
    this.errorMessage = 'El catálogo no tiene un ID válido para la actualización.';
  }
}

// Crear un nuevo catálogo
/*crearCatalogo(): void {
  // Pasar el objeto nuevoCatalogo al servicio
  this.catalogosService.createCatalogo(this.nuevoCatalogo).subscribe({
    next: (data) => {
      this.catalogos.push(data); // Añadir el nuevo catálogo a la lista
      this.nuevoCatalogo = { nombre: '', tipo: '', descripcion: '', imagen: '' }; // Limpiar formulario
    },
    error: (err) => {
      this.errorMessage = 'Hubo un error al crear el catálogo. Intenta nuevamente.';
    }
  });
} */


// Eliminar un catálogo
eliminarCatalogo(id: number | undefined): void {
  if (id !== undefined) {  // Verificar si el id no es undefined
    this.catalogosService.deleteCatalogo(id).subscribe({
      next: () => {
        this.catalogos = this.catalogos.filter(catalogo => catalogo.id !== id); // Eliminar de la lista
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al eliminar el catálogo. Intenta nuevamente.';
      }
    });
  } else {
    this.errorMessage = 'El catálogo seleccionado no tiene un ID válido.';
  }
}

  // Cancelar la actualización
  cancelarActualizacion(): void {
    this.catalogoSeleccionado = null;
  }
}

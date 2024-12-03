import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'; // Añadir esta importación explícita.

import { CatalogosService } from '../../../services/sevices.service';
import { CreateCatalogo } from '../../../interfaces/create-catalogo.interface';
import { UpdateCatalogo } from '../../../interfaces/update-catalogo.interface';

@Component({
  selector: 'app-catalogo-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf ],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];
  errorMessage: string = '';
  nuevoCatalogo: CreateCatalogo = {
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
  };
  catalogoSeleccionado: UpdateCatalogo | null = null;
  showConfirmDelete: boolean = false;
  catalogoAEliminar: number | null = null;
  isLoading: boolean = false; // Control de estado de carga

  constructor(private sevicesService: CatalogosService) {}

  ngOnInit(): void {
    this.loadCatalogos();
  }

  loadCatalogos(): void {
    this.sevicesService.getCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un problema al cargar los catálogos. Intenta nuevamente.';
      }
    });
  }

  eliminarCatalogo(id: number): void {
    this.catalogoAEliminar = id;
    this.showConfirmDelete = true;
  }

  confirmarEliminacion(): void {
    if (this.catalogoAEliminar !== null) {
      this.isLoading = true;
      this.sevicesService.deleteCatalogo(this.catalogoAEliminar).subscribe({
        next: () => {
          this.catalogos = this.catalogos.filter(catalogo => catalogo.id !== this.catalogoAEliminar);
          alert('Catálogo eliminado con éxito');
          this.showConfirmDelete = false;
        },
        error: (err) => {
          console.error('Error al eliminar catálogo:', err);
          alert('Hubo un error al eliminar el catálogo');
          this.showConfirmDelete = false;
        }
      });
      this.isLoading = false;
    }
  }

  cancelarConfirmacion(): void {
    this.showConfirmDelete = false;
  }

  mostrarFormularioActualizar(catalogo: CreateCatalogo): void {
    if (catalogo.id !== undefined) {
      this.catalogoSeleccionado = {
        id: catalogo.id,
        nombre: catalogo.nombre,
        tipo: catalogo.tipo,
        descripcion: catalogo.descripcion,
        imagen: catalogo.imagen
      };
    } else {
      alert('El catálogo seleccionado no tiene un ID válido.');
    }
  }

  cancelarActualizacion(): void {
    if (this.catalogoSeleccionado && 
      (this.catalogoSeleccionado.nombre || this.catalogoSeleccionado.tipo || this.catalogoSeleccionado.descripcion || this.catalogoSeleccionado.imagen)) {
      const confirm = window.confirm('Tienes cambios sin guardar. ¿Estás seguro de que deseas cancelar?');
      if (confirm) {
        this.catalogoSeleccionado = null;
      }
    } else {
      this.catalogoSeleccionado = null;
    }
  }

  actualizarCatalogo(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    if (this.catalogoSeleccionado && this.catalogoSeleccionado.id !== undefined) {
      if (!this.catalogoSeleccionado.nombre || !this.catalogoSeleccionado.tipo || !this.catalogoSeleccionado.descripcion || !this.catalogoSeleccionado.imagen) {
        alert('Por favor, completa todos los campos antes de actualizar.');
        this.isLoading = false;
        return;
      }

      const catalogoAActualizar: UpdateCatalogo = {
        id: this.catalogoSeleccionado.id,
        nombre: this.catalogoSeleccionado.nombre,
        tipo: this.catalogoSeleccionado.tipo,
        descripcion: this.catalogoSeleccionado.descripcion,
        imagen: this.catalogoSeleccionado.imagen
      };

      this.sevicesService.putCatalogo(catalogoAActualizar.id, catalogoAActualizar).subscribe({
        next: (catalogoActualizado) => {
          const index = this.catalogos.findIndex(catalogo => catalogo.id === catalogoAActualizar.id);
          if (index !== -1) {
            this.catalogos[index] = catalogoActualizado;
          }
          alert('Catálogo actualizado con éxito');
          this.catalogoSeleccionado = null;
        },
        error: (err) => {
          console.error('Error al actualizar catálogo:', err);
          alert('Hubo un error al actualizar el catálogo');
        }
      });
    }
    this.isLoading = false;
  }
}

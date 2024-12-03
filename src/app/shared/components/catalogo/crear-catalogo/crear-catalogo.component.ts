import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CatalogosService } from '../../../../services/sevices.service';
import { CreateCatalogo } from '../../../../interfaces/create-catalogo.interface';

@Component({
  selector: 'app-crear-catalogo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css']
})
export class CrearCatalogoComponent {
  nuevoCatalogo: CreateCatalogo = {  // Nuevo objeto de catálogo para el formulario
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
  };
  errorMessage: string = '';  // Variable para manejar los errores
  isLoading: boolean = false; // Control de estado de carga

  constructor(private sevicesService: CatalogosService) {}

  // Método para crear un nuevo catálogo
  crearCatalogo(): void {
    if (this.nuevoCatalogo.nombre && this.nuevoCatalogo.tipo && this.nuevoCatalogo.descripcion && this.nuevoCatalogo.imagen) {
      this.isLoading = true;
      this.sevicesService.postCatalogo(this.nuevoCatalogo).subscribe({
        next: (catalogoCreado) => {
          alert('Catálogo creado con éxito');
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al crear catálogo:', err);
          this.errorMessage = 'Hubo un error al crear el catálogo. Intenta nuevamente.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos';
    }
  }

  // Limpiar el formulario después de crear un catálogo
  limpiarFormulario(): void {
    this.nuevoCatalogo = {
      nombre: '',
      tipo: '',
      descripcion: '',
      imagen: '',
    };
    this.isLoading = false;
  }
}

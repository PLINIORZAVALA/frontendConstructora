import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule si lo necesitas
import { CommonModule } from '@angular/common';  // Importa CommonModule si es necesario
import { CatalogosService } from '../../../../services/sevices.service';  // Servicio
import { CreateCatalogo, CreateImgnAdiconal } from '../../../../interfaces/create-catalogo.interface';  // Interfaces

@Component({
  selector: 'app-add-listing-admin',
  standalone: true,  // Componente standalone
  imports: [
    FormsModule,  // Asegúrate de incluir el FormsModule aquí
    CommonModule  // Importa CommonModule si estás usando directivas comunes como `ngIf` o `ngFor`
  ],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AgregarCatalogoComponent {
  // Modelo para el nuevo catálogo
  newCatalogo: CreateCatalogo = {
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    imagenesAdicionales: []
  };

  // Modelo temporal para agregar imágenes adicionales
  newImgAdicional: CreateImgnAdiconal = {
    ruta_imagen: ' ',
    descripcion_imagen: ''
  };

  constructor(private catalogosService: CatalogosService) {}

  /**
   * Agregar una imagen adicional al catálogo
   */
  agregarImagenAdicional() {
    if (this.newImgAdicional.ruta_imagen) {
      this.newCatalogo.imagenesAdicionales?.push({ ...this.newImgAdicional });
      // Limpiar el formulario temporal de imagen adicional
      this.newImgAdicional = { ruta_imagen: '', descripcion_imagen: '' };
    } else {
      alert('Debe ingresar la ruta de la imagen.');
    }
  }

  /**
   * Eliminar una imagen adicional del catálogo
   * @param index - Índice de la imagen en el arreglo
   */
  eliminarImagenAdicional(index: number) {
    this.newCatalogo.imagenesAdicionales?.splice(index, 1);
  }

  /**
   * Guardar el catálogo enviándolo al backend
   */
  guardarCatalogo() {
    // Crear un objeto FormData para manejar datos de formulario y archivos
    const formData = new FormData();
    formData.append('nombre', this.newCatalogo.nombre);
    formData.append('tipo', this.newCatalogo.tipo);
    formData.append('descripcion', this.newCatalogo.descripcion);
    formData.append('imagen', this.newCatalogo.imagen);

    // Iterar sobre las imágenes adicionales y agregarlas al FormData
    this.newCatalogo.imagenesAdicionales?.forEach((imagen, index) => {
      formData.append(`imagenesAdicionales[${index}][ruta_imagen]`, imagen.ruta_imagen);
      if (imagen.descripcion_imagen) {
        formData.append(`imagenesAdicionales[${index}][descripcion_imagen]`, imagen.descripcion_imagen);
      }
    });

    // Llamar al servicio para crear el catálogo
    this.catalogosService.createCatalogo(formData).subscribe({
      next: (response) => {
        console.log('Catálogo creado:', response);
        alert('Catálogo creado exitosamente');
      },
      error: (err) => {
        console.error('Error al crear el catálogo:', err);
        alert('Hubo un error al crear el catálogo.');
      }
    });
  }
}

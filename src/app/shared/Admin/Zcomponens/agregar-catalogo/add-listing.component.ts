import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogosService } from '../../../../services/sevices.service';
import { CreateCatalogo, CreateImgnAdiconal } from '../../../../interfaces/create-catalogo.interface';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddListingComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];
  
  // Inicializar imágenes adicionales como un array vacío
  newCatalogo: CreateCatalogo = {
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    imagenesAdicionales: [],  // Inicializado como un array vacío
  };

  newImgAdicional: CreateImgnAdiconal = {
    ruta_imagen: '',
    descripcion_imagen: '',
  };

  errorMessage: string = '';

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
        this.errorMessage = err.message;
      },
    });
  }

  // Crear el catálogo
  createCatalogo(): void {
    // Asegurarnos de que 'imagenesAdicionales' siempre sea un array antes de enviarlo
    const nuevoCatalogo: CreateCatalogo = {
      ...this.newCatalogo,
      // Verificación: si 'imagenesAdicionales' es 'undefined', lo inicializamos como un array vacío
      imagenesAdicionales: this.newCatalogo.imagenesAdicionales ?? [], 
    };

    // Enviar el catálogo al servicio para ser guardado
    this.sevicesService.postCatalogo(nuevoCatalogo).subscribe(
      (response: any) => {
        console.log('Catalogo Creado:', response);
        this.loadCatalogos();  // Recarga los catálogos después de la creación
      },
      (err: any) => {
        console.error('Error al crear catálogo:', err);
      }
    );
  }

  // Agregar una nueva imagen adicional al catálogo
  addImagenAdicional(): void {
    // Verificar que la ruta de la imagen no esté vacía
    if (this.newImgAdicional.ruta_imagen.trim() !== '') {
      // Asegurarnos de que 'imagenesAdicionales' sea un array antes de realizar la operación
      if (!Array.isArray(this.newCatalogo.imagenesAdicionales)) {
        this.newCatalogo.imagenesAdicionales = []; // Si no es un array, lo inicializamos
      }

      // Añadir la imagen adicional al array de 'imagenesAdicionales'
      this.newCatalogo.imagenesAdicionales.push({
        ruta_imagen: this.newImgAdicional.ruta_imagen.trim(),
        descripcion_imagen: this.newImgAdicional.descripcion_imagen || '',  // Usar valor vacío si no se ingresa descripción
      });

      // Limpiar los campos después de agregar la imagen
      this.newImgAdicional = {
        ruta_imagen: '',
        descripcion_imagen: '',
      };
    } else {
      alert('Por favor ingrese una ruta de imagen válida.');
    }
  }

  // Eliminar una imagen adicional de la lista
  removeImagenAdicional(index: number): void {
    // Asegurarnos de que 'imagenesAdicionales' sea un array antes de realizar la operación
    if (Array.isArray(this.newCatalogo.imagenesAdicionales)) {
      // Eliminar la imagen seleccionada del array
      this.newCatalogo.imagenesAdicionales.splice(index, 1);
    }
  }
}

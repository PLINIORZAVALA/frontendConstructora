import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CatalogosService } from '../../../services/sevices.service';
import { CreateCatalogo } from '../../../interfaces/create-catalogo.interface';
import { UpdateCatalogo } from '../../../interfaces/update-catalogo.interface';  // Importar la interfaz UpdateCatalogo
import { DeleteCatalogo } from '../../../interfaces/delete-catalogo.interface';

@Component({
  selector: 'app-catalogo-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];  // Variable para almacenar los catálogos
  errorMessage: string = '';         // Variable para manejar los errores
  nuevoCatalogo: CreateCatalogo = {  // Nuevo objeto de catálogo para el formulario
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
  };
  catalogoSeleccionado: UpdateCatalogo | null = null;  // Objeto para el catálogo seleccionado para actualizar

  constructor(private sevicesService: CatalogosService) {}

  ngOnInit(): void {
    this.loadCatalogos();  // Llamamos a la función para cargar los catálogos cuando el componente se inicializa
  }

  // Método para cargar los catálogos
  loadCatalogos(): void {
    this.sevicesService.getCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;  // Almacenamos los datos recibidos en la variable catalogos
      },
      error: (err) => {
        this.errorMessage = err.message;  // Mostramos el mensaje de error en caso de fallo
      }
    });
  }

  // Método para eliminar un catálogo
  eliminarCatalogo(id: number): void {
    this.sevicesService.deleteCatalogo(id).subscribe({
      next: () => {
        this.catalogos = this.catalogos.filter(catalogo => catalogo.id !== id);  // Filtramos el catálogo eliminado
        alert('Catálogo eliminado con éxito');
      },
      error: (err) => {
        console.error('Error al eliminar catálogo:', err);
        alert('Hubo un error al eliminar el catálogo');
      }
    });
  }

  // Método para crear un nuevo catálogo
  crearCatalogo(): void {
    if (this.nuevoCatalogo.nombre && this.nuevoCatalogo.tipo && this.nuevoCatalogo.descripcion && this.nuevoCatalogo.imagen) {
      this.sevicesService.postCatalogo(this.nuevoCatalogo).subscribe({
        next: (catalogoCreado) => {
          this.catalogos.push(catalogoCreado);  // Agregar el catálogo creado a la lista de catálogos
          this.nuevoCatalogo = {  // Limpiar el formulario
            nombre: '',
            tipo: '',
            descripcion: '',
            imagen: '',
          };
          alert('Catálogo creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear catálogo:', err);
          alert('Hubo un error al crear el catálogo');
        }
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

// Método para actualizar un catálogo
actualizarCatalogo(): void {
  if (this.catalogoSeleccionado && this.catalogoSeleccionado.id !== undefined) {
    const catalogoAActualizar: UpdateCatalogo = {
      id: this.catalogoSeleccionado.id,  // Ahora aseguramos que id no es undefined
      nombre: this.catalogoSeleccionado.nombre,
      tipo: this.catalogoSeleccionado.tipo,
      descripcion: this.catalogoSeleccionado.descripcion,
      imagen: this.catalogoSeleccionado.imagen,
    };
  
    this.sevicesService.putCatalogo(catalogoAActualizar.id, catalogoAActualizar).subscribe({
      next: (catalogoActualizado) => {
        const index = this.catalogos.findIndex(catalogo => catalogo.id === catalogoAActualizar.id);
        if (index !== -1) {
          this.catalogos[index] = catalogoActualizado;
        }
        alert('Catálogo actualizado con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar catálogo:', err);
        alert('Hubo un error al actualizar el catálogo');
      }
    });
  } else {
    alert('No se ha seleccionado un catálogo válido para actualizar');
  }
}

// Método para mostrar el formulario de actualización con los datos del catálogo seleccionado
mostrarFormularioActualizar(catalogo: CreateCatalogo): void {
  if (catalogo.id !== undefined) {
    this.catalogoSeleccionado = { 
      id: catalogo.id,  // Aseguramos que id es un número
      nombre: catalogo.nombre,
      tipo: catalogo.tipo,
      descripcion: catalogo.descripcion,
      imagen: catalogo.imagen
    };
  } else {
    alert('El catálogo no tiene un ID válido para actualizar.');
  }
}



  // Método para cancelar la actualización
  cancelarActualizacion(): void {
    this.catalogoSeleccionado = null;  // Ocultar el formulario de actualización
  }
}

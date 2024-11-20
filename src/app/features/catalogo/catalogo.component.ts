import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosService } from '../../../app/services/sevices.service';
import { CreateCatalogo } from '../../interfaces/create-catalogo.interface';

// Extendemos la interfaz para incluir la propiedad adicional
interface CatalogoConEstado extends CreateCatalogo {
  mostrarImagenesAdicionales: boolean;
}

@Component({
  selector: 'app-catalogo-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent_user implements OnInit {
  catalogos: CatalogoConEstado[] = []; // Lista completa de catálogos con la propiedad adicional
  visibleCatalogos: CatalogoConEstado[] = []; // Lista visible (limitada)
  errorMessage: string = ''; // Mensaje de error
  mostrarTodo: boolean = false; // Estado de visualización

  constructor(private sevicesService: CatalogosService) {}

  ngOnInit(): void {
    this.loadCatalogos(); // Cargar datos al inicializar
  }

  loadCatalogos(): void {
    this.sevicesService.getCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data.map(catalogo => ({
          ...catalogo,
          imagen: this.getImagePath(catalogo.imagen),
          mostrarImagenesAdicionales: false, // Agregar el estado para las imágenes adicionales
        }));
        this.actualizarVista(); // Actualizar lista visible
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  getImagePath(nombreImagen: string): string {
    // Asegúrate de que el path sea accesible desde el navegador
    return `images/catalogo/${nombreImagen}`;
  }

  actualizarVista(): void {
    this.visibleCatalogos = this.mostrarTodo
      ? this.catalogos
      : this.catalogos.slice(0, 2); // Muestra solo dos al inicio
  }

  toggleMostrarTodo(): void {
    this.mostrarTodo = !this.mostrarTodo; // Alternar entre ver más/ver menos
    this.actualizarVista();
  }

  // Método para alternar la visualización de imágenes adicionales de cada catálogo
  toggleImagenesAdicionales(catalogo: CatalogoConEstado): void {
    catalogo.mostrarImagenesAdicionales = !catalogo.mostrarImagenesAdicionales;
  }
}

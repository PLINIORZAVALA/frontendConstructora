import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosService } from '../../../app/services/sevices.service';
import { CreateCatalogo } from '../../../app/interfaces/create-catalogo.interface';

@Component({
  selector: 'app-catalogo-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent_user implements OnInit {
  catalogos: CreateCatalogo[] = []; // Lista completa de catálogos
  visibleCatalogos: CreateCatalogo[] = []; // Lista visible (limitada)
  errorMessage: string = ''; // Mensaje de error
  mostrarTodo: boolean = false; // Estado de visualización

  constructor(private sevicesService: CatalogosService) {}

  ngOnInit(): void {
    this.loadCatalogos(); // Cargar datos al inicializar
  }

  loadCatalogos(): void {
    this.sevicesService.getCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;
        this.actualizarVista(); // Actualizar lista visible
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
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

  verDetalles(id: number): void {
    console.log(`Mostrando detalles del catálogo con ID: ${id}`);
    // Lógica para mostrar detalles
  }
}

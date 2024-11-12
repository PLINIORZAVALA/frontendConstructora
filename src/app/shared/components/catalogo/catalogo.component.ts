import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SevicesService } from '../../../services/sevices.service';
import { Catalogo } from '../../../interfaces/create-catalogo.interface';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})

export class CatalogoComponent implements OnInit {
  catalogos: Catalogo[] = [];  // Variable para almacenar los datos
  errorMessage: string = '';    // Variable para manejar errores

  constructor(private sevicesService: SevicesService) {}

  ngOnInit(): void {
    this.loadCatalogos();  // Llamamos a la función para cargar los datos cuando el componente se inicializa
  }

  loadCatalogos(): void {
    this.sevicesService.getCatalogo().subscribe({
      next: (data) => {
        this.catalogos = data;  // Almacenamos los datos recibidos en la variable catalogos
      },
      error: (err) => {
        this.errorMessage = err.message;  // Mostramos el mensaje de error en caso de fallo
      }
    });
  }
}
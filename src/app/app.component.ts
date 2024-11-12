import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ProjectComponent } from "./features/project/project.component";
import { AboutComponent } from './features/about/about.component';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { Catalogo } from './interfaces/create-catalogo.interface';
import { SevicesService } from './services/sevices.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    ProjectComponent,
    CatalogoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

  export class AppComponent implements OnInit {
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
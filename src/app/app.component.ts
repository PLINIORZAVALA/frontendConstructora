import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CatalogoComponent_user } from './features/catalogo/catalogo.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ProjectComponent } from "./features/project/project.component";
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { CreateCatalogo } from './interfaces/create-catalogo.interface';
import { CatalogosService } from './services/sevices.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CatalogoComponent_user,
    FooterComponent,
    HeaderComponent,
    ProjectComponent,
    CatalogoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Cambié de 'styleUrl' a 'styleUrls' (en plural)
})
export class AppComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];  // Variable para almacenar los datos
  errorMessage: string = '';    // Variable para manejar errores

  constructor(private sevicesService: CatalogosService) {}

  ngOnInit(): void {
    this.loadCatalogos();  // Llamamos a la función para cargar los datos cuando el componente se inicializa
  }

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
}

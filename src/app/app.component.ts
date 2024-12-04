import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CatalogoComponent_user } from './features/catalogo/catalogo.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ProjectComponent } from "./features/project/project.component";
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { CreateCatalogo } from './interfaces/create-catalogo.interface';
import { CatalogosService } from './services/sevices.service';
import { CrearCatalogoComponent } from './shared/components/catalogo/crear-catalogo/crear-catalogo.component';

import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';

import { CitasComponent } from './citas/citas.component';
import { AdmCitasComponent } from './citas/adm-citas/adm-citas.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CatalogoComponent_user,
    FooterComponent,
    HeaderComponent,
    ProjectComponent,
    
    CatalogoComponent,
    CrearCatalogoComponent,

    CreateUserComponent,

    LoginComponent,

    CitasComponent,
    AdmCitasComponent,

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

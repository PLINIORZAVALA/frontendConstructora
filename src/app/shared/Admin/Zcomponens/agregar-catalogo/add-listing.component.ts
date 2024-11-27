import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCatalogo } from '../../../../interfaces/create-catalogo.interface';
import { CatalogosService } from '../../../../services/sevices.service';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddListingComponent implements OnInit {
  catalogos: CreateCatalogo[] = [];
  newCatalogo = {
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    imagenesAdicionales: '',
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

  createCatalogo(): void {
    const nuevoCatalogo = {
      ...this.newCatalogo,
      imagenesAdicionales: this.newCatalogo.imagenesAdicionales.split(',').map(url => ({
        ruta_imagen: url.trim(),  // Convertimos la URL en el campo 'ruta_imagen' de ImagenCatalogo
        descripcion_imagen: '',  // Puedes dejarla vacía o agregar algún valor
      })),
    };
  
    this.sevicesService.postCatalogo(nuevoCatalogo).subscribe(
      (response: any) => {
        console.log('Success:', response);
        this.loadCatalogos();  // Recarga los catálogos después de la creación
      },
      (err: any) => {
        console.error('Error:', err);
      }
    );
  }
  
}

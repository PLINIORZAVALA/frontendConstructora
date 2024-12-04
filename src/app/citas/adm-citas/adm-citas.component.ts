import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/citas/citas.service';
import { Cita } from '../../interfaces/citas/cita.interface';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-adm-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Agregar CommonModule
  templateUrl: './adm-citas.component.html',
  styleUrls: ['./adm-citas.component.css']
})
export class AdmCitasComponent implements OnInit {
  citas: Cita[] = [];
  cita: Cita = { nombre: '', apellido: '', email: '', fecha: new Date(), motivo: '', estado: 'pendiente' };
  editing: boolean = false; // Indica si se está editando una cita

  constructor(private citasService: CitaService) {}

  ngOnInit(): void {
    this.getCitas(); // Obtener todas las citas al cargar el componente
  }

  // Obtener todas las citas
  getCitas(): void {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data;
    });
  }

  // Crear o actualizar una cita
  saveCita(): void {
    const nuevaCita: Cita = {
      ...this.cita,
      telefono: this.cita.telefono || '',  
      usuario: this.cita.usuario || 'usuario_default',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    if (this.editing) {
      if (this.cita.id !== undefined) { // Asegúrate de que el id esté disponible para actualización
        this.citasService.updateCita(this.cita.id, nuevaCita).subscribe(() => {
          this.getCitas();  // Volver a cargar las citas después de la actualización
          this.resetForm();  // Limpiar el formulario
        });
      } else {
        console.error('ID no disponible para actualizar');
      }
    } else {
      this.citasService.createCita(nuevaCita).subscribe(() => {
        this.getCitas();  // Volver a cargar las citas después de la creación
        this.resetForm();  // Limpiar el formulario
      });
    }
  }

  // Editar una cita (cargar los datos en el formulario)
  editCita(cita: Cita): void {
    this.cita = { ...cita }; // Copiar los datos de la cita al formulario
    this.editing = true;
  }

  // Eliminar una cita
  deleteCita(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID no disponible para eliminar la cita');
      return;
    }
  
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      this.citasService.deleteCita(id).subscribe(() => {
        this.getCitas();  // Volver a cargar las citas después de eliminar
      });
    }
  }
  

  // Función para resetear el formulario
  resetForm(): void {
    this.cita = { nombre: '', apellido: '', email: '', fecha: new Date(), motivo: '', estado: 'pendiente' };
    this.editing = false;
  }
}

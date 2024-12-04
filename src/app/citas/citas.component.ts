import { Component } from '@angular/core';
import { CitaService } from '../services/citas/citas.service';
import { Cita } from '../interfaces/citas/cita.interface';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  cita: Cita = { nombre: '', apellido: '', email: '', fecha: new Date(), motivo: '', estado: 'pendiente' };
  isLoading: boolean = false;

  constructor(private citasService: CitaService) {}

  // Método para guardar la nueva cita
  saveCita(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    // Verificar que todos los campos estén completos
    if (!this.cita.nombre || !this.cita.apellido || !this.cita.email || !this.cita.fecha || !this.cita.motivo || !this.cita.estado) {
      alert('Por favor, completa todos los campos antes de guardar.');
      this.isLoading = false;
      return;
    }

    // Crear la cita
    this.citasService.createCita(this.cita).subscribe({
      next: (response: Cita) => {
        alert('Cita creada con éxito');
        this.isLoading = false;
        this.resetForm();  // Limpiar el formulario
      },
      error: (err: any) => {
        console.error('Error al crear la cita:', err);
        alert('Hubo un error al crear la cita');
        this.isLoading = false;
      }
    });
  }

  // Función para resetear el formulario
  resetForm(): void {
    this.cita = { nombre: '', apellido: '', email: '', fecha: new Date(), motivo: '', estado: 'pendiente' };
  }
}

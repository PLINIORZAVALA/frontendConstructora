import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/citas/citas.service';
import { Cita } from '../../interfaces/citas/cita.interface';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adm-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adm-citas.component.html',
  styleUrls: ['./adm-citas.component.css']
})
export class AdmCitasComponent implements OnInit {
  citas: Cita[] = []; // Lista de todas las citas
  citaSeleccionada: Cita | null = null;  // Cita seleccionada para editar
  isLoading: boolean = false;  // Indicador de carga
  editing: boolean = false;  // Indica si se está editando una cita

  constructor(private citasService: CitaService) {}

  ngOnInit(): void {
    this.getCitas(); // Obtener todas las citas al cargar el componente
  }

  // Método para actualizar cita
  saveCita(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    if (this.citaSeleccionada && this.citaSeleccionada.id !== undefined) {
      if (!this.citaSeleccionada.nombre || !this.citaSeleccionada.apellido ||
          !this.citaSeleccionada.email || !this.citaSeleccionada.fecha ||
          !this.citaSeleccionada.motivo || !this.citaSeleccionada.estado) {
        alert('Por favor, completa todos los campos antes de actualizar.');
        this.isLoading = false;
        return;
      }

      const citaAActualizar: Cita = {
        id: this.citaSeleccionada.id,
        nombre: this.citaSeleccionada.nombre,
        apellido: this.citaSeleccionada.apellido,
        email: this.citaSeleccionada.email,
        telefono: this.citaSeleccionada.telefono,
        fecha: this.citaSeleccionada.fecha,
        motivo: this.citaSeleccionada.motivo,
        estado: this.citaSeleccionada.estado,
      };

      // Comprobar si 'id' es un número antes de pasar a updateCita
      if (typeof citaAActualizar.id === 'number') {
        this.citasService.updateCita(citaAActualizar.id, citaAActualizar).subscribe({
          next: (response: Cita) => {
            alert('Cita actualizada con éxito');
            this.isLoading = false;
            this.getCitas(); // Refrescar la lista de citas
            this.cancelarEdicion(); // Cancelar la edición al terminar
          },
          error: (err: any) => {
            console.error('Error al actualizar la cita:', err);
            alert('Hubo un error al actualizar la cita');
            this.isLoading = false;
          }
        });
      } else {
        alert('El ID de la cita no es válido');
        this.isLoading = false;
      }
    } else {
      alert('Por favor, selecciona una cita para actualizar');
      this.isLoading = false;
    }
  }

  // Obtener todas las citas
  getCitas(): void {
    this.citasService.getCitas().subscribe((data) => {
      this.citas = data;
    });
  }

  // Editar una cita (cargar los datos en el formulario)
  editCita(cita: Cita): void {
    this.citaSeleccionada = { ...cita };  // Cargar los datos de la cita seleccionada
    this.editing = true;      // Activar modo de edición
  }

  // Eliminar una cita
  deleteCita(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID no disponible para eliminar la cita');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      this.citasService.deleteCita(id).subscribe(() => {
        this.getCitas();  // Refrescar la lista de citas después de eliminar
      });
    }
  }

  // Función para cancelar la edición y cerrar el formulario de actualización
  cancelarEdicion(): void {
    this.citaSeleccionada = null;  // Restablecer la cita seleccionada
    this.editing = false;  // Desactivar el modo de edición
  }
}

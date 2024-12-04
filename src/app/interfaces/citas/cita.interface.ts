export interface Cita {
  id?: number;            // id opcional
  nombre: string;
  apellido: string;
  email: string;
  fecha: Date;
  motivo: string;
  estado: string;
  telefono?: string;
  usuario_id?: number;    // Cambié 'usuario' a 'usuario_id' de tipo number
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

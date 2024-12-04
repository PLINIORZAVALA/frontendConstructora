export interface Cita {
    id?: number;           // id opcional
    nombre: string;
    apellido: string;
    email: string;
    fecha: Date;
    motivo: string;
    estado: string;
    telefono?: string;
    usuario?: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
  }
  
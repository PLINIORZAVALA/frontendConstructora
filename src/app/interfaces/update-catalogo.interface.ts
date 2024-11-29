export interface UpdateCatalogo {
  id: number;  // Asegúrate de que 'id' esté definido aquí
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;
}


export interface UpdateImgnAdiconal {
  ruta_imagen: string;  // URL o ruta de la imagen
  descripcion_imagen?: string;  // Descripción opcional de la imagen
}
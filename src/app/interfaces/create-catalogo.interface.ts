export interface CreateImgnAdiconal {
  id?: number;  // Hacer que id sea opcional
  ruta_imagen: string;  // URL o ruta de la imagen
  descripcion_imagen?: string;  // Descripción opcional de la imagen
}

export interface CreateCatalogo {
  id?: number;  // Hacer que id sea opcional
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;  // Imagen principal
  imagenesAdicionales?: CreateImgnAdiconal[];  // Imágenes adicionales (relación uno-a-muchos)
}

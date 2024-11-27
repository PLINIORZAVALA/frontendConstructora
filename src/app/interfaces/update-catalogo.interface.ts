
export interface UpdateCatalogo {
  id: number;  // Asegúrate de incluir 'id' aquí
  nombre?: string;
  tipo?: string;
  descripcion?: string;
  imagen?: string;  // La imagen principal puede ser opcional en una actualización
  imagenesAdicionales?: UpdateImgnAdiconal[];  // Se pueden añadir o quitar imágenes adicionales
}

export interface UpdateImgnAdiconal {
  ruta_imagen: string;  // URL o ruta de la imagen
  descripcion_imagen?: string;  // Descripción opcional de la imagen
}
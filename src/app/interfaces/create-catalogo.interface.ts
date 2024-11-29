export interface CreateImgnAdiconal {
  id?: number;
  catalogoId?: number;  // Hacer que catalogoId sea opcional
  ruta_imagen: string;
  descripcion_imagen?: string;
}

export interface CreateCatalogo {
  id?: number;  // Hacer que id sea opcional
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;  // Imagen principal
  imagenesAdicionales?: CreateImgnAdiconal[];  // Imágenes adicionales (relación uno-a-muchos)
}

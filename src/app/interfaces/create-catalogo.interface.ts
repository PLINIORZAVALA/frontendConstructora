export interface CreateCatalogo {
    id?: number;  // Hacer que id sea opcional
    nombre: string;
    tipo: string;
    descripcion: string;
    imagen: string; // Imagen principal
    imagenesAdicionales?: ImagenCatalogo[];  // Imágenes adicionales (relación uno-a-muchos)
  }
  
  export interface ImagenCatalogo {
    id?: number;
    ruta_imagen: string;  // URL o ruta de la imagen
    descripcion_imagen?: string;  // Descripción opcional de la imagen
  }
  
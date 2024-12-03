import { ImagenCatalogo } from "./create-catalogo.interface";

export interface UpdateCatalogo {
  id: number;  // Asegúrate de incluir 'id' aquí
  nombre?: string;
  tipo?: string;
  descripcion?: string;
  imagen?: string;  // La imagen principal puede ser opcional en una actualización
  imagenesAdicionales?: ImagenCatalogo[];  // Se pueden añadir o quitar imágenes adicionales
}

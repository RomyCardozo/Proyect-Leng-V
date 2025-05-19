export interface ServicioI {
  id: string;          // ID único del servicio
  descripcion: string;  // Detalle del servicio (Ej: "Manicura básica con esmalte")
  precio: string;       // Costo del servicio
  estado: 'activo' | 'descontinuado'; // Estado del servicio
}

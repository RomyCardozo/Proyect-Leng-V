import { Timestamp } from "@angular/fire/firestore";

export interface CitaI {
  id: string;
  clienteId: string;
  servicioId: string;
  usuarioId: string;
  fecha: string; // Cambiado a Date
  estado?: 'pendiente' | 'completada' | 'cancelada';



  clienteNombre?: string;    // Agregado
  usuarioNombre?: string;    // Agregado
  servicioNombre?: string;   // Agregado
}

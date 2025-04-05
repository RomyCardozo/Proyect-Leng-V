import { Timestamp } from "@angular/fire/firestore";

export interface Cita {
  id?: string;
  clienteId: string;
  servicioId: string;
  usuarioId: string;
  fecha: Timestamp;
  estado: 'pendiente' | 'completada' | 'cancelada';
  clienteNombre?: string;    // Agregado
  usuarioNombre?: string;    // Agregado
  servicioNombre?: string;   // Agregado
}

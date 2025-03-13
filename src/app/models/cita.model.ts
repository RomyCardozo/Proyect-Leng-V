export interface Cita {
  id?: string;        // ID único de la cita
  clienteId: string;  // Relación con el cliente (ID)
  servicioId: string; // Tipo de servicio (ID)
  empleadoId: string; // Relación con el empleado (ID)
  fecha: string;      // Día y hora de la cita (YYYY-MM-DD HH:mm)
  estado: 'pendiente' | 'completada' | 'cancelada'; // Estado de la cita
}

export interface Recordatorio {
  id?: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'completado';
  prioridad: 'baja' | 'media'| 'alta';
}

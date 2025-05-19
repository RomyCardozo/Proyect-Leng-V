export interface RecordatorioI {
  id: string;
  descripcion: string;
  fecha: string;
  prioridad: 'Baja' | 'Media'| 'Alta';
}

export interface Cliente {
  id?: string; // ID generado por Firestore
  nombre: string;
  apellido: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
}

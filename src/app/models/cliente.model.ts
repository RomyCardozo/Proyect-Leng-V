export interface Cliente {
  id?: string; // ID generado por Firestore
  nombre: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
}

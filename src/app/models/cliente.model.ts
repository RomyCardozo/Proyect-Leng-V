export interface ClienteI {
  id: string; // ID generado por Firestore
  nombre: string;
  apellido: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
}

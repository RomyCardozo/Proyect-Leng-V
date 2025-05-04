export interface UsuarioI{
  id: string;
  nombre: string;
  email: string;
  clave: string;
  estado: 'activo' | 'inactivo';
}

import { Component, OnInit } from '@angular/core';
import { t } from '@angular/core/weak_ref.d-Bp6cSy-X';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UsuarioI } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {
  usuarios: UsuarioI[] = []; // Array de usuarios
  newUser!: UsuarioI; // Nuevo usuario
  user!: UsuarioI; // Usuario actual
  searchTerm: string = '';
  fltroEstado: 'todos' | 'activo' | 'inactivo' = 'activo';

  constructor(private firestoreService: FirestoreService) {
    this.ObtenerUsuarios();
    this.initUser(); // Inicializa el nuevo usuario
  }

  ngOnInit() {}

  initUser() {
    this.newUser = {
      nombre: '',
      email: '',
      clave: '',
      estado: 'activo',
      id: this.firestoreService.createIDDoc(),
    };
  }

  ObtenerUsuarios() {
    this.firestoreService
      .obtenerColecciones<UsuarioI>('usuario')
      .subscribe((data) => {
        if (data) {
          this.usuarios = data;
        }
      });
  }

  editUser(usuario: UsuarioI) {
    this.newUser = usuario;
  }
  async deleteUser(usuario: UsuarioI) {
    await this.firestoreService.deleteDocument('usuario', usuario.id);
  }

  async saveUser() {
    await this.firestoreService.createDocumentoID(this.newUser,'usuario',this.newUser.id);
    this.initUser(); // Reinicia el nuevo usuario
  }
}

import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = []; // Array de usuarios
  searchTerm: string = '';
  fltroEstado: 'todos' | 'activo' | 'inactivo' = 'activo';

  constructor(private firestoreService: FirestoreService) {
    this.ObtenerUsuarios();
  }

  ngOnInit() {}

  ObtenerUsuarios() {
    this.firestoreService
      .obtenerColecciones<Usuario>('usuario')
      .subscribe((data) => {
        if (data) {
          this.usuarios = data;
        }
      });
  }

  eliminarUsuario() {
    console.log('Usuario eliminado');
  }

  editarUsuario(){
    console.log('Usuario editado');
  }
}

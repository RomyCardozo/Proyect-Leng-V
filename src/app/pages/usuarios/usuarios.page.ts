import { Component, OnInit } from '@angular/core';
import { t } from '@angular/core/weak_ref.d-Bp6cSy-X';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UsuarioFormComponent } from 'src/app/components/usuario-form/usuario-form.component';
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

  constructor(
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.ObtenerUsuarios();
    this.initUser(); // Inicializa el nuevo usuario
  }

  ngOnInit() {}

  // Método para mostrar un mensaje de toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

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
    const alert = await this.alertController.create({
      header: '¿Estas seguro?',
      message: '¿Quieres eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.firestoreService.deleteDocument('usuario', usuario.id);
            this.presentToast('Usuario eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async saveUser() {
    await this.firestoreService.createDocumentoID(
      this.newUser,
      'usuario',
      this.newUser.id
    );
    this.initUser(); // Reinicia el nuevo usuario
    this.presentToast('Cliente guardado correctamente');
  }

  //inicializa esNuevo a false


  //este es para abrir el modal de usuario
  async abrirFormulario(usuario?: UsuarioI) {
    const usuarioInicializado = usuario
      ? { ...usuario }
      : {
          nombre: '',
          email: '',
          clave: '',
          estado: 'activo',
          id: this.firestoreService.createIDDoc(),
        };
    const modal = await this.modalCtrl.create({
      component: UsuarioFormComponent,
      componentProps: { usuario: usuarioInicializado },
      cssClass: 'custom-modal',
      presentingElement: await this.modalCtrl.getTop(),

    });

    await modal.present();

    // Espera a que el modal se cierre y obtiene los datos devueltos
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (usuario) {
        this.newUser = data;
        this.saveUser();
      } else {
        this.newUser = data;
        this.saveUser();
      }
    }
  }
}

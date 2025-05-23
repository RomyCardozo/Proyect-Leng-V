import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { signOut } from 'firebase/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Citas', url: '/citas', icon: 'calendar' },
    { title: 'Servicios', url: '/servicios', icon: 'cut' },
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Usuarios', url: '/usuarios', icon: 'person' },
    { title: 'Recordatorios', url: '/recordatorios', icon: 'notifications' },
  ];
  constructor(private menuCtrl: MenuController, private auth: Auth, private router: Router, private alertController: AlertController) {}

  cerrarMenu() {
    const alert = this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirmar cancelado');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cerrarSesion();
          },
        },
      ],
    });
    alert.then((alert) => alert.present());
  }
  cerrarSesion() {
    // Aquí puedes agregar lógica para cerrar sesión
    this.menuCtrl.close(); // Cierra el menú
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    // Aquí puedes agregar lógica para cerrar sesión
  }
}

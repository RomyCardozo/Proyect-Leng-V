import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
    { title: 'Recordatorios', url: '/recordatorios', icon: 'notifications' },
    { title: 'Usuarios', url: '/usuarios', icon: 'person' }
  ];
    constructor(private menuCtrl: MenuController) {}

    cerrarMenu() {
      this.menuCtrl.close(); // Cierra el menú
      // Aquí puedes agregar lógica para cerrar sesión

    }
}

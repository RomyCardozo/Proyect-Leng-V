import { Component } from '@angular/core';
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
    constructor() {}
}

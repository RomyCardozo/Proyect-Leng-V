import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú en la página de inicio de sesión

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Deshabilitar el menú al entrar a la página de inicio de sesión
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú al salir de la página de inicio de sesión
  }

}

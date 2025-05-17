import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {
  resetUsuario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rt: Router,
    private auth: Auth,
    private toast: ToastController,
    private menuCtrl: MenuController
  ) {
    this.resetUsuario = this.fb.group({
      email: ['', Validators.required],
    });
  }

  presentToast = async (message: string) => {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    toast.present();
  };

  ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú en la página de inicio de sesión
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Deshabilitar el menú al entrar a la página de inicio de sesión
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú al salir de la página de inicio de sesión
  }

  recuperarClave = () => {
    const email = this.resetUsuario.value.email;
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        // Password reset email sent!
        this.rt.navigate(['/login']);
        this.presentToast(
          'Se ha enviado un correo para restablecer la contraseña'
        );
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
}

import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  iniciarUsuario: FormGroup;

  errorMessage = '';

  constructor(
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private rt: Router,
    private auth: Auth
  ) {
    this.iniciarUsuario = this.fb.group({
      email: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú en la página de inicio de sesión
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Deshabilitar el menú al entrar a la página de inicio de sesión
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú al salir de la página de inicio de sesión
  }
  logIn = () => {
    const email = this.iniciarUsuario.value.email;
    const clave = this.iniciarUsuario.value.clave;
    signInWithEmailAndPassword(this.auth, email, clave)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.rt.navigate(['/home']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/invalid-credential':
            this.errorMessage = 'Credenciales inválidas';
            break;

          default:
            this.errorMessage = errorMessage;
            break;
        }
      });
// para que se vacie el formulario al iniciar sesion
    this.iniciarUsuario = this.fb.group({
      email: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
    });
  };
}

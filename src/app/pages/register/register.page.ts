import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UsuarioI } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registrarUsuarios!: FormGroup;

  constructor(
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private rt: Router,
    private auth: Auth,
    private firestore: FirestoreService,
  ) {
     this.registrarUsuarios = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Deshabilitar el menú al entrar a la página de inicio de sesión
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú al salir de la página de inicio de sesión
  }

  registrar = () => {
    const nombre = this.registrarUsuarios.value.nombre;
    const email = this.registrarUsuarios.value.email;
    const clave = this.registrarUsuarios.value.clave;
    createUserWithEmailAndPassword(this.auth, email, clave)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;

        //crear objeto usuario
        const nuevoUsuario : UsuarioI ={
          nombre: nombre,
          email: email,
          clave: clave,
          id: user.uid,
          estado: 'activo'
        }
        //guardar en la coleccion usuario

        this.firestore.createDocumentoID(nuevoUsuario, 'usuario', user.uid).then(() => {
        this.verificarCorreo(userCredential.user.auth.currentUser);
        this.rt.navigate(['/login']);
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  verificarCorreo = (currentUser: any) => {
    sendEmailVerification(currentUser).then(() => {
      console.log('envio correcto');
    });
  };
}

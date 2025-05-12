import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UsuarioI } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  standalone: false,
})
export class UsuarioFormComponent  implements OnInit {
@Input() usuario!: UsuarioI;

  constructor(private modalCtrl : ModalController, private firestoreService: FirestoreService) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }
//guardar usuario (nuevo o editado)
  async save() {
    if(!this.usuario.id) {
      this.usuario.id = this.firestoreService.createIDDoc(); // Genera un ID si es nuevo usuario
    }
    await this.firestoreService.createDocumentoID(this.usuario, 'usuario', this.usuario.id);
    this.modalCtrl.dismiss(this.usuario); // Cerrar modal y pasar datos
  }
}

import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ClienteI } from 'src/app/models/cliente.model';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  standalone: false,
})
export class ClienteFormComponent  implements OnInit {
  @Input() cliente!: ClienteI;
  constructor(private modalCtrl: ModalController,
    private firestoreService: FirestoreService) { }

  ngOnInit() {
    console.log(this.cliente);
  }
  close() {
    this.modalCtrl.dismiss();
  }

  // Guardar cliente (nuevo o editado)
  async save() {
    if (!this.cliente.id) {
      this.cliente.id = this.firestoreService.createIDDoc(); // Genera un ID si es nuevo cliente
    }

    await this.firestoreService.createDocumentoID(this.cliente, 'clientes', this.cliente.id);
    this.modalCtrl.dismiss(this.cliente); // Cerrar modal y pasar datos

}
}

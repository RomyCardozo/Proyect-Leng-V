import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { ServicioI } from 'src/app/models/servicio.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  standalone: false,
})
export class ServiceFormComponent implements OnInit {
  @Input() servicio!: ServicioI; // Cambia el tipo a 'any' o define un tipo específico

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss(); // Cerrar el modal
  }

  async save() {
    if (!this.servicio.id) {
      this.servicio.id = this.firestoreService.createIDDoc(); // Genera un ID si es nuevo servicio
    }

    await this.firestoreService.createDocumentoID(
      this.servicio,
      'servicio',
      this.servicio.id
    );
    this.modalCtrl.dismiss(this.servicio); // Cerrar modal y pasar datos
  }
}

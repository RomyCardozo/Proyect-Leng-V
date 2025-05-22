import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { CitaI } from 'src/app/models/cita.model';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: false,
})
export class CitaFormComponent implements OnInit {
  @Input() cita!: CitaI; // primer paso
  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss(); // cerrar el modal
  }

  // Guardar cita (nuevo o editado)
  async save() {
    if (!this.cita.id) {
      this.cita.id = this.firestoreService.createIDDoc(); // Genera un ID si es nueva cita
    }
    await this.firestoreService.createDocumentoID(
      this.cita,
      'citas',
      this.cita.id
    );
    this.modalCtrl.dismiss(this.cita); // Cerrar modal y pasar datos
  }
}

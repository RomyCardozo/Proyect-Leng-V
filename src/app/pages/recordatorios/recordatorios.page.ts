import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { RecordatorioI } from 'src/app/models/recordatorio.model';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.page.html',
  styleUrls: ['./recordatorios.page.scss'],
  standalone: false,
})
export class RecordatoriosPage implements OnInit {
  recordatorios: RecordatorioI[] = [];
  newRecordatorio!: RecordatorioI;
  record!: RecordatorioI;
  constructor(private firestoreService: FirestoreService) {
    this.listarRecordatorios();
    this.initRecordatorio();
  }

  initRecordatorio(){
    this.newRecordatorio= {
      descripcion: '',
      fecha: '',
      prioridad: 'Baja',
      id: this.firestoreService.createIDDoc(),
    }
  }

  ngOnInit() {}

  editRecordatorio(recordatorio: RecordatorioI) {
    this.newRecordatorio = recordatorio;
  }

  async deleteRecordatorio(recordatorio: RecordatorioI){
    await this.firestoreService.deleteDocument('recordatorios', recordatorio.id);
  }

async save(){
  await this.firestoreService.createDocumentoID(this.newRecordatorio, 'recordatorios', this.newRecordatorio.id);
  this.initRecordatorio();
}


  listarRecordatorios() {
    this.firestoreService
      .obtenerColecciones<RecordatorioI>('recordatorios')
      .subscribe((data) => {
        if (data) {
          this.recordatorios = data;
          console.log(this.recordatorios);
        }
      });
  }

  getColor(prioridad: 'Alta' | 'Media' | 'Baja'): string {
    switch (prioridad) {
      case 'Alta':
        return 'danger';
      case 'Media':
        return 'warning';
      case 'Baja':
        return 'success';
      default:
        return 'medium';
    }
  }
}

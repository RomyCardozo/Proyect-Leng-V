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
  constructor(private firestoreService: FirestoreService) {
    this.listarRecordatorios();
  }

  ngOnInit() {}

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

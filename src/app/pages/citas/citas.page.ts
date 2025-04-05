import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { Cita } from 'src/app/models/cita.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Servicio } from 'src/app/models/servicio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: false,
})
export class CitasPage implements OnInit {
  citas: any[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.obtenerCitas();
  }

  ngOnInit() {
  }

  // Función para obtener las citas desde Firestore
  obtenerCitas() {
    this.firestoreService.obtenerColecciones<any>('citas').subscribe(
      (data) => {
        console.log('Citas obtenidas:', data);

        // Procesamos las citas para acceder a los campos dentro de los mapas
        this.citas = data.map(cita => {
          return {
            clienteNombre: cita.cliente ? cita.cliente.nombre : 'Desconocido',
            servicioNombre: cita.servicio ? cita.servicio.descripcion : 'Desconocido',
            usuarioNombre: cita.usuario ? cita.usuario.nombre : 'Desconocido',
            estado: cita.estado || 'Desconocido',
            fecha: cita.fecha ? cita.fecha.toDate().toLocaleString() : 'Desconocida',  // Convierte a string si es marca de tiempo
          };
        });

        console.log('Citas procesadas con nombres:', this.citas);
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }



  /*probarAgregarCita() {
    const nuevaCita: Cita = {
      clienteId: '', // 🔹 ID del cliente
      servicioId: '67890', // 🔹 ID del servicio
      usuarioId: '54321', //
      fecha: new Date().toISOString(),
      estado: 'pendiente',
    };

    this.citasService.addCita(nuevaCita).then(() =>
      console.log("✅ Cita agendada con éxito")
    ).catch(error =>
      console.error('❌ Error al agregar cita:', error)
    );
  }*/
eliminarCita(id: string){
}
editarCita(id: string){
}

}


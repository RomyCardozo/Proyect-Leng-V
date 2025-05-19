import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { CitaI } from 'src/app/models/cita.model';
import { ClienteI } from 'src/app/models/cliente.model';
import { ServicioI } from 'src/app/models/servicio.model';
import { UsuarioI } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: false,
})
export class CitasPage implements OnInit {
  citas: CitaI[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.obtenerCitas();
  }

  async obtenerCitas() {
    try {
      const rawCitas =
        await this.firestoreService.obtenerColeccionPromise<CitaI>('citas');

      const citasEnriquecidas: CitaI[] = await Promise.all(
        rawCitas.map(async (cita) => {
          const cliente =
            await this.firestoreService.obtenerDocumento<ClienteI>(
              'clientes',
              cita.clienteId
            );
          const servicio =
            await this.firestoreService.obtenerDocumento<ServicioI>(
              'servicio',
              cita.servicioId
            ); // Ojo, plural
          const usuario =
            await this.firestoreService.obtenerDocumento<UsuarioI>(
              'usuario',
              cita.usuarioId
            ); // Ojo, plural

          // Convertir fecha a string ISO para que Angular no de error en el template
          let fechaISO = '';
          let fechaObj: any = cita.fecha;

          if (fechaObj && fechaObj.toDate) {
            fechaISO = fechaObj.toDate().toISOString();
          } else if (fechaObj instanceof Date) {
            fechaISO = fechaObj.toISOString();
          } else if (typeof fechaObj === 'string') {
            fechaISO = fechaObj;
          }

          return {
            ...cita,
            clienteNombre: cliente?.nombre ?? 'Desconocido',
            servicioNombre: servicio?.descripcion ?? 'Desconocido',
            usuarioNombre: usuario?.nombre ?? 'Desconocido',
            fecha: fechaISO, // guardamos como string ISO
          };
        })
      );

      this.citas = citasEnriquecidas;
      console.log('Citas con datos relacionados:', this.citas);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class CitasPage implements OnInit, OnDestroy {
  citas: CitaI[] = [];
  newCita!: CitaI;
  clientes: ClienteI[] = [];
  servicios: ServicioI[] = [];
  usuarios: UsuarioI[] = [];

  private citasSub!: Subscription;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.obtenerCitasTiempoReal();
    this.obtenerClientes();
    this.obtenerServicios();
    this.obtenerUsuarios();
    this.initCita();
  }

  ngOnDestroy() {
    if (this.citasSub) {
      this.citasSub.unsubscribe(); // Desuscribirse al salir
    }
  }

  obtenerCitasTiempoReal() {
    this.citasSub = this.firestoreService
      .obtenerColecciones<CitaI>('citas')
      .subscribe(async (rawCitas) => {
        const citasEnriquecidas: CitaI[] = await Promise.all(
          rawCitas.map(async (cita) => {
            const cliente = await this.firestoreService.obtenerDocumento<ClienteI>('clientes', cita.clienteId);
            const servicio = await this.firestoreService.obtenerDocumento<ServicioI>('servicio', cita.servicioId);
            const usuario = await this.firestoreService.obtenerDocumento<UsuarioI>('usuario', cita.usuarioId);

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
              fecha: fechaISO,
            };
          })
        );

        this.citas = citasEnriquecidas;
        console.log('Citas en tiempo real:', this.citas);
      });
  }

  initCita() {
    this.newCita = {
      clienteId: '',
      servicioId: '',
      usuarioId: '',
      fecha: '',
      id: this.firestoreService.createIDDoc(),
    };
  }

  editCita(cita: CitaI) {
    this.newCita = { ...cita };
  }

  async saveCita() {
    await this.firestoreService.createDocumentoID(this.newCita, 'citas', this.newCita.id);
    this.initCita(); // Se verá reflejado automáticamente
  }

  async deleteCita(cita: CitaI) {
    await this.firestoreService.deleteDocument('citas', cita.id);
    console.log('Cita eliminada:', cita);
    // Ya no necesitas llamar a this.obtenerCitas()
  }

  async obtenerClientes() {
    this.clientes = await this.firestoreService.obtenerColeccionPromise('clientes');
  }

  async obtenerServicios() {
    this.servicios = await this.firestoreService.obtenerColeccionPromise('servicio');
  }

  async obtenerUsuarios() {
    this.usuarios = await this.firestoreService.obtenerColeccionPromise('usuario');
  }
}

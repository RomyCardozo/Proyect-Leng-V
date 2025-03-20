import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita.model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: false,
})
export class CitasPage implements OnInit {
  citas: Cita[] = [];
  constructor(private citasService: CitasService) {}

  ngOnInit() {
  }

  probarAgregarCita() {
    const nuevaCita: Cita = {
      clienteId: '', // 🔹 ID del cliente
      servicioId: '67890', // 🔹 ID del servicio
      empleadoId: '54321', //
      fecha: new Date().toISOString(),
      estado: 'pendiente',
    };

    this.citasService.addCita(nuevaCita).then(() =>
      console.log("✅ Cita agendada con éxito")
    ).catch(error =>
      console.error('❌ Error al agregar cita:', error)
    );
  }
eliminarCita(id: string){
}
editarCita(id: string){
}

}

import { Servicio } from 'src/app/models/servicio.model';
import { FirestoreService } from './../../common/services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false,
})
export class ServiciosPage implements OnInit {
  servicios: any[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.listarServicios();
  }

  ngOnInit() {
  }

 listarServicios(){
  this.firestoreService.obtenerColecciones<Servicio>('servicio').subscribe((data) => {
    if (data) {
      this.servicios = data;
      console.log(this.servicios);
    }
  }
  );
 }

 eliminarServicios(id: string) {
 /* this.firestoreService.eliminarColeccion('servicios', id).then(() => {
    console.log('Servicio eliminado con ID:', id);
  }).catch((error) => {
    console.error('Error al eliminar el servicio:', error);
  });*/
 }
 editarServicios(id: string) {
  /* this.firestoreService.editarColeccion('servicios', id, { estado: 'descontinuado' }).then(() => {
    console.log('Servicio editado con ID:', id);
  }).catch((error) => {
    console.error('Error al editar el servicio:', error);
  });*/
  console.log(id);
  // Aquí puedes implementar la lógica para editar el servicio con el ID proporcionado
  // Por ejemplo, abrir un modal o redirigir a otra página con el ID del servicio
  // y permitir al usuario editar los detalles del servicio.
  // Luego, puedes guardar los cambios en Firestore utilizando el servicio FirestoreService
  // y actualizar la lista de servicios en la página.
  // Puedes usar el método editarColeccion del FirestoreService para actualizar el servicio en Firestore.
}
probarAddServicio() {
  /*const nuevoServicio: Servicio = {
    descripcion: 'Manicura básica con esmalte',
    precio: 10,
    estado: 'activo',
  };
  this.firestoreService.agregarColeccion('servicios', nuevoServicio).then(() => {
    console.log('Servicio agregado:', nuevoServicio);
  }).catch((error) => {
    console.error('Error al agregar el servicio:', error);
  });
  console.log(nuevoServicio);*/
  console.log("Servicio agregado:");

}
}

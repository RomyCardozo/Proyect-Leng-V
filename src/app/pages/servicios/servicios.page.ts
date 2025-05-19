import { ServicioI } from 'src/app/models/servicio.model';
import { FirestoreService } from './../../common/services/firestore.service';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ServiceFormComponent } from 'src/app/components/service-form/service-form.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false,
})
export class ServiciosPage implements OnInit {
  servicios: ServicioI[] = [];
  newServicio!: ServicioI;
  service!: ServicioI;
  constructor(
    private firestoreService: FirestoreService,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private modalCtrl: ModalController
  ) {
    this.listarServicios();
    this.initService();
  }
  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    toast.present();
  }

  ngOnInit() {}

  initService() {
    this.newServicio = {
      descripcion: '',
      precio: '',
      estado: 'activo',
      id: this.firestoreService.createIDDoc(),
    };
  }

  listarServicios() {
    this.firestoreService
      .obtenerColecciones<ServicioI>('servicio')
      .subscribe((data) => {
        if (data) {
          this.servicios = data;
          console.log(this.servicios);
        }
      });
  }

  async deleteService(servicio: ServicioI) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar servicio',
      message: '¿Está seguro de que desea eliminar este servicio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.firestoreService.deleteDocument('servicio', servicio.id);
            this.presentToast('Servicio eliminado');
          },
        },
      ],
    });
    await alert.present();
  }

  async saveService() {
    await this.firestoreService.createDocumentoID(
      this.newServicio,
      'servicio',
      this.newServicio.id
    );
    this.initService(); // Reinicia el nuevo servicio
  }

  editService(servicio: ServicioI) {
    this.newServicio = servicio;
  }

  async abrirFormulario(servicio?: ServicioI) {
    const servicioInicializado = servicio
      ? { ...servicio } //Si viene un cliente (modo editar), hace una copia independiente con { ...cliente }.
      : {
          //Si no viene un cliente (modo crear), genera un objeto vacío con campos por defecto
          descripcion: '',
          precio: '',
          estado: 'activo',
          id: this.firestoreService.createIDDoc(),
        };

    const modal = await this.modalCtrl.create({
      component: ServiceFormComponent,//especifica que componente se va a abrir en la modal
      componentProps: {
        servicio: servicioInicializado,
      },
      cssClass: 'custom-modal',
      presentingElement: await this.modalCtrl.getTop(), // Para que el modal se presente desde la parte superior
    });

    await modal.present(); // Presentar el modal
    const { data } = await modal.onWillDismiss(); // Esperar a que el modal se cierre y obtener los datos devueltos
    if (data) {
      // Si se devuelven datos desde el modal
      if (servicio) {
        this.newServicio = data;
        this.presentToast('Servicio editado'); // Si se está editando, actualizar el servicio
      } else {
        this.newServicio = data;
        this.presentToast('Servicio guardado'); // Si se está creando, actualizar el nuevo servicio
      }
    }
  }
}

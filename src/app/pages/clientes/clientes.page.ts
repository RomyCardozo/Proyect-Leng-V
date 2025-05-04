import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { ClienteI } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import {
  AlertController,
  IonItemSliding,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ClienteFormComponent } from 'src/app/components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,
})
export class ClientesPage implements OnInit {
  clientes: ClienteI[] = [];
  newClient!: ClienteI;
  client!: ClienteI;

  clientesFiltrados: ClienteI[] = [];
  searchTerm: string = '';
  fltroEstado: 'todos' | 'activo' | 'inactivo' = 'activo';
  //este es para el item sliding
  //@ViewChild('firstSlidingItem', { static: false }) firstSlidingItem!: IonItemSliding;
  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.listarClientes();
    this.initCliente(); // Inicializar el cliente al cargar el componente
  }
  ngOnInit() {}


// este es para el item sliding
/* ionViewDidEnter() {
    setTimeout(() => {
      this.firstSlidingItem.open('end');

      // Cerrar automáticamente luego de 2 segundos
      setTimeout(() => {
        this.firstSlidingItem.close();
      }, 2000);

    }, 500);
  }*/
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  listarClientes() {
    this.firestoreService
      .obtenerColecciones<ClienteI>('clientes')
      .subscribe((data) => {
        if (data) {
          this.clientes = data;
          this.clientesFiltrados = [...data]; // Inicializar clientesFiltrados con todos los clientes
        }
      });
  }

  buscarClientes(event: any) {
    const text = event.target.value.toLowerCase(); // Obtener el texto del input

    if (text === '' || text === null) {
      // Si no hay texto de búsqueda, mostrar todos los clientes
      this.clientesFiltrados = [...this.clientes];
    } else {
      // Si hay texto de búsqueda, filtrar los clientes
      this.clientesFiltrados = this.clientes.filter((cliente) => {
        return (
          cliente.nombre.toLowerCase().includes(text) ||
          cliente.apellido.toLowerCase().includes(text) ||
          cliente.telefono.includes(text)
        );
      });
    }
  }
  initCliente() {
    this.newClient = {
      nombre: '',
      apellido: '',
      telefono: '',
      estado: 'activo',
      id: this.firestoreService.createIDDoc(),
    };
  }

  editClient(cliente: ClienteI) {
    this.newClient = cliente;
  }

  async deleteClient(cliente: ClienteI) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.firestoreService.deleteDocument('clientes', cliente.id);
            this.presentToast('Cliente eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async saveClient() {
    await this.firestoreService.createDocumentoID(
      this.newClient,
      'clientes',
      this.newClient.id
    );
    this.initCliente(); // Reiniciar el formulario después de guardar
      this.presentToast('Cliente guardado correctamente');
  }
  //desde aca es el modal
  async abrirFormulario(cliente?: ClienteI) {
    const clienteInicializado = cliente //debemos inicializar el cliente
      ? { ...cliente }
      : {
          nombre: '',
          apellido: '',
          telefono: '',
          estado: 'activo',
          id: this.firestoreService.createIDDoc(),// Genera un ID si es nuevo cliente
        };
    const modal = await this.modalCtrl.create({
      component: ClienteFormComponent,
      componentProps: {
        cliente: clienteInicializado, // Pasar el cliente inicializado al modal
      },
      cssClass: 'custom-modal',
      presentingElement: await this.modalCtrl.getTop(),
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (cliente) {
        this.newClient = data; // Guardamos los datos del cliente editado
        this.saveClient(); // Edición
      } else {
        this.newClient = data; // Guardamos los datos del cliente nuevo
        this.saveClient(); // Nuevo cliente
      }
    }
    console.log(JSON.stringify(this.newClient));
  }
}

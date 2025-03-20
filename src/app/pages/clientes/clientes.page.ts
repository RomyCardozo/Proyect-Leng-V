import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];
  searchTerm: string = '';
  fltroEstado: 'todos' | 'activo' | 'inactivo' = 'activo';

  constructor(private clienteService : ClienteService) { }

  ngOnInit() {
    this.cargarClientes();
  }


  cargarClientes(){
    this.clienteService.getClientes().subscribe({
      next: (clientes) => this.clientes = clientes,
      error: (error) => console.error('Error al cargar clientes:', error)
    })
  }


probarAddCliente() {
    const nuevoCliente: Cliente = {
      nombre: 'Julia',
      telefono: 'Perez',
      estado: "activo",
    };

    this.clienteService.addCliente(nuevoCliente).then(() =>
    console.log("✅ Cliente agregado con éxito")
    ).catch(error =>
    console.error('❌ Error al agregar cliente:', error)
    );
}

  editarClientes() {
    console.log('Editar clientes');
  }
  eliminarClientes() {
    console.log('Eliminar clientes');
  }
}

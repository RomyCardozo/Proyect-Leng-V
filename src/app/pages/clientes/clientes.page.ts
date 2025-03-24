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


  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes; // Asignar la lista completa de clientes
        this.clientesFiltrados = clientes; // Inicializar clientesFiltrados con todos los clientes
      },
      error: (error) => console.error('Error al cargar clientes:', error),
    });
  }

probarAddCliente() {
    const nuevoCliente: Cliente = {
      nombre: 'Julia',
      apellido: 'Perez',
      telefono: '0987454125',
      estado: "activo",
    };

    this.clienteService.addCliente(nuevoCliente).then(() =>
    console.log("✅ Cliente agregado con éxito")
    ).catch(error =>
    console.error('❌ Error al agregar cliente:', error)
    );
}
clientesFiltrados = this.clientes;

buscarClientes(event: any) {

  const text = event.target.value.toLowerCase(); // Obtener el texto del input

  if (text === '' || text === null) {
    // Si no hay texto de búsqueda, mostrar todos los clientes
    this.clientesFiltrados = this.clientes;
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
  editarClientes() {
    console.log('Editar clientes');
  }
  eliminarClientes() {
    console.log('Eliminar clientes');
  }
}

import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'//→ Hace que este servicio esté disponible en toda la aplicación, sin necesidad de importarlo en otros módulos.
})
export class ClienteService {
  private clientesRef = collection(this.firestore, 'clientes');

  constructor(private firestore: Firestore) { }

  getClientes(): Observable<Cliente[]>{
    return collectionData(this.clientesRef, {idField: 'id'}) as Observable<Cliente[]>;
  }

  addCliente(cliente: Cliente){
    return addDoc(this.clientesRef, cliente);
  }

  updateCliente(id: string, data: Partial<Cliente>) {
    const clienteDoc = doc(this.firestore, `clientes/${id}`);
    return updateDoc(clienteDoc, data);
  }

  deleteCita(id: string){
    const clienteDoc = doc(this.firestore, `clientes/${id}`);
    return deleteDoc(clienteDoc);
  }
}

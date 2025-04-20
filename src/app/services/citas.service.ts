import { Cita } from './../models/cita.model';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'//→ Hace que este servicio esté disponible en toda la aplicación, sin necesidad de importarlo en otros módulos.
})
export class CitasService {
  private citasRef = collection(this.firestore, 'citas');

  constructor(private firestore: Firestore) {}

 /* getCitas(): Observable<Cita[]>{
    return collectionData(this.citasRef, {idField: 'id'}) as Observable<Cita[]>;
  }

  addCita(cita: Cita){
    return addDoc(this.citasRef, cita);
  }


  updateCita(id: string, data: Partial<Cita>) {
    const citaDoc = doc(this.firestore, `citas/${id}`);
    return updateDoc(citaDoc, data);
  }


  deleteCita(id: string) {
    const citaDoc = doc(this.firestore, `citas/${id}`);
    return deleteDoc(citaDoc);
  }
*/


}


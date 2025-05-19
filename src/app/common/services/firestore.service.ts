import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  doc,
  docData,
  Firestore,
  getFirestore,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
} from '@angular/fire/firestore';
import { ModalController, ModalOptions } from '@ionic/angular';
import { getDoc } from 'firebase/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  constructor() {}

  obtenerColecciones<tipo>(path: string) {
    const item = collection(this.firestore, path);
    return collectionData(item) as Observable<tipo[]>;
  }

  createDocumentoID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }

  deleteDocument(enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }
  createIDDoc() {
    return uuidv4();
  }


//--------------------------
  // 🔽 NUEVO: Obtener documento por ID (para cliente, usuario, servicio)
  async obtenerDocumento<tipo>(coleccion: string, id: string): Promise<tipo | null> {
    const ref = doc(this.firestore, `${coleccion}/${id}`);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as tipo) : null;
  }

  // 🔽 NUEVO: Obtener colección una sola vez con await (en lugar de observable)
  async obtenerColeccionPromise<tipo>(coleccion: string): Promise<tipo[]> {
    const obs = this.obtenerColecciones<tipo>(coleccion);
    return await firstValueFrom(obs);
  }


}

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
import { Observable } from 'rxjs';
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
}

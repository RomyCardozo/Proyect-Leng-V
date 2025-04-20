import { inject, Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

private firestore : Firestore = inject(Firestore);
  constructor() { }

  obtenerColecciones<tipo>(path : string){
    const item = collection(this.firestore, path);
    return collectionData(item) as Observable<tipo[]>;
  }

 /* getDocumentChanges<tipo>(path: string) {
    const item = doc(this.firestore, path);
    return docData(item) as Observable<tipo>;
  }*/



}
/*//para el service
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
private firestore : Firestore = inject(Firestore);

  constructor() { }
obtenerColecciones<tipo>(path : string){
  const item = collection(this.firestore, path);
  return collectionData(item) as Observable<tipo[]>;

}

}
*/

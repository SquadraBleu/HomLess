import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  representantesCollection: AngularFirestoreCollection<any>;
  representantes: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.representantesCollection = afs.collection<any>('Representantes');
    this.representantes = this.representantesCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));
   }

   createRepresentante(value){
    return this.afs.collection('Representantes').doc(value.UID).set({
      Cedula: value.Cedula,
      Nombre: value.Nombre,
      Telefono: value.Telefono,
      Correo: value.Correo,
      IDInmobiliaria: value.IDInmobiliaria,
      UID: value.UID
    });
  }

  updateRepresentante(value: any, id: string){
    return this.afs.collection('Representantes').doc(id).set(Object.assign({}, value));
  }

  deleteRepresentante(id: string){
    return this.representantesCollection.doc(id).delete();
  }

  getRepresentantes(){
    return this.representantes;
  }

   getRepresentante(id: string) {
    return this.afs.collection('Representantes').doc(id).ref.get();
  }
}

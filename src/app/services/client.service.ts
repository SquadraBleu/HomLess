import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientesCollection: AngularFirestoreCollection<any>;
  clientes: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
      this.clientesCollection = afs.collection<any>('Clientes');
      this.clientes = this.clientesCollection.snapshotChanges().pipe(map(
        actions => actions.map ( a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return{id, ...data};
        })
      ));
    }

  createCliente(value){
    return this.afs.collection('Clientes').add({
      Nombre: value.Nombre,
      Cedula: value.Cedula,
      Telefono: value.Telefono,
      Correo: value.Correo,
      UID: value.UID,
      Chats: value.Chats,
      CitasSolicitadas: value.CitasSolicitadas,
      CitasAceptadas: value.CitasAceptadas,
      InteresadoEn: value.InteresadoEn
    });
  }

  updateCliente(value: any, id: string){
    return this.afs.collection('Clientes').doc(id).set(Object.assign({}, value));
  }

  deleteCliente(id: string){
    return this.clientesCollection.doc(id).delete();
  }

  getClientes(){
    return this.clientes;
  }

}

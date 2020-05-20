import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatsCollection: AngularFirestoreCollection<any>;
  chats: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
  }

  createChat(value) {
    console.log('Está en el servicio');
    return this.afs.collection('Chats').add({
      IDCliente: value.IDCliente,
      IDInmobiliaria: value.IDInmobiliaria,
      IDInmueble: value.IDInmueble,
      IDRepresentante: value.IDRepresentante,
      SiAceptado: value.SiAceptado
    });
  }
  createChatWithId(value: any, id: string){
    return this.afs.collection('Chats').doc(id).set({
      IDCliente: value.IDCliente,
      IDInmobiliaria: value.IDInmobiliaria,
      IDInmueble: value.IDInmueble,
      IDRepresentante: value.IDRepresentante,
      SiAceptado: value.SiAceptado
    });
  }

  updateChat(value: any, id: string) {
    return this.afs.collection('Chats').doc(id).set(Object.assign({}, value));
  }

  deleteChat(id: string) {
    return this.chatsCollection.doc(id).delete();
  }

  getChats() {
    this.chatsCollection = this.afs.collection<any>('Chats');
    this.chats = this.chatsCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ));
    return this.chats;
  }

  getChatsByInmobiliaria(IDInmobiliaria: string) {
    this.chatsCollection = this.afs.collection('Chats', ref => ref.where('IDInmobiliaria', '==', IDInmobiliaria));
    this.chats = this.chatsCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ));
    return this.chats;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mailsCollection: AngularFirestoreCollection<any>;
  mails: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
      this.mailsCollection = afs.collection<any>('Mails');
      this.mails = this.mailsCollection.snapshotChanges().pipe(map(
        actions => actions.map ( a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return{id, ...data};
        })
      ));
    }

  createMail(value){
    return this.afs.collection('Mails').add({
      to: value.to,
      message: value.message
    });
  }

  updateMail(value: any, id: string){
    return this.afs.collection('Mails').doc(id).set(Object.assign({}, value));
  }

  deleteMail(id: string){
    return this.mailsCollection.doc(id).delete();
  }

  getMails(){
    return this.mails;
  }
}

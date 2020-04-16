import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inmueble } from '../models/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleServiceService {

  tagsCollection: AngularFirestoreCollection<any>;
  tags: Observable<any[]>;

  inmueblesCollection: AngularFirestoreCollection<any>;
  inmuebles: Observable<any[]>;

  inmobiliariasCollection: AngularFirestoreCollection<any>;
  inmobiliarias: Observable<any[]>;

  constructor(
    private afsAut: AngularFireAuth,
    private afs: AngularFirestore
  ) { this.tagsCollection = afs.collection<any>('Tags');
      this.tags = this.tagsCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));

      this.inmueblesCollection = afs.collection<any>('Inmuebles');
      this.inmuebles = this.inmueblesCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));

      this.inmobiliariasCollection = afs.collection<any>('Inmobiliarias');
      this.inmobiliarias = this.inmobiliariasCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));
}

  createInmueble(value){
    return this.afs.collection('Inmuebles').add({
      Titulo: value.Titulo,
      Barrio: value.Barrio,
      AreaConstruida: value.AreaConstruida,
      AreaDeposito: value.AreaDeposito,
      MontoArriendo: value.MontoArriendo,
      MontoVenta: value.MontoVenta,
      NBanos: value.NBanos,
      Descripcion: value.Descripcion,
      Direccion: value.Direccion,
      Estrato: value.Estrato,
      NHabitaciones: value.NHabitaciones,
      TipoInmueble: value.TipoInmueble,
      IDInmobiliaria: value.IDInmobiliaria,
      Localidad: value.Localidad,
      Zona: value.Zona
    });
  }

  createEtiquetas(value){
    return this.afs.collection('Tags').add({
      Hashtag: value.Hashtag,
      IDInmuebles: value.IDInmuebles
    });
  }

  getTags(){
    return this.tags;
  }

  getInmuebles(){
    return this.inmuebles;
  }

  getInmobiliarias(){
    return this.inmobiliarias;
  }

  deleteInmueble(id: string){
    return this.inmueblesCollection.doc(id).delete();
  }

  updateTags(value: any){
    return this.afs.collection('Tags').doc(value.id).set(value);
  }

  updateInmueble(value: any, id: string){
    console.log('actualice', id);
    return this.afs.collection('Inmuebles').doc(id).set(Object.assign({}, value));
  }

  updateInmobiliaria(value: any, id: string){
    return this.afs.collection('Inmobiliarias').doc(id).set(Object.assign({}, value));
  }
}

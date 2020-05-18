import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  busquedasCollection: AngularFirestoreCollection<any>;
  busquedas: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.busquedasCollection = afs.collection<any>('Busquedas');
    this.busquedas = this.busquedasCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));
  }

  createBusqueda(value){
    return this.afs.collection('Busquedas').add({
      IDBusqueda: value.IDBusqueda,
      Descripcion: value.Descripcion,
      TipoInmueble: value.TipoInmueble,
      AreaMinima: value.AreaMinima,
      AreaMaxima: value.AreaMaxima,
      NHabitaciones: value.NHabitaciones,
      NBanos: value.NBanos,
      Zona: value.Zona,
      Localidad: value.Localidad,
      PrecioMinVenta: value.PrecioMinVenta,
      PrecioMaxVenta: value.PrecioMaxVenta,
      PrecioMinArriendo: value.PrecioMinArriendo,
      PrecioMaxArriendo: value.PrecioMaxArriendo,
      SiNotificacion: value.SiNotificacion,
      IDCliente: value.IDCliente,
      Tags: value.Tags,
      Correo: value.Correo,
      Fecha: firestore.Timestamp.fromDate(new Date())
    });
  }

  updateBusqueda(value: any, id: string){
    return this.afs.collection('Busquedas').doc(id).set(Object.assign({}, value));
  }

  deleteBusqueda(id: string){
    return this.busquedasCollection.doc(id).delete();
  }

  getBusquedas(){
    return this.busquedas;
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Inmobiliaria } from '../models/inmobiliaria';
import { Cliente } from '../models/cliente';
import { FirebaseAuth } from 'angularfire2';
import { Representante } from '../models/representante';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAut: AngularFireAuth,
    private afs: AngularFirestore,
  ) {}

  registerUser(email: string, pass: string, isInmo: boolean, isCli: boolean, cosa: any){
    return new Promise ((resolve, reject) => {
      this.afsAut.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user, isInmo, isCli, cosa);
      }).catch(err => console.log(reject(err)));
    });
  }

  createUser(email: string, pass: string){
    this.afsAut.auth.createUserWithEmailAndPassword(email, pass)
    .catch(
      err => console.log('Error: ' + err)
    );
  }

  ingresarUser(email: string, pass: string){
    this.afsAut.auth.signInWithEmailAndPassword(email, pass)
    .catch(
      err => console.log('Error: ' + err)
    );
  }

  cambiarPass(nuevo: string){
    const user = this.afsAut.auth.currentUser;
    user.updatePassword(nuevo)
    .catch(
      err => console.log('Error: ' + err)
    );
  }

  loginByEmail(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.afsAut.auth.signInWithEmailAndPassword(email, pass)
      .then ( userData => resolve(userData),
      err => reject(err));
    });
  }

  logout(){
    return this.afsAut.auth.signOut();
  }

  deleteUser(){
    return new Promise((resolve, reject) => {
      const user = this.afsAut.auth.currentUser;
      user.delete()
      .then ( userData => resolve(userData),
      err => reject(err));
    });
  }

  changePassword(nuevo: string){
    return new Promise((resolve, reject) => {
      const user = this.afsAut.auth.currentUser;
      user.updatePassword(nuevo)
      .then ( userData => resolve(userData),
      err => reject(err));
    });
  }

  private updateUserData(user, inm: boolean, cli: boolean, cosa: any){
    /*
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      email: user.email,
      roles: {
        inmobiliaria: inm,
        clinte: cli
      }
    };
    return userRef.set(data, { merge: true });*/

    if (cli){
      this.afs.collection('Clientes').doc(user.uid).set({
        Nombre: cosa.Nombre,
        Cedula: cosa.Cedula,
        Telefono: cosa.Telefono,
        Correo: cosa.Correo,
        UID: user.uid,
        Chats: cosa.Chats,
        CitasSolicitadas: cosa.CitasSolicitadas,
        CitasAceptadas: cosa.CitasAceptadas,
        Busquedas: cosa.Busquedas
      });
      /*
      return this.afs.collection('Clientes').add({
        Nombre: cosa.Nombre,
        Cedula: cosa.Cedula,
        Telefono: cosa.Telefono,
        Correo: cosa.Correo,
        UID: user.uid,
        Chats: cosa.Chats,
        CitasSolicitadas: cosa.CitasSolicitadas,
        CitasAceptadas: cosa.CitasAceptadas,
        InteresadoEn: cosa.InteresadoEn
      });*/
    }
    if (inm){
      this.afs.collection('Inmobiliarias').doc(user.uid).set({
        NIT: cosa.NIT,
        Correo: cosa.Correo,
        TelefonoContacto: cosa.TelefonoContacto,
        Nombre: cosa.Nombre,
        DireccionLogo: cosa.DireccionLogo,
        IDInmobiliria: user.uid,
        Inmuebles: cosa.Inmuebles,
        UID: user.uid,
      });
    }

  }

  isAuth(){
    // tslint:disable-next-line: no-shadowed-variable
    return this.afsAut.authState.pipe(map(auth => auth));
  }

  isUserInmo(userUid){
    // console.log('BEEEEE', userUid);
    return this.afs.doc<Inmobiliaria>(`Inmobiliarias/${userUid}`).valueChanges();
  }

  isUserClient(userUid){
    return this.afs.doc<Cliente>(`Clientes/${userUid}`).valueChanges();
  }

  isUserRepre(userUid){
    return this.afs.doc<Representante>(`Representantes/${userUid}`).valueChanges();
  }
}

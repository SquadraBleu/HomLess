import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Inmobiliaria } from '../models/inmobiliaria';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAut: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  registerUser(email: string, pass: string, isInmo: boolean, isCli: boolean){
    return new Promise ((resolve, reject) => {
      this.afsAut.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user, isInmo, isCli);
      }).catch(err => console.log(reject(err)));
    });
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

  private updateUserData(user, inm: boolean, cli: boolean){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      email: user.email,
      roles: {
        inmobiliaria: inm,
        clinte: cli
      }
    };
    return userRef.set(data, { merge: true });
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
}

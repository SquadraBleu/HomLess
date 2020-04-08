import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: Observable<firebase.User>;

  constructor(
    private afAut: AngularFireAuth
  ) { this.userData = afAut.authState; }

  loginByEmail(user: User){
    const { email, password } = user;
    return this.afAut.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.afAut.auth.signOut();
  }
}

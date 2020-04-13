import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-inmuebles',
  templateUrl: './lista-inmuebles.component.html',
  styleUrls: ['./lista-inmuebles.component.css']
})
export class ListaInmueblesComponent implements OnInit {

  public inmuebles: Inmueble[] = [
    new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', []),
    new Inmueble('Esta es una propiedad', '', 200, undefined, 0, 2000000, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [])
  ];

  busqueda = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  verInmueble(){
    // Aqui va un navigate
  }

  buscarInmueble(){
    // Aca actualizar la lista o mandar a un navigate
  }

  agregarInmueble(){
    this.router.navigate(['inmobiliaria/crear-inmueble']);
  }

  getImageUrl(/*userId: string*/) {
    return 'assets/images/H-Gold.png';
    // const userStorageRef = firebase.storage().ref().child('images/users/' + userId + "_users.jpg");
    // userStorageRef.getDownloadURL().then(url => {
    //   this.userProfileImg = url
    // });
  }
}

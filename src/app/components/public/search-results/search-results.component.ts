import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  inmuebles: Inmueble[] = [
    new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', undefined, '', ''),
    new Inmueble('Esta es una propiedad', '', 200, undefined, 0, 2000000, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', undefined, '', '')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  getImageUrl(/*userId: string*/) {
    return 'assets/images/H-Gold.png';
    // const userStorageRef = firebase.storage().ref().child('images/users/' + userId + "_users.jpg");
    // userStorageRef.getDownloadURL().then(url => {
    //   this.userProfileImg = url
    // });
  }
  verInmueble(){
    console.log('Entre a la Funcion');
  }

}

import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-ver-inmueble',
  templateUrl: './ver-inmueble.component.html',
  styleUrls: ['./ver-inmueble.component.css']
})
export class VerInmuebleComponent implements OnInit {

  constructor()
  {

  }

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined, '',
  '', undefined, undefined, '', undefined, '', undefined, '', '');

  ngOnInit(): void{
  }

  isVenta(): boolean
  {
    if(this.inmueble.MontoVenta !== undefined && this.inmueble.MontoVenta !== 0)
    {
      return true;
    }
    else { return false; }
  }

  isArriendo(): boolean
  {
    if(this.inmueble.MontoArriendo !== undefined && this.inmueble.MontoArriendo !== 0)
    {
      return true;
    }
    else { return false; }
  }

}

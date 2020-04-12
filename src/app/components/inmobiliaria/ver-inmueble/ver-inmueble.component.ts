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

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
    , '', '', undefined, undefined, '', [], '', '', '', []);
  public urlImagenes: string[];

  ngOnInit(): void{
    this.urlImagenes = ['assets/images/H-Gold.png', 'assets/images/H-Black.png', 'assets/images/Homless-Sad.png'];
  }

  isVenta(): boolean
  {
    if (this.inmueble.MontoVenta !== undefined && this.inmueble.MontoVenta !== 0)
    {
      return true;
    }
    else { return false; }
  }

  isArriendo(): boolean
  {
    if (this.inmueble.MontoArriendo !== undefined && this.inmueble.MontoArriendo !== 0)
    {
      return true;
    }
    else { return false; }
  }

  onEdit(): void
  {
    console.log('Navigate To Edit');
  }

  onErase(): void
  {
    console.log('Navigate To Erase');
  }

}

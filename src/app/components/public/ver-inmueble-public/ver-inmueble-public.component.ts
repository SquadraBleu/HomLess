import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-inmueble-public',
  templateUrl: './ver-inmueble-public.component.html',
  styleUrls: ['./ver-inmueble-public.component.css']
})
export class VerInmueblePublicComponent implements OnInit {

  constructor(private router: Router)
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

  onScheduleAppointment(): void{
    console.log('Navigate to schedule appointment');
  }

  onWriteMessage(): void{
    console.log('Navigate to send message');
  }

}

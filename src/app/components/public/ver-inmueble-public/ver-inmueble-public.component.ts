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
  public urlImagenes: string[] =[];

  ngOnInit(): void{
    //this.urlImagenes = ['https://firebasestorage.googleapis.com/v0/b/homlessp.appspot.com/o/imagenes%2Finmuebles%2F0_Tinel_final-16.jpg?alt=media&token=38f9e27d-aa49-4b1c-b930-000679b6c115', 'assets/images/H-Black.png', 'assets/images/Homless-Sad.png'];
    this.urlImagenes.push('https://firebasestorage.googleapis.com/v0/b/homlessp.appspot.com/o/imagenes%2Finmuebles%2F0_Tinel_final-16.jpg?alt=media&token=38f9e27d-aa49-4b1c-b930-000679b6c115');
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

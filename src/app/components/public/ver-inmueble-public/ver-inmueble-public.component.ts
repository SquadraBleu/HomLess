import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

@Component({
  selector: 'app-ver-inmueble-public',
  templateUrl: './ver-inmueble-public.component.html',
  styleUrls: ['./ver-inmueble-public.component.css']
})
export class VerInmueblePublicComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private inmuService: InmuebleServiceService)
  {
  }
  id: any = undefined;

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
  , '', '', undefined, undefined, '', [], '', '', '', [], '');
  public urlImagenes: string[];

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.darInmueble();
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

  onRegresar(): void {
    this.router.navigate(['public/search']);
  }

  darInmueble(){
    this.inmuService.getInmuebles().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].id === this.id ){
          this.inmueble = res[index];
          this.urlImagenes = this.inmueble.DirFotos;
          //  console.log('VEEEERRR', this.inmueble);
        }
      }
    });
  }

}

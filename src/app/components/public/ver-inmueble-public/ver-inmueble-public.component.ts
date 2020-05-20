import {Component, OnInit} from '@angular/core';
import {Inmueble} from 'src/app/models/inmueble';
import {Router, ActivatedRoute} from '@angular/router';
import {InmuebleServiceService} from 'src/app/services/inmueble-service.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-ver-inmueble-public',
  templateUrl: './ver-inmueble-public.component.html',
  styleUrls: ['./ver-inmueble-public.component.css']
})
export class VerInmueblePublicComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private inmuService: InmuebleServiceService,
              private authSvc: AuthService) {
  }

  id: any = undefined;
  idSigned: any = undefined;
  idInmobiliaria: any;


  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
    , '', '', undefined, undefined, '', [], '', '', '', [], '');
  public urlImagenes: string[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.darInmueble();
  }

  isVenta(): boolean {
    if (this.inmueble.MontoVenta !== undefined && this.inmueble.MontoVenta !== 0) {
      return true;
    } else {
      return false;
    }
  }

  isArriendo(): boolean {
    if (this.inmueble.MontoArriendo !== undefined && this.inmueble.MontoArriendo !== 0) {
      return true;
    } else {
      return false;
    }
  }

  onScheduleAppointment(): void {
    console.log('Navigate to schedule appointment');
  }

  onWriteMessage(): void {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.idSigned = auth.uid;
        this.authSvc.isUserClient(this.idSigned).subscribe(userRole => {
          if (userRole !== undefined){
            this.router.navigate(['cliente/chat/' + this.idSigned + '/' + this.id + '/' + this.idInmobiliaria] );
            console.log(this.idSigned);
          }
        });
      }
    });
  }

  onRegresar(): void {
    this.router.navigate(['public/search']);
  }

  darInmueble() {
    this.inmuService.getInmuebles().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].id === this.id) {
          this.inmueble = res[index];
          this.urlImagenes = this.inmueble.DirFotos;
          this.idInmobiliaria = res[index].IDInmobiliaria;
          //  console.log('VEEEERRR', this.inmueble);
        }
      }
    });
  }

}

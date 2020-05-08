import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Inmobiliaria } from '../../../models/inmobiliaria';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from '../../../services/inmueble-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})

export class EditarInmuebleComponent implements OnInit {

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
  , '', '', undefined, undefined, '', [], '', '', '', [], '');

  inmobiliariaLoged: any = null;
  userUid: string = null;
  tagsN: string[] = [];
  tagsOriginales: Tag[] = [];
  // fotos: string[] = [];
  IDinmueble: any = null;

  descripcion: string;

  parqueadero: boolean;
  transportePublico: boolean;
  zonasRecreativas: boolean;
  cocinaIntegral: boolean;
  pagoAdmin: boolean;
  cc: boolean;
  privacidad: boolean;

  localidades: string[] = [
    '',
    'Usaquen',
    'Chapinero',
    'Santa Fe',
    'San Cristobal',
    'Usme',
    'Tunjuelito',
    'Bosa',
    'Kennedy',
    'Fontibón',
    'Engativá',
    'Suba',
    'Barrios Unidos',
    'Teusaquillo',
    'Los Mártires',
    'Antonio Nariño',
    'Puente Aranda',
    'La Candelaria',
    'Rafael Uribe Uribe',
    'Ciudad Bolívar',
    'Sumapaz'
  ];

  zonas: string[] = [
    '',
    'Norte',
    'Noroccidente',
    'Centro',
    'Occidente',
    'Sur',
    'Suroccidente',
    'Suroriente'
  ];

  tiposDeInmueble: string[] = [
    '',
    'Edificio',
    'Casa',
    'Apartamento',
    'Apartaestudio'
  ];
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private inmuService: InmuebleServiceService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.IDinmueble = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.darInmueble();
    this.obtenerTags();
  }

  editarInmueble(): void
  {
    console.log(this.inmueble);
    this.inmuService.updateInmueble(this.inmueble, this.IDinmueble);
    this.router.navigate(['inmobiliaria/ver-inmueble/' + this.IDinmueble]);
    console.log('Se editó');
  }

  darInmueble(){
    this.inmuService.getInmuebles().subscribe( res => {
      // this.inmuebles = res;
      // console.log(this.inmuebles);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].id === this.IDinmueble ){
          this.inmueble = res[index];
          // this.fotos = this.inmueble.DirFotos;
          //  console.log('VEEEERRR', this.inmueble);
        }
      }
    });
  }

  obtenerTags(){
    this.inmuService.getTags().subscribe(res => {
      this.tagsOriginales = res;
      const tgAux: Tag[] = [];
      // console.log(this.tagsExistentes[1].id);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.tagsOriginales.length; index++) {
        // tslint:disable-next-line: prefer-for-of
        for ( let j = 0; j < this.tagsOriginales[index].IDInmuebles.length; j++){
          if (this.tagsOriginales[index].IDInmuebles[j] === this.IDinmueble ){
            if (this.tagsOriginales[index].Hashtag === 'Parqueadero'){
              this.parqueadero = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Transporte publico'){
              this.transportePublico = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Zonas recreativas'){
              this.zonasRecreativas = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Cocina integral'){
              this.cocinaIntegral = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Pago administracion'){
              this.pagoAdmin = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Centros Comerciales'){
              this.cc = true;
            }
            if (this.tagsOriginales[index].Hashtag === 'Privacidad'){
              this.privacidad = true;
            }
          }
        }
      }
    });
  }
}

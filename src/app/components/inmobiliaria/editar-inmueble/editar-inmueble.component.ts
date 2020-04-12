import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Inmobiliaria } from '../../../models/inmobiliaria';
import { ActivatedRoute } from '@angular/router';
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
  , '', '', undefined, undefined, '', [], '', '', '', []);

  inmobiliariaLoged: any = null;
  userUid: string = null;
  tagsN: string[] = [];
  tagsExistentes: Tag[] = [];
  fotos: string[] = [];
  IDinmueble: any = null;

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
    private inmuService: InmuebleServiceService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
            this.inmobiliariaLoged = userRole;
        });
      }
    });
  }

}

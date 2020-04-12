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
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

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
    this.obtenerTags();
  }

  crearInmueble(){
    this.inmuService.createInmueble(this.inmueble)
    .then(res => {
      this.IDinmueble = res.id;
      console.log(this.IDinmueble);
      this.actualizarTags();
    }).catch ( err => console.log('err', err.message));

  }

  onUpload(e) {
    const num: any = this.fotos.length;
    const name = '' + num + '_' + e.target.files[0].name;
    const file = e.target.files[0];
    console.log(name);
    const filePath = 'imagenes/inmuebles/' + name;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.fotos.push(filePath);
  }

  obtenerTags(){
    this.inmuService.getTags().subscribe(res => {
      this.tagsExistentes = res;
      // console.log(this.tagsExistentes[1].id);
    });
  }

  actualizarTags(){
    if (this.parqueadero){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Parqueadero'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Parqueadero';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.transportePublico){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Transporte publico'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Transporte publico';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.zonasRecreativas){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Zonas recreativas'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Zonas recreativas';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.cocinaIntegral){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Cocina integral'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Cocina integral';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.pagoAdmin){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Pago administracion'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Pago administracion';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.cc){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Centros Comerciales'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Centros Comerciales';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    if (this.privacidad){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Privacidad'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Privacidad';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n);
      }
    }
    this.tagsExistentes.forEach(ele => {
      this.inmuService.updateTags(ele);
      ele.IDInmuebles.forEach(element => {
        if (element === this.IDinmueble){
          this.tagsN.push(ele.id);
        }
      });
    });

    this.inmueble.TagsIDs = this.tagsN;
    this.inmueble.DirFotos = this.fotos;
    this.inmueble.IDInmobiliaria = this.userUid;
    this.inmueble.Descripcion = 'MIERDDAAAAAAAAAAAA';
    console.log(this.inmueble);
    this.inmuService.updateInmueble(this.inmueble, this.IDinmueble);
  }
}

import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Inmobiliaria } from '../../../models/inmobiliaria';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
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
    , '', '', undefined, undefined, '', [], '', '', '', [], '');

  inmobiliariaLoged: any = null;
  userUid: string = null;
  tagsN: string[] = [];
  tagsExistentes: Tag[] = [];
  fotos: string[] = [];
  ubicacionFotos: string[] = [];
  IDinmueble: any = null;

  parqueadero: boolean;
  transportePublico: boolean;
  zonasRecreativas: boolean;
  cocinaIntegral: boolean;
  pagoAdmin: boolean;
  cc: boolean;
  privacidad: boolean;
  tags = '';

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
    private storage: AngularFireStorage,
    private router: Router
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

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
  }

  crearInmueble(){
    this.inmuService.createInmueble(this.inmueble)
    .then(res => {
      this.IDinmueble = res.id;
      console.log(this.IDinmueble);
      this.actualizarTags();
    }).catch ( err => console.log('err', err.message));
    // this.actualizarTags();
  }

  onUpload(e) {
    // console.log(e.target.files.length);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < e.target.files.length; index++) {
      const num: any = Math.random();
      const name = '' + num + '_' + e.target.files[index].name;
      const file = e.target.files[index];
      console.log(name);
      const filePath = 'imagenes/inmuebles/' + name;
      this.ubicacionFotos.push(filePath);
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            // console.log('urlF', url);
            this.fotos.push(url);
            // console.log('rrrrrr', url);
          });
        })
      ).subscribe();
    }
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
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Parqueadero';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.transportePublico){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Transporte publico'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Transporte publico';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.zonasRecreativas){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Zonas recreativas'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Zonas recreativas';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.cocinaIntegral){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Cocina integral'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Cocina integral';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.pagoAdmin){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Pago administracion'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Pago administracion';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.cc){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Centros Comerciales'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Centros Comerciales';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    if (this.privacidad){
      let exist = false;
      this.tagsExistentes.forEach(e => {
        if (e.Hashtag === 'Privacidad'){
          exist = true;
          e.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(e.id);
        }
      });
      if (!exist){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = 'Privacidad';
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n).then(res => this.tagsN.push(res.id));
      }
    }
    // console.log(this.tagsN);
    this.tagsExistentes.forEach(ele => {
      this.inmuService.updateTags(ele);
    });
    console.log('despues', this.tagsN);
    this.inmueble.TagsIDS = this.tagsN;
    this.inmueble.DirFotos = this.fotos;
    this.inmueble.IDInmobiliaria = this.userUid;
    this.inmueble.IDI = this.IDinmueble;
    console.log(this.inmueble);
    this.inmuService.updateInmueble(this.inmueble, this.IDinmueble);
    this.inmobiliariaLoged.Inmuebles.push(this.IDinmueble);
    this.inmuService.updateInmobiliaria(this.inmobiliariaLoged, this.userUid);

    this.tagsN = [];
    this.fotos = [];
    this.IDinmueble = null;

    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
  }
}

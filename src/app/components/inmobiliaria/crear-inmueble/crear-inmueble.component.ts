import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Mail } from 'src/app/models/mail';
import { Inmobiliaria } from '../../../models/inmobiliaria';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from '../../../services/inmueble-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Tag } from 'src/app/models/tag';
import { Template } from 'src/app/models/template';
import { MailService } from 'src/app/services/mail.service';
import { TemplateService } from 'src/app/services/template.service';
import { BusquedaService} from '../../../services/busqueda.service';

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
    private mailService: MailService,
    private busqService: BusquedaService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private router: Router,
    private templService: TemplateService
  ) { }

  ngOnInit(): void {
    console.log('Authh::', this.inmueble);
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
            this.inmobiliariaLoged = userRole;
        });
      }
    });

    console.log('oninit', this.inmueble);
    this.obtenerTags();
    console.log('tags', this.inmueble);
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
  }

  crearInmueble(){

    console.log('CONSOLE IDI', this.inmueble);
    this.inmuService.createInmueble(this.inmueble)
    .then(res => {
      this.IDinmueble = res.id;
      console.log(this.IDinmueble);
      this.actualizarTags();
      this.notificarInteresados(this.inmueble);
    }).catch ( err => console.log('err', err.message));
    // this.actualizarTags();
  }

  notificarInteresados(value: any){
    const busquedas = this.busqService.getBusquedas().subscribe( res => {
      console.log('Se entró a notificarInteresados...' + 'https://homlessp.web.app/public/search/ver-inmueble/' + value.IDI);
      const urlInmu: string = 'https://homlessp.web.app/public/search/ver-inmueble/' + value.IDI;
      const correoInteresados: string[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index ++){
        if (res[index].SiNotificacion === true) {
          if (res[index].AreaMaxima > 0){
            if (res[index].AreaMaxima < value.AreaConstruida){
              console.log('Falló la comparación de AreaMaxima');
              continue;
            }
          }
          if (res[index].AreaMinima > 0){
            if (res[index].AreaMinima > value.AreaConstruida){
              console.log('Falló la comparación de AreaMínima');
              continue;
            }
          }
          if (res[index].Localidad.length !== 0){
            if (res[index].Localidad !== value.Localidad){
              console.log('Atributo de busqueda => ' + res[index].Localidad.length);
              console.log('Atributo de inmueble => ' + value.Localidad);
              console.log('Falló la comparación de Localidad');
              continue;
            }
          }
          if (res[index].Zona.length !== 0){
            if (res[index].Zona !== value.Zona){
              console.log('Falló la comparación de Zona');
              continue;
            }
          }
          if (res[index].TipoInmueble.length !== 0){
            if (res[index].TipoInmueble !== value.TipoInmueble){
              console.log('Falló la comparación de TipoInmueble');
              continue;
            }
          }
          if (res[index].NBanos > 0){
            if (res[index].NBanos !== value.NBanos){
              console.log('Falló la comparación de NBanos');
              continue;
            }
          }
          if (res[index].NHabitaciones > 0){
            if (res[index].NHabitaciones !== value.NHabitaciones){
              console.log('Falló la comparación de NHabitaciones');
              continue;
            }
          }
          if (res[index].PrecioMinArriendo > 0){
            if (res[index].PrecioMinArriendo > value.MontoArriendo){
              console.log('Falló la comparación de PrecioMinArriendo');
              continue;
            }
          }
          if (res[index].PrecioMinVenta > 0){
            if (res[index].PrecioMinVenta > value.MontoVenta){
              console.log('Falló la comparación de PrecioMinVenta');
              continue;
            }
          }
          if (res[index].PrecioMaxVenta > 0){
            if (res[index].PrecioMaxVenta < value.MontoVenta){
              console.log('Falló la comparación de PrecioMaxVenta');
              continue;
            }
          }
          if (res[index].PrecioMaxArriendo > 0){
            if (res[index].PrecioMaxArriendo < value.MontoArriendo){
              console.log('Falló la comparación de PrecioMaxArriendo');
              continue;
            }
          }
          if (this.compararTags(res[index].Tags, value.TagsIDS) !== true){
            console.log('Falló la comparación de tags');
            continue;
          }
          correoInteresados.push(res[index].Correo);
        }
      }
      if (correoInteresados.length > 0){
        this.enviarCorreos(correoInteresados, urlInmu);
      }
    });
  }

  private compararTags(tagsBusqueda: string[], tagsInmueble: string[]): boolean {
    if (tagsBusqueda === null || tagsBusqueda.length === 0){
      if (tagsBusqueda.length !== tagsInmueble.length){
        return false;
      } else{
        const superSet = {};
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < tagsBusqueda.length; index++){
          console.log('Comparar Tags!!!!!!!!!!! ' + tagsBusqueda[index]);
          const e = tagsBusqueda[index] + typeof tagsBusqueda[index];
          superSet[e] = 1;
        }
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < tagsInmueble.length; index++){
          const e = tagsInmueble[index] + typeof tagsInmueble[index];
          if (!superSet[e]){
            return false;
          }
          superSet[e] = 2;
        }
        // tslint:disable-next-line: prefer-for-of
        for (const e in superSet){
          if (superSet[e] === 1){
            return false;
          }
        }
        return true;
      }
    } else{
      return true;
    }
  }

  private enviarCorreos(correoInteresados: string[], url: string) {
    console.log('Entró a enviarCorreos');
    this.templService.getTemplates().subscribe(res => {
      let mail: Mail;
      let template: Template = null;
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if ('Notify' === res[index].Tipo){
          template = res[index];
        }
      }
      if (template != null){
        const firstPart = template.FirstPart;
        const secondPart = template.SecondPart;
        const htmlCode = '<code>' + firstPart + url + secondPart + '</code>';
        for (const correoInteresado of correoInteresados){
          console.log(correoInteresado);
          mail = new Mail( correoInteresado, {subject: 'Un lugar para ti!', html: htmlCode});
          console.log(mail);
          this.mailService.createMail(mail);
        }
      } else{
        console.log('Template no reconocido...');
      }
    });
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
            console.log('urlF', url);
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n).then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
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
        this.inmuService.createEtiquetas(n)
        .then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
      }
    }

    const personalzidos = this.tags.split(',');
    console.log(personalzidos);

    personalzidos.forEach(e => {
      let esta = false;
      this.tagsExistentes.forEach( el => {
        if (e === el.Hashtag){
          esta = true;
          el.IDInmuebles.push(this.IDinmueble);
          this.tagsN.push(el.id);
        }
      });
      if (!esta){
        const n: Tag = new Tag('', [], '');
        n.Hashtag = e;
        n.IDInmuebles.push(this.IDinmueble);
        this.inmuService.createEtiquetas(n)
        .then(
          res => {
            this.tagsN.push(res.id);
            n.id = res.id;
            this.inmuService.updateTags(n, res.id);
          }
        );
      }
    });

    // console.log(this.tagsN);
    this.tagsExistentes.forEach(ele => {
      this.inmuService.updateTags(ele, ele.id);
    });
    this.inmueble.TagsIDS = this.tagsN;
    this.inmueble.DirFotos = this.fotos;
    this.inmueble.IDInmobiliaria = this.userUid;
    this.inmueble.IDI = this.IDinmueble;
    this.inmuService.updateInmueble ( this.inmueble, this.IDinmueble );
    this.inmobiliariaLoged.Inmuebles.push( this.IDinmueble );
    this.inmuService.updateInmobiliaria ( this.inmobiliariaLoged, this.userUid );
    this.tagsN = [];
    this.fotos = [];
    this.IDinmueble = null;
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
  }
}

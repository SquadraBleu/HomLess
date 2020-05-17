import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Tag } from 'src/app/models/tag';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-inmueble',
  templateUrl: './ver-inmueble.component.html',
  styleUrls: ['./ver-inmueble.component.css']
})
export class VerInmuebleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService,
    private storage: AngularFireStorage,
    private inmuService: InmuebleServiceService
  ) {}

  id: any = undefined;
  inmuebles: any[] = [];
  tagsExistentes: Tag[] = [];
  inmobiliariaLoged: any = null;
  userUid: string = null;

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
    , '', '', undefined, undefined, '', [], '', '', '', [], '');
  public urlImagenes: string[];

  ngOnInit(): void{
    // this.urlImagenes = ['assets/images/H-Gold.png', 'assets/images/H-Black.png', 'assets/images/Homless-Sad.png'];
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
            this.inmobiliariaLoged = userRole;
        });
      }
    });
    this.darInmueble();
    this.obtenerTags();
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
    this.router.navigate(['inmobiliaria/editar-inmueble/' + this.inmueble.IDI]);
  }

  onRegresar(): void {
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.inmueble.IDInmobiliaria]);
  }

  onErase(): void
  {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.inmueble.DirFotos.length; i++){
      const desertRef = this.storage.storage.refFromURL(this.inmueble.DirFotos[i]);
      // console.log(desertRef);
      // Delete the file
      // tslint:disable-next-line: only-arrow-functions
      desertRef.delete().then( function() {
      // File deleted successfully
      console.log('Borrado bein');
      // tslint:disable-next-line: only-arrow-functions
      }).catch( function(error) {
      // Uh-oh, an error occurred!
      });
    }

    this.inmuService.deleteInmueble(this.id);

    this.tagsExistentes.forEach(element => {
      element.IDInmuebles.forEach(ele => {
        if ( ele === this.id ){
          element.IDInmuebles.splice( element.IDInmuebles.indexOf(ele), 1);
          this.inmuService.updateTags(element, element.id);
        }
      });
    });

    this.inmobiliariaLoged.Inmuebles.forEach( element => {
      if (element === this.id){
        this.inmobiliariaLoged.Inmuebles.splice( this.inmobiliariaLoged.Inmuebles.indexOf(element), 1);
      }
    });
    this.inmuService.updateInmobiliaria(this.inmobiliariaLoged, this.userUid);
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
  }

  darInmueble(){
    this.inmuService.getInmuebles().subscribe( res => {
      this.inmuebles = res;
      console.log(this.inmuebles);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].id === this.id ){
          this.inmueble = this.inmuebles[index];
          this.urlImagenes = this.inmueble.DirFotos;
          //  console.log('VEEEERRR', this.inmueble);
        }
      }
    });
  }

  obtenerTags(){
    this.inmuService.getTags().subscribe(res => {
      this.tagsExistentes = res;
      // console.log(this.tagsExistentes[1].id);
    });
  }
}

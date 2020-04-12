import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-ver-inmueble',
  templateUrl: './ver-inmueble.component.html',
  styleUrls: ['./ver-inmueble.component.css']
})
export class VerInmuebleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private inmuService: InmuebleServiceService
  ) {}

  id: any = undefined;
  inmuebles: any[] = [];
  tagsExistentes: Tag[] = [];

  inmueble: Inmueble = new Inmueble('', '', undefined, undefined, undefined, undefined, undefined
    , '', '', undefined, undefined, '', [], '', '', '', []);
  public urlImagenes: string[] = [];

  ngOnInit(): void{
    // this.urlImagenes = ['assets/images/H-Gold.png', 'assets/images/H-Black.png', 'assets/images/Homless-Sad.png'];
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
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
    console.log('Navigate To Edit');
  }

  onErase(): void
  {
    this.inmuService.deleteInmueble(this.id);

    this.tagsExistentes.forEach(element => {
      element.IDInmuebles.forEach(ele => {
        if ( ele === this.id ){
          element.IDInmuebles.splice( element.IDInmuebles.indexOf(ele), 1);
          this.inmuService.updateTags(element);
        }
      });
    });
    // window.location.reload();
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

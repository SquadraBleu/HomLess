import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-home-representante',
  templateUrl: './home-representante.component.html',
  styleUrls: ['./home-representante.component.css']
})
export class HomeRepresentanteComponent implements OnInit {

  id: any = undefined;
  nameRepre = 'Hola Representante, ';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darRepresentante();
  }

  darRepresentante(){
    this.repreService.getRepresentantes().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].UID === this.id ){
          this.nameRepre = this.nameRepre + res[index].Nombre;
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  verChat(){
    this.router.navigate(['representante/chat/' + this.id]);
  }

  verCalendario(){
    console.log('Funciona el boton pero no esta implementado');
  }
}

import {Component, OnInit} from '@angular/core';
import {Busqueda} from 'src/app/models/busqueda';
import {Tag} from 'src/app/models/tag';
import {Router, ActivatedRoute} from '@angular/router';
import {InmuebleServiceService} from '../../../services/inmueble-service.service';
import {BusquedaService} from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-ver-busquedas',
  templateUrl: './ver-busquedas.component.html',
  styleUrls: ['./ver-busquedas.component.css']
})
export class VerBusquedasComponent implements OnInit {

  public busquedas: Busqueda[] = [];
  idactivate: boolean;

  public headers: string[][] = [];
  public data: string[][] = [];
  id: any = undefined;
  tagsExistentes: Tag[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inmuService: InmuebleServiceService,
    private busquedaService: BusquedaService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID comeeee', this.route.snapshot.paramMap.get('id'));
    this.obtenerTags();
    this.getSearches();
    console.log(this.data);
    console.log(this.headers);
  }
  reload()
  {
    this.router.navigate(['cliente/ver-busqueda/' + this.id]);
  }

  activarBusqueda(i: number): void {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = true;
    this.busquedaService.updateBusqueda(this.busquedas[i], this.busquedas[i].IDBusqueda);
    console.log('ACTIVO.>' , this.busquedas[i] );
    this.reload();
  }

  desactivarBusqueda(i: number): void {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = false;
    this.busquedaService.updateBusqueda(this.busquedas[i], this.busquedas[i].IDBusqueda);
    console.log('DESACTIVO.>' , this.busquedas[i] );
    this.reload();
    // this.router.navigate(['cliente/ver-busqueda/' + this.id]);
  }


  eliminarBusqueda(i: number): void {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = false;
    this.busquedaService.deleteBusqueda(this.busquedas[i].IDBusqueda);
    console.log('Eliminar busqueda en la posicion ' + i + ' de busquedas');
    this.busquedas.splice(i, i + 1);
    this.reload();
    // this.router.navigate(['cliente/ver-busqueda/' + this.id]);
  }

  mostrarBusquedas(): void {
    console.log('MOstrar busquedas', this.busquedas.length);
    this.headers = [];
    this.data = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.busquedas.length; i++) {
      const datos: string[] = [];
      const header: string[] = [];
      let j = 0;
      if (this.busquedas[i].Descripcion !== undefined && this.busquedas[i].Descripcion != null) {
        header[j] = 'Descripción';
        datos[j] = this.busquedas[i].Descripcion;
        j++;
      }
      if (this.busquedas[i].TipoInmueble !== undefined && this.busquedas[i].TipoInmueble != null) {
        header[j] = 'Tipo';
        datos[j] = this.busquedas[i].TipoInmueble;
        j++;
      }
      if (this.busquedas[i].AreaMinima !== undefined && this.busquedas[i].AreaMinima != null) {
        header[j] = 'Área Mínima';
        datos[j] = this.busquedas[i].AreaMinima.toString();
        j++;
      }
      if (this.busquedas[i].AreaMaxima !== undefined && this.busquedas[i].AreaMaxima != null) {
        header[j] = 'Área Máxima';
        datos[j] = this.busquedas[i].AreaMaxima.toString();
        j++;
      }
      if (this.busquedas[i].NBanos !== undefined && this.busquedas[i].NBanos != null) {
        header[j] = 'N° Baños';
        datos[j] = this.busquedas[i].NBanos.toString();
        j++;
      }
      if (this.busquedas[i].NHabitaciones !== undefined && this.busquedas[i].NBanos != null) {
        header[j] = 'N° Habitaciones';
        datos[j] = this.busquedas[i].NHabitaciones.toString();
        j++;
      }
      if (this.busquedas[i].Zona !== undefined && this.busquedas[i].Zona != null) {
        header[j] = 'Zona';
        datos[j] = this.busquedas[i].Zona;
        j++;
      }
      if (this.busquedas[i].Localidad !== undefined && this.busquedas[i].Localidad != null) {
        header[j] = 'Localidad';
        datos[j] = this.busquedas[i].Localidad;
        j++;
      }

      if (this.busquedas[i].PrecioMinVenta !== undefined && this.busquedas[i].PrecioMinVenta != null) {
        if (this.busquedas[i].PrecioMaxVenta !== undefined && this.busquedas[i].PrecioMaxVenta != null) {
          header[j] = 'Precio Venta';
          datos[j] = '$' + this.busquedas[i].PrecioMinVenta.toString() + ' - $' + this.busquedas[i].PrecioMaxVenta.toString();
          j++;
        } else {
          header[j] = 'Precio Venta';
          datos[j] = 'Min. $' + this.busquedas[i].PrecioMinVenta.toString();
          j++;
        }
      } else if (this.busquedas[i].PrecioMaxVenta !== undefined && this.busquedas[i].PrecioMaxVenta != null) {
        header[j] = 'Precio Venta';
        datos[j] = 'Max. $' + this.busquedas[i].PrecioMaxVenta.toString();
        j++;
      }

      if (this.busquedas[i].PrecioMinArriendo !== undefined && this.busquedas[i].PrecioMinArriendo != null) {
        if (this.busquedas[i].PrecioMaxArriendo !== undefined && this.busquedas[i].PrecioMaxArriendo != null) {
          header[j] = 'Precio Arriendo';
          datos[j] = '$' + this.busquedas[i].PrecioMinArriendo.toString() + ' - $' + this.busquedas[i].PrecioMaxArriendo.toString();
          j++;
        } else {
          header[j] = 'Precio Arriendo';
          datos[j] = 'Min. $' + this.busquedas[i].PrecioMinArriendo.toString();
          j++;
        }
      } else if (this.busquedas[i].PrecioMaxArriendo !== undefined && this.busquedas[i].PrecioMaxArriendo != null) {
        header[j] = 'Precio Arriendo';
        datos[j] = 'Max. $' + this.busquedas[i].PrecioMaxArriendo.toString();
        j++;
      }

      if (this.busquedas[i].Tags !== undefined && this.busquedas[i].Tags != null) {
        let etiquetas = '';
        for (let k = 0; k < this.busquedas[i].Tags.length; k++) {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < this.tagsExistentes.length; index++) {
            if (this.tagsExistentes[index].id.trim() === this.busquedas[i].Tags[k].trim()) {
              etiquetas = etiquetas + this.tagsExistentes[index].Hashtag;
              index = this.tagsExistentes.length;
            }
          }
          if (k !== this.busquedas[i].Tags.length - 1) {
            etiquetas = etiquetas + ', ';
          }
        }
        header[j] = 'Tags';
        datos[j] = etiquetas;
        j++;

      }
      this.data[i] = datos;
      this.headers[i] = header;
    }
  }


  getSearches() {
    this.busquedaService.getBusquedas().subscribe(res => {
      this.busquedas = [];
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].IDCliente === this.id) {
          console.log('Seacrh', res[index]);
          this.busquedas.push(res[index]);
          console.log('Intooo');
        }
      }
      // tslint:disable-next-line:only-arrow-functions
      this.busquedas.sort(function(n1, n2) {
        if (n1.Fecha < n2.Fecha) {
          return 1;
        }
        if (n1.Fecha > n2.Fecha) {
          return -1;
        }
        return 0;
      });
      this.obtenerTags();
      console.log(' getsearches --> TAGS', this.tagsExistentes);
      console.log('SORT', this.busquedas);
      this.mostrarBusquedas();
    });

  }

  obtenerTags() {
    this.inmuService.getTags().subscribe(res => {
      this.tagsExistentes = res;
    });
  }
}

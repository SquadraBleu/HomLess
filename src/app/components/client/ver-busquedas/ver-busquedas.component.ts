
import { Component, OnInit } from '@angular/core';
import { Busqueda } from 'src/app/models/busqueda';
import { Tag } from 'src/app/models/tag';
import { database } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-ver-busquedas',
  templateUrl: './ver-busquedas.component.html',
  styleUrls: ['./ver-busquedas.component.css']
})
export class VerBusquedasComponent implements OnInit {

  public busquedas: Busqueda[] = [];


  public headers: string[][] = [];
  public data: string[][] = [];
  id: any = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busquedaService: BusquedaService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.mostrarBusquedas();
    console.log(this.data);
    console.log(this.headers);
  }

  activarBusqueda(i: number): void {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = true;

    this.busquedaService.updateBusqueda(this.busquedas[i], this.busquedas[i].IDBusqueda);
    this.router.navigate(['inmobiliaria/ver-inmueble/' + this.busquedas[i].IDBusqueda]);
    console.log('Se editó');
    console.log('Activar alerta de busqueda en la posicion ' + i + ' de busquedas');
  }

  desactivarBusqueda(i: number): void {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = false;

    this.busquedaService.updateBusqueda(this.busquedas[i], this.busquedas[i].IDBusqueda);
    this.router.navigate(['inmobiliaria/ver-inmueble/' + this.busquedas[i].IDBusqueda]);
    console.log('Se editó');
    console.log('Desactivar alerta de busqueda en la posicion ' + i + ' de busquedas');
  }


  eliminarBusqueda(i: number): void
  {
    console.log(this.busquedas[i]);
    this.busquedas[i].SiNotificacion = false;
    this.busquedaService.deleteBusqueda(this.busquedas[i].IDBusqueda);
    console.log('Eliminar busqueda en la posicion ' + i + ' de busquedas');
  }

  mostrarBusquedas(): void {
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

     /*if (this.busquedas[i].Tags !== undefined && this.busquedas[i].Tags != null)
      {
        let etiquetas = '';
        for (let k = 0; k < this.busquedas[i].Tags.length; k++)

      /* if (this.busquedas[i].Tags !== undefined && this.busquedas[i].Tags != null)

        {
          let etiquetas = '';
          for (let k = 0; k < this.busquedas[i].Tags.length; k++)
          {
            // etiquetas = etiquetas + this.busquedas[i].Tags[k].Hashtag;
            if (k !== this.busquedas[i].Tags.length - 1)
            {
              etiquetas = etiquetas + ', ';
            }
          }
          header[j] = 'Tags'; datos[j] = etiquetas; j++;
        }*/

      this.data[i] = datos;
      this.headers[i] = header;
    }
  }

  getSearches() {
    this.busquedaService.getBusquedas().subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].IDCliente === this.id) {
          this.busquedas.push(res[index]);
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
    console.log('Busquedas: get()', this.busquedas);
  }

}

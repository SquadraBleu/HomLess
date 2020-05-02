import { Component, OnInit } from '@angular/core';
import { Busqueda } from 'src/app/models/busqueda';
import { Tag } from 'src/app/models/tag';
import { database } from 'firebase';

@Component({
  selector: 'app-ver-busquedas',
  templateUrl: './ver-busquedas.component.html',
  styleUrls: ['./ver-busquedas.component.css']
})
export class VerBusquedasComponent implements OnInit {

  constructor() { }

  public busquedas: Busqueda[] =
    [new Busqueda(null, 'Casa bonita', null, 10, 150, 3, undefined, null, null, 0, 300, null, null, false, null, null),
     new Busqueda(null, 'Apto bonito', 'Casa', undefined, undefined, 3, 2, 'Norte', null, undefined, undefined, 0, 1200000,
                                  true, null, [new Tag('lindo', null, null), new Tag('grande', null, null)])];

  public headers: string[][] = [];
  public data: string[][] = [];

  ngOnInit(): void {
    this.mostrarBusquedas();
    console.log(this.data);
    console.log(this.headers);
  }

  activarBusqueda(i: number): void
  {
    console.log('Activar alerta de busqueda en la posicion ' + i + ' de busquedas');
  }

  desactivarBusqueda(i: number): void
  {
    console.log('Desactivar alerta de busqueda en la posicion ' + i + ' de busquedas');
  }

  eliminarBusqueda(i: number): void
  {
    console.log('Eliminar busqueda en la posicion ' + i + ' de busquedas');
  }

  mostrarBusquedas(): void
  {
    this.headers = [];
    this.data = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.busquedas.length; i++)
    {
      const datos: string[] = [];
      const header: string[] = [];
      let j = 0;
      if (this.busquedas[i].Descripcion !== undefined && this.busquedas[i].Descripcion != null)
        { header[j] = 'Descripción'; datos[j] = this.busquedas[i].Descripcion; j++; }
      if (this.busquedas[i].TipoInmueble !== undefined && this.busquedas[i].TipoInmueble != null)
        { header[j] = 'Tipo'; datos[j] = this.busquedas[i].TipoInmueble; j++; }
      if (this.busquedas[i].AreaMinima !== undefined && this.busquedas[i].AreaMinima != null)
        { header[j] = 'Área Mínima'; datos[j] = this.busquedas[i].AreaMinima.toString(); j++; }
      if (this.busquedas[i].AreaMaxima !== undefined && this.busquedas[i].AreaMaxima != null)
        { header[j] = 'Área Máxima'; datos[j] = this.busquedas[i].AreaMaxima.toString(); j++; }
      if (this.busquedas[i].NBanos !== undefined && this.busquedas[i].NBanos != null)
        { header[j] = 'N° Baños'; datos[j] = this.busquedas[i].NBanos.toString(); j++; }
      if (this.busquedas[i].NHabitaciones !== undefined && this.busquedas[i].NBanos != null)
        { header[j] = 'N° Habitaciones'; datos[j] = this.busquedas[i].NHabitaciones.toString(); j++; }
      if (this.busquedas[i].Zona !== undefined && this.busquedas[i].Zona != null)
        { header[j] = 'Zona'; datos[j] = this.busquedas[i].Zona; j++; }
      if (this.busquedas[i].Localidad !== undefined && this.busquedas[i].Localidad != null)
        { header[j] = 'Localidad'; datos[j] = this.busquedas[i].Localidad; j++; }

      if (this.busquedas[i].PrecioMinVenta !== undefined && this.busquedas[i].PrecioMinVenta != null)
      {
        if (this.busquedas[i].PrecioMaxVenta !== undefined && this.busquedas[i].PrecioMaxVenta != null)
        {
          header[j] = 'Precio Venta';
          datos[j] = '$' + this.busquedas[i].PrecioMinVenta.toString() + ' - $' + this.busquedas[i].PrecioMaxVenta.toString();
          j++;
        }
        else
        {
          header[j] = 'Precio Venta';
          datos[j] = 'Min. $' + this.busquedas[i].PrecioMinVenta.toString();
          j++;
        }
      }
      else if (this.busquedas[i].PrecioMaxVenta !== undefined && this.busquedas[i].PrecioMaxVenta != null)
      {
        header[j] = 'Precio Venta';
        datos[j] = 'Max. $' + this.busquedas[i].PrecioMaxVenta.toString();
        j++;
      }

      if (this.busquedas[i].PrecioMinArriendo !== undefined && this.busquedas[i].PrecioMinArriendo != null)
      {
        if (this.busquedas[i].PrecioMaxArriendo !== undefined && this.busquedas[i].PrecioMaxArriendo != null)
        {
          header[j] = 'Precio Arriendo';
          datos[j] = '$' + this.busquedas[i].PrecioMinArriendo.toString() + ' - $' + this.busquedas[i].PrecioMaxArriendo.toString();
          j++;
        }
        else
        {
          header[j] = 'Precio Arriendo';
          datos[j] = 'Min. $' + this.busquedas[i].PrecioMinArriendo.toString();
          j++;
        }
      }
      else if (this.busquedas[i].PrecioMaxArriendo !== undefined && this.busquedas[i].PrecioMaxArriendo != null)
      {
        header[j] = 'Precio Arriendo';
        datos[j] = 'Max. $' + this.busquedas[i].PrecioMaxArriendo.toString();
        j++;
      }

      if (this.busquedas[i].Tags !== undefined && this.busquedas[i].Tags != null)
      {
        let etiquetas = '';
        for (let k = 0; k < this.busquedas[i].Tags.length; k++)
        {
          etiquetas = etiquetas + this.busquedas[i].Tags[k].Hashtag;
          if (k !== this.busquedas[i].Tags.length - 1)
          {
            etiquetas = etiquetas + ', ';
          }
        }
        header[j] = 'Tags'; datos[j] = etiquetas; j++;
      }

      this.data[i] = datos;
      this.headers[i] = header;
    }
  }

}

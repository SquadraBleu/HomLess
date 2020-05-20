import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';

@Component({
  selector: 'app-representante-chat',
  templateUrl: './representante-chat.component.html',
  styleUrls: ['./representante-chat.component.css']
})
export class RepresentanteChatComponent implements OnInit {

  constructor() { }

  mensajes: Mensaje[] = [new Mensaje('Hola, en que te ayudo?', true, '7:00pm'),
                         new Mensaje('hola, quiero saber sobre la casa', false, '7:02pm'),
                         new Mensaje('Claro, qué quieres saber?', true, '7:05pm'),
                         new Mensaje('El lugar donde queda es seguro?', false, '7:07pm'),
                         new Mensaje('Sí, es un barrio muy seguro ;)', true, '7:12pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm')];

  mensaje: string;

  ngOnInit(): void {
  }

  enviarMensaje(): void
  {
    console.log(this.mensaje);
  }

  terminarChat(): void
  {
    console.log('Chat terminado');
  }

}

import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import {ActivatedRoute, Router} from '@angular/router';

const chatClient = new StreamChat('smdsdgujshu4');

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css']
})

export class ClientChatComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }
  id: any;
  channel: any;
  state: any;
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
    this.id = this.route.snapshot.paramMap.get('id');
    const token = chatClient.devToken(this.id);
    chatClient.setGuestUser({
      id:  this.id
    }).then(() => {
      this.channel = chatClient.channel('messaging', 'miPrimerChat', {
        name: 'éste chat nos va a servir una putería'
      });
      this.state = this.channel.watch();
    });
  }

  enviarMensaje(): void
  {
    const text = 'éste es un mensaje muy bonito';
    const response = this.channel.sendMessage({
      text
    }).then(() => {
      console.log('El mensaje ha sido enviado ' + response);
    });
  }

}

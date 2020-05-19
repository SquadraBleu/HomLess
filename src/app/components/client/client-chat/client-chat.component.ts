import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import {ActivatedRoute, Router} from '@angular/router';

let chatClient = new StreamChat('smdsdgujshu4');

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css']
})

export class ClientChatComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
    chatClient.disconnect();
    chatClient = new StreamChat('smdsdgujshu4');
    this.id = this.route.snapshot.paramMap.get('id');
    const token = chatClient.devToken(this.id);
    chatClient.setGuestUser({
      id:  this.id
    }).then(() => {
      this.channel = chatClient.channel('messaging', 'miPrimerChat', {
        name: this.id
      });
      this.state = this.channel.watch();
      console.log('Va a entrar');
      this.initializeChat();
    });
  }
  id: any;
  channel: any;
  state: any;
  mensajes: Mensaje[] = [/*new Mensaje('Hola, en que te ayudo?', true, '7:00pm'),
                         new Mensaje('hola, quiero saber sobre la casa', false, '7:02pm'),
                         new Mensaje('Claro, qué quieres saber?', true, '7:05pm'),
                         new Mensaje('El lugar donde queda es seguro?', false, '7:07pm'),
                         new Mensaje('Sí, es un barrio muy seguro ;)', true, '7:12pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm')*/];
  mensaje: string;
  ngOnInit(): void {
  }
  initializeChat(): void{
    const text = 'mock' + this.id;
    const response = this.channel.sendMessage({
      text
    }).then(() => {
      console.log(this.channel.state.messages);
      let idChatUser;
      let newMessage;
      let isRepresentante;
      let date;
      let messageHour;
      for (let value of this.channel.state.messages){
        newMessage = value;
        date = new Date(newMessage.created_at);
        messageHour = date.getHours().toString() + ':' + date.getMinutes().toString();
        if ( newMessage.user.id.includes(this.id)){
          isRepresentante = false;
        }
        else {
          isRepresentante = true;
        }
        if (newMessage.text !== 'mock' + this.id){
          this.mensajes.push( new Mensaje(newMessage.text, isRepresentante, date.getHours().toString()));
          console.log('Checking message with guest id: ' + newMessage.user.id);
        }
      }
    });
  }

  enviarMensaje(): void
  {
    const text = this.mensaje;
    const response = this.channel.sendMessage({
      text
    }).then(() => {
      console.log('El mensaje ha sido enviado');
      console.log(this.channel.state.messages);
      const newMessage = this.channel.state.messages[ this.channel.state.messages.length - 1];
      const date = new Date(newMessage.created_at);
      const messageHour = date.getHours().toString() + ':' + date.getMinutes().toString();
      console.log(newMessage.created_at);
      this.mensajes.push( new Mensaje(newMessage.text, false, messageHour));
      this.mensaje = '';
      // this.comprobarMensajes();
    });
  }
  comprobarMensajes(): void
  {
    chatClient = new StreamChat('smdsdgujshu4');
    this.id = this.route.snapshot.paramMap.get('id');
    chatClient.setGuestUser({
      id:  this.id + 'sdfg'
    }).then(() => {
      this.channel = chatClient.channel('messaging', 'miPrimerChat', {
        name: this.id
      });
      this.state = this.channel.watch();
    });
    console.log('hajkflsdjlk;dfsafasdljk;      ' + this.channel.state.messages.length);
    this.channel.on('message.new', event => {
      console.log('recibí un nuevo mensaje', event.message.text);
    });
  }

}

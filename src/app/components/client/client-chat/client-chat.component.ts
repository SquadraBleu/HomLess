import {Component, OnDestroy, OnInit} from '@angular/core';
import {Mensaje} from 'src/app/models/mensaje';
import {StreamChat, ChannelData, Message, User} from 'stream-chat';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {Chat} from '../../../models/chat';

let chatClient: any;

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css']
})

export class ClientChatComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private chatServ: ChatService) {
  }

  id: any;
  channel: any;
  nMensajes: any;
  state: any;
  idInmobiliaria: any;
  idInmueble: any;
  mensajes: Mensaje[] = [/*new Mensaje('Hola, en que te ayudo?', true, '7:00pm'),
                         new Mensaje('hola, quiero saber sobre la casa', false, '7:02pm'),
                         new Mensaje('Claro, qué quieres saber?', true, '7:05pm'),
                         new Mensaje('El lugar donde queda es seguro?', false, '7:07pm'),
                         new Mensaje('Sí, es un barrio muy seguro ;)', true, '7:12pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm'),
                         new Mensaje('Todos viven en felicidad, cantando jiji', true, '7:13pm')*/];
  mensaje: string;

  ngOnInit() {
    console.log('Constructor llamado ');
    chatClient = new StreamChat('smdsdgujshu4');
    this.initializeChat();
    this.nMensajes = 0;
  }

  ngOnDestroy(): void {
    console.log('Destructor llamado');
    chatClient.disconnect();
    this.mensajes = [];
  }

  async initializeChat() {
    this.idInmueble = this.route.snapshot.paramMap.get('idIn');
    this.id = this.route.snapshot.paramMap.get('id');
    this.idInmobiliaria = this.route.snapshot.paramMap.get('idInmo');
    await chatClient.setUser({
      id: this.id,
      name: this.id,
    },
      chatClient.devToken(this.id),
    );
    this.channel = chatClient.channel('messaging', this.id + this.idInmueble, {
    name: this.id,
    members: [this.id, this.id + this.idInmueble],
    invites: [this.id + this.idInmueble]
    });
    this.state = await this.channel.watch();
    this.channel.on('message.new', event => {
      console.log('Arrived new message!');
      let messageH = date.getHours().toString() + ':';
      if ( date.getMinutes() < 10) {
        messageH += '0' + date.getMinutes().toString();
      }
      else{
        messageH += date.getMinutes().toString();
      }
      this.mensajes = [...this.mensajes, new Mensaje(event.message.text, false, messageH)];
    });
    console.log(this.channel.state.messages);
    let newMessage;
    let isRepresentante;
    let date;
    let messageHour;
    // tslint:disable-next-line
    for (let value of this.channel.state.messages) {
      this.nMensajes++;
      newMessage = value;
      date = new Date(newMessage.created_at);
      console.log(date);
      messageHour = date.getHours().toString() + ':';
      if ( date.getMinutes() < 10) {
        messageHour += '0' + date.getMinutes().toString();
      }
      else{
        messageHour += date.getMinutes().toString();
      }
      if (newMessage.user.id.includes(this.id)) {
        isRepresentante = false;
      } else {
        isRepresentante = true;
      }
      if (newMessage.text !== ('This message was deleted.')) {
        this.mensajes.push(new Mensaje(newMessage.text, isRepresentante, messageHour));
        console.log('Checking message with guest id: ' + newMessage.user.id);
      }
    }
  }

  async enviarMensaje() {
    const text = this.mensaje;
    const response = await this.channel.sendMessage({
      text
    });
    console.log('El mensaje ha sido enviado');
    console.log(this.channel.state.messages);
    let newMessage;
    newMessage = this.channel.state.messages[this.channel.state.messages.length - 1];
    const date = new Date(newMessage.created_at);
    const messageHour = date.getHours().toString() + ':' + date.getMinutes().toString();
    console.log(newMessage.created_at);
    this.mensajes.push(new Mensaje(newMessage.text, false, messageHour));
    this.mensaje = '';

    if (this.nMensajes === 0) {
      console.log(this.idInmueble + ': IDInmueble');
      console.log(this.idInmobiliaria + ': IDInmobiliaria');
      console.log(this.id + ': IDCliente');
      this.chatServ.createChat(new Chat(this.id, this.idInmobiliaria, this.idInmueble, '', false));
    }
    this.nMensajes++;
  }

  async eliminarMensajes() {
    for (let i = 0; i < 10 || i < this.channel.state.messages.length; i++) {
      await chatClient.deleteMessage(this.channel.state.messages[i]);
    }
    console.log(this.channel.state.messages.length);
  }

  async comprobarMensajes() {
    this.channel.on('message.new', event => {
      console.log('recibí un nuevo mensaje', event.message.text);
      let date = new Date(event.message.created_at);
      console.log(date);
      let messageHour = date.getHours().toString() + ':';
      if ( date.getMinutes() < 10) {
        messageHour += '0' + date.getMinutes().toString();
      }
      else{
        messageHour += date.getMinutes().toString();
      }
      this.mensajes.push(new Mensaje(event.message.text, true, messageHour));
    });
    this.comprobarMensajes();
  }

  terminarChat(): void
  {
    console.log('Chat terminado');
  }

}

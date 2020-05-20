import {Component, OnDestroy, OnInit} from '@angular/core';
import {Mensaje} from 'src/app/models/mensaje';
import {ChatService} from '../../../services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Chat} from '../../../models/chat';
import {RepresentanteService} from '../../../services/representante.service';
import {Representante} from '../../../models/representante';
import {StreamChat} from 'stream-chat';

let chatClient: any;

@Component({
  selector: 'app-representante-chat',
  templateUrl: './representante-chat.component.html',
  styleUrls: ['./representante-chat.component.css']
})

export class RepresentanteChatComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private chatServ: ChatService,
              private repreServ: RepresentanteService) {
  }

  mensajes: Mensaje[] = [];
  chat: Chat;
  idRepresentante: any;
  idInmobiliaria = '';
  idClient = '';
  idInmueble = '';
  mensaje: string;
  idChat: any;
  idDocChat: any;
  representante: Representante;
  channel: any;
  state: any;

  ngOnInit(): void {
    console.log('Constructor llamado');
    chatClient = new StreamChat('smdsdgujshu4');
    this.initializeChat();
  }

  ngOnDestroy() {
    console.log('Destroy that Chat');
    chatClient.disconnect();
    this.mensajes = [];
  }

  async initializeChat() {
    await this.assignChat();
    await this.delay(2000);
    if (this.idChat === ''){
      return;
    }
    console.log('Finished!');
    await chatClient.setUser({
      id: this.idRepresentante,
      name: this.idChat,
    }, chatClient.devToken(this.idRepresentante));
    this.channel = chatClient.channel('messaging', this.idChat);
    console.log('Connecting to ' + this.idInmueble);
    this.state = await this.channel.watch();
    this.channel.on('message.new', event => {
      console.log('Arrived new message!');
      if (!event.message.user.id.includes(this.idRepresentante)) {
        let messageH = date.getHours().toString() + ':';
        if (date.getMinutes() < 10) {
          messageH += '0' + date.getMinutes().toString();
        } else {
          messageH += date.getMinutes().toString();
        }
        this.mensajes = [...this.mensajes, new Mensaje(event.message.text, false, messageH)];
      } else {
        console.log('Not my business');
      }
    });
    console.log(this.channel.state.messages);
    let newMessage;
    let isRepresentante;
    let date;
    let messageHour;
    // tslint:disable-next-line
    for (let value of this.channel.state.messages) {
      newMessage = value;
      date = new Date(newMessage.created_at);
      console.log(date);
      messageHour = date.getHours().toString() + ':';
      if (date.getMinutes() < 10) {
        messageHour += '0' + date.getMinutes().toString();
      } else {
        messageHour += date.getMinutes().toString();
      }
      console.log(messageHour);
      if (newMessage.user.id.includes(this.idRepresentante)) {
        isRepresentante = true;
      } else {
        isRepresentante = false;
      }
      if (newMessage.text !== ('This message was deleted.')) {
        this.mensajes.push(new Mensaje(newMessage.text, isRepresentante, messageHour));
        console.log('Checking message with guest id: ' + newMessage.user.id);
      }
    }
  }

  async assignChat() {
    this.idRepresentante = this.route.snapshot.paramMap.get('id');
    console.log(this.idRepresentante);
    this.repreServ.getRepresentantes().subscribe(res => {
      for (let repr of res) {
        if (repr.UID === this.idRepresentante) {
          this.idInmobiliaria = repr.IDInmobiliaria;
          this.representante = new Representante(repr.Cedula,
            repr.Nombre,
            repr.Telefono,
            repr.Correo,
            repr.IDInmobiliaria,
            repr.ChatsAceptados,
            repr.id);
          break;
        }
      }
      if (this.idInmobiliaria !== '') {
        this.chatServ.getChats().subscribe(ren => {
          this.idChat = '';
          // tslint:disable-next-line
          for (let uchat of ren) {
            console.log('UCHAT' + uchat.SiAceptado + ' ' + uchat.IDInmobiliaria);
            console.log('Nosotros: ' + this.idRepresentante);
            if (uchat.IDInmobiliaria === this.idInmobiliaria) {
              if (uchat.SiAceptado === false) {
                if (this.representante.ChatsAceptados.length === 0) {
                  this.idChat = uchat.IDCliente + uchat.IDInmueble;
                  this.idClient = uchat.IDCliente;
                  this.idInmueble = uchat.IDInmueble;
                  this.idDocChat = uchat.id;
                  console.log(uchat.id);
                  this.chat = new Chat(this.idClient, this.idInmobiliaria, this.idInmueble, this.idRepresentante, true);
                  this.chatServ.updateChat(this.chat, this.idDocChat);
                  this.representante.ChatsAceptados.push(this.idChat);
                }
              } else if (uchat.IDRepresentante === this.idRepresentante) {
                this.idChat = uchat.IDCliente + uchat.IDInmueble;
                this.idClient = uchat.IDCliente;
                this.idInmueble = uchat.IDInmueble;
                this.idDocChat = uchat.id;
                console.log(uchat.id);
              }
            }
          }
        });
      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async enviarMensaje() {
    if (this.idChat === ''){
      return;
    }
    console.log(this.mensaje);
    const text = this.mensaje;
    const response = await this.channel.sendMessage({
      text
    });
    console.log('El mensaje ha sido enviado');
    console.log(this.channel.state.messages);
    let newMessage;
    newMessage = this.channel.state.messages[this.channel.state.messages.length - 1];
    const date = new Date(newMessage.created_at);
    let messageHour = date.getHours().toString() + ':';
    if (date.getMinutes() < 10) {
      messageHour += '0' + date.getMinutes().toString();
    } else {
      messageHour += date.getMinutes().toString();
    }
    console.log(newMessage.created_at);
    this.mensajes.push(new Mensaje(this.mensaje, true, messageHour));
    this.mensaje = '';
  }

  async comprobarMensajes() {
    while (true) {
      this.channel.on('message.new', event => {
        console.log('recibí un nuevo mensaje', event.message.text);
        const date = new Date(event.message.created_at);
        console.log(date);
        let messageHour = date.getHours().toString() + ':';
        if (date.getMinutes() < 10) {
          messageHour += '0' + date.getMinutes().toString();
        } else {
          messageHour += date.getMinutes().toString();
        }
        this.mensajes.push(new Mensaje(event.message.text, true, messageHour));
      });
    }
  }

  terminarChat(): void {
    if (this.idChat === ''){
      this.router.navigate(['/representante/home/' + this.idRepresentante]);
      return;
    }
    this.mensaje = 'Gracias por usar Homless :) Este chat ha finalizado, recuerda que hablaste con: ';
    this.mensaje += this.representante.Nombre;
    this.enviarMensaje();
    this.representante.ChatsAceptados = [];
    this.repreServ.updateRepresentante(this.representante, this.representante.UID);
    this.chatServ.deleteChat(this.idDocChat);
    this.router.navigate(['/representante/home/' + this.idRepresentante]);
    console.log('Chat terminado');
  }

}

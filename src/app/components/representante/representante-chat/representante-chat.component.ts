import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import {ChatService} from '../../../services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Chat} from '../../../models/chat';
import {RepresentanteService} from '../../../services/representante.service';

@Component({
  selector: 'app-representante-chat',
  templateUrl: './representante-chat.component.html',
  styleUrls: ['./representante-chat.component.css']
})

export class RepresentanteChatComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private chatServ: ChatService,
              private repreServ: RepresentanteService) {
  }

  mensajes: Mensaje[] = [];
  idRepresentante: any;
  mensaje: string;
  idChat: any;
  representante: any;

  ngOnInit(): void {
    console.log('Constructor llamado');
    this.initializeChat();
  }
  initializeChat() {
    this.idChat = this.assignChat();
  }
  assignChat(): string{
    this.idRepresentante = this.route.snapshot.paramMap.get('id');
    const representante = this.repreServ.getRepresentante(this.idRepresentante);
    console.log(representante);
    return '';

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

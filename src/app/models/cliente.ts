export class Cliente {
    constructor(
        public Nombre: string,
        public Cedula: string,
        public Telefono: string,
        public Correo: string,
        public UID: string,
        public Chats: string[],
        public CitasSolicitadas: string[],
        public CitasAceptadas: string[],
        public InteresadoEn: string[]
    ){}
}

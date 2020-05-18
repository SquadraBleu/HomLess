import { Inmueble } from './inmueble';
export class Inmobiliaria {
    constructor(
        public NIT: string,
        public Correo: string,
        public TelefonoContacto: string,
        public Nombre: string,
        public DireccionLogo: string,
        public IDInmobiliria: string,
        public Inmuebles: Inmueble[],
        public UID: string,
    ){}
}

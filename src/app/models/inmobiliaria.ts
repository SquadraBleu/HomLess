import { Inmueble } from './inmueble';
export class Inmobiliaria {
    constructor(
        public NIT: string,
        public correo: string,
        public telefono: string,
        public nombre: string,
        public direccionLogo: string,
        public IDinmobiliria: string,
        public Inmuebles: Inmueble[],
        public UID: string,
    ){}
}
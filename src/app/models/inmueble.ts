export class Inmueble {
    constructor(
        public Titulo: string,
        public Barrio: string,
        public AreaConstruida: number,
        public AreaDeposito: number,
        public MontoArriendo: number,
        public MontoVenta: number,
        public NBanos: number,
        public Descripcion: string,
        public Direccion: string,
        public Estrato: number,
        public NHabitaciones: number,
        public TipoInmueble: string,
        public DirFotos: string[],
        public IDInmobiliaria: string,
        public Localidad: string,
        public Zona: string,
        public TagsIDs: string[]
    ){}
}

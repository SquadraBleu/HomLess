

export class Busqueda {
    constructor(
        public IDBusqueda: string,
        public Descripcion: string,
        public TipoInmueble: string,
        public AreaMinima: number,
        public AreaMaxima: number,
        public NHabitaciones: number,
        public NBanos: number,
        public Zona: string,
        public Localidad: string,
        public PrecioMinVenta: number,
        public PrecioMaxVenta: number,
        public PrecioMinArriendo: number,
        public PrecioMaxArriendo: number,
        public SiNotificacion: boolean,
        public IDCliente: string,
        public Tags: string[],
        public Correo: string,
        public Fecha: number
        
    ){}
}

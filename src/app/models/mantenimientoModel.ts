

export class MantenimientoModel{
    solicitud ?: string;
    serie ?:string;
    tipovalvula ?: string;
    tiposello ?: string;
    diametro ?: string;
    rating ?: string;
    material ?: string;
    otrosdatos ?: string;
    tipomtto ?: string;
    prioridad ?: string;
    dificultad ?: string;
    sitio ?: string;
    cantidad ?: number;
    valor ?: number;
    tareas ? : any[];
    obsTipovalvula ? : string;
    obsCuerpo ? : string;
    obsComponentes ? : string;
    obsTmttoPrioUbi ? : string;
    obsDificultad ? : string;
    estado?: string;
    obsEstado?: string;
    fechaInicio? : Date;
    fechaDetenido? : Date;
    fechaFin?: Date;
    _id ?: string;

    constructor(
      solicitud ?: string,
      serie ?:string,
      tipovalvula ?: string,
      tiposello ?: string,
      diametro ?: string,
      rating ?: string,
      material ?: string,
      otrosdatos ?: string,
      tipomtto ?: string,
      prioridad ?: string,
      dificultad ?: string,
      sitio ?: string,
      cantidad ?: number,
      valor ?: number,
      tareas ? : any[],
      obsTipovalvula ? : string,
      obsCuerpo ? : string,
      obsComponentes ? : string,
      obsTmttoPrioUbi ? : string,
      obsDificultad ? : string,
      estado?: string,
      obsEstado ? : string,
      fechaInicio ?: Date,
      fechaDetenido ?: Date,
      fechaFin ?: Date,
      _id ?: string,
    ){
      this.solicitud = solicitud;
      this.serie = serie;
      this.tipovalvula = tipovalvula;
      this.tiposello = tiposello;
      this.diametro = diametro;
      this.rating = rating;
      this.material = material;
      this.otrosdatos = otrosdatos;
      this.tipomtto = tipomtto;
      this.prioridad = prioridad;
      this.dificultad = dificultad;
      this.sitio = sitio;
      this.cantidad = cantidad;
      this.valor = valor;
      this.tareas = tareas;
      this.estado =estado;
      this.obsEstado = obsEstado;
      this.fechaInicio =fechaInicio;
      this.fechaDetenido =fechaDetenido;
      this.fechaFin =fechaFin;
    }
}


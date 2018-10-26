

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
    fechaInicial? : string;
    fechaDetenido? : string;
    fechaFinal?: string;
    estadoactividades? : boolean;
    cliente? : string;
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
      fechaInicial ?: string,
      fechaDetenido ?: string,
      fechaFinal ?: string,
      estadoactividades ?: boolean,
      cliente? : string,
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
      this.obsTipovalvula = obsTipovalvula;
      this.obsCuerpo = obsCuerpo;
      this.obsComponentes = obsComponentes;
      this.obsTmttoPrioUbi = obsTmttoPrioUbi;
      this.obsDificultad = obsDificultad
      this.tareas = tareas;
      this.estado =estado;
      this.obsEstado = obsEstado;
      this.fechaInicial =fechaInicial;
      this.fechaDetenido =fechaDetenido;
      this.fechaFinal =fechaFinal;
      this.estadoactividades = estadoactividades;
      this.cliente = cliente;
    }
}


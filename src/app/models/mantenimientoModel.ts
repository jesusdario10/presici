

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

    }
}


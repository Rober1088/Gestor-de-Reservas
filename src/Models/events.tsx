export interface Event {
    id: number;                   // serial, autoincrementable
    usuario_id: number; //llave foranea con usuario id en la tabla users
    titulo: string; //titulo del evento
    descripcion: string; //descripcion del evento
    localizacion: string;
    start_time: string;  // Fecha y hora de inicio (timestamp en PostgreSQL)
    end_time: string;    // Fecha y hora de finalización (timestamp en PostgreSQ
}
  
// Models/events.ts
export interface Event {
  id: number;
  titulo: string;
  descripcion: string;
  localizacion: string;
  fecha_inicio: string; // timestamp
  fecha_fin: string;    // timestamp
  
}

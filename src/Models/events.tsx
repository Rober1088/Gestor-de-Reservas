// Models/events.ts
export interface Event {
  id: number;
  titulo: string;
  descripcion: string;
  localizacion: string;
  start_time: string; // o si usas Dayjs, sería Dayjs
  end_time: string;   // o Dayjs
}

export interface Booking {
    id: string;                 // uuid, NOT NULL, default: gen_random_uuid()
    user_id?: string | null;    // uuid, can be null
    event_id?: string | null;   // uuid, can be null
    booking_time?: string;      // timestamp without time zone, default: now()
    status: "pending" | "confirmed" | "canceled";  // text with specific values (check constraint)
    deleted_at?: string | null; // timestamp without time zone, can be null
  }
  
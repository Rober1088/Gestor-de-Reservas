export interface Event {
    id: string;                   // uuid, NOT NULL
    user_id?: string | null;       // uuid, can be null
    title: string;                 // text, NOT NULL
    description?: string | null;   // text, can be null
    location?: string | null;      // text, can be null
    start_time: string;            // timestamp without time zone, NOT NULL
    end_time: string;              // timestamp without time zone, NOT NULL
    is_recurring?: boolean | null; // boolean, default: false
    recurrence_rule?: string | null; // text, can be null
    created_at?: string;           // timestamp without time zone, default: now()
    deleted_at?: string | null;    // timestamp without time zone, can be null
  }
  
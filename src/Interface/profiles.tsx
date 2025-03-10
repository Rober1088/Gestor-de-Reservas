export interface Profile {
    id: string;                  // uuid in SQL
    full_name?: string | null;   // text, can be null
    avatar_url?: string | null;  // text, can be null
    updated_at?: string;         // timestamp without time zone, default value handled in the backend
  }
  
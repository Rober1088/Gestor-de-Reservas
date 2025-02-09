export interface Reminder {
    id: string;
    booking_id?: string | null;
    send_time: string; 
    status?: "pending" | "sent" | "failed";
    created_at?: string;
  }
  
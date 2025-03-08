// usersData.ts
import supabase from './utils/supabase';
import { User } from './Interface/users';

export async function fetchUsersData(): Promise<User[] | null> {
  const { data, error } = await supabase.from('users').select();
  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }
  return data;
}

// remindersData.ts
import { Reminder } from './Interface/reminders';

export async function fetchRemindersData(): Promise<Reminder[] | null> {
  const { data, error } = await supabase.from('reminders').select();
  if (error) {
    console.error('Error fetching reminders:', error);
    return null;
  }
  return data;
}

// profilesData.ts
import { Profile } from './Interface/profiles';

export async function fetchProfilesData(): Promise<Profile[] | null> {
  const { data, error } = await supabase.from('profiles').select();
  if (error) {
    console.error('Error fetching profiles:', error);
    return null;
  }
  return data;
}

// bookingsData.ts
import { Booking } from './Interface/bookings';

export async function fetchBookingsData(): Promise<Booking[] | null> {
  const { data, error } = await supabase.from('bookings').select();
  if (error) {
    console.error('Error fetching bookings:', error);
    return null;
  }
  return data;
}

// eventsData.ts
import { Event } from './Interface/events';

export async function fetchEventsData(): Promise<Event[] | null> {
  const { data, error } = await supabase.from('events').select();
  if (error) {
    console.error('Error fetching events:', error);
    return null;
  }
  return data;
}

import supabase from '../utils/supabase';
import { Employee } from '../Models/employees';
import { Event } from '../Models/events';
import { User } from '../Models/users';

// Función para insertar un empleado
export async function insertEmployee(employee: Omit<Employee, "id">) {
    const { data, error } = await supabase.from("employees").insert([employee]);
    if (error) {
      console.error("Error inserting employee:", error);
      return null;
    }
    return data;
  }
// Función para insertar un evento
export async function insertEvent(event: Event) {
  const { data, error } = await supabase.from('events').insert([event]);
  if (error) {
    console.error('Error inserting event:', error);
    return null;
  }
  return data;
}

// Función para insertar un usuario
export async function insertUser(user: User) {
  const { data, error } = await supabase.from('users').insert([user]);
  if (error) {
    console.error('Error inserting user:', error);
    return null;
  }
  return data;
}

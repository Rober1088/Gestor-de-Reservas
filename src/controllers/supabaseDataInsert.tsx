// services.ts
import supabase from "../utils/supabase";  // Importa la instancia de supabase desde utils

import { Employee } from "../Models/employees";
import { Event } from "../Models/events";
import { User } from "../Models/users";

// Función para insertar un empleado
export async function insertEmployee(employee: Omit<Employee, "id">) {
  const { data, error } = await supabase.from("trabajadores").insert([employee]);
  if (error) {
    console.error("Error inserting employee:", error);
    return null;
  }
  return data;
}

// Función para insertar un evento
export async function insertEvent(event: Omit<Event, "id">) {
  const { data, error } = await supabase.from('eventos').insert([event]);
  if (error) {
    console.error('Error inserting event:', error);
    return null;
  }
  return data;
}


// Función para insertar un usuario
export async function insertUser(user: User) {
  const { data, error } = await supabase.from('usuarios').insert([user]);
  if (error) {
    console.error('Error inserting user:', error);
    return null;
  }
  return data;
}

// Función para obtener empleados
export async function fetchEmployees(): Promise<Employee[] | null> {
  const { data, error } = await supabase.from("trabajadores").select();
  if (error) {
    console.error("Error fetching employees:", error);
    return null;
  }
  return data;
}

// Función para obtener eventos
export async function fetchEvents(): Promise<Event[] | null> {
  const { data, error } = await supabase.from("eventos").select();
  if (error) {
    console.error("Error fetching events:", error);
    return null;
  }
  return data;
}

// Función para obtener usuarios
export async function fetchUsers(): Promise<User[] | null> {
  const { data, error } = await supabase.from("usuarios").select();
  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }
  return data;
}

import supabase from "../utils/supabase";
import { Employee } from "../Models/employees";
import { Event } from "../Models/events";
import { User } from "../Models/users";

export async function fetchEmployees(): Promise<Employee[] | null> {
  const { data, error } = await supabase.from("trabajadores").select();
  if (error) {
    console.error("Error fetching employees:", error);
    return null;
  }
  return data;
}

export async function fetchEvents(): Promise<Event[] | null> {
  const { data, error } = await supabase.from("eventos").select();
  if (error) {
    console.error("Error fetching events:", error);
    return null;
  }
  return data;
}

export async function fetchUsers(): Promise<User[] | null> {
  const { data, error } = await supabase.from("usuarios").select();
  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }
  return data;
}

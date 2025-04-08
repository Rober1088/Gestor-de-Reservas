
import  supabase  from '../utils/supabase';
import { User } from '../Models/users';

// Insertar un nuevo usuario
export async function insertUser(user: User) {
  const { data, error } = await supabase.from('usuarios').insert([user]);
  if (error) {
    console.error('Error inserting user:', error.message);
    return null;
  }
  return data;
}

// Obtener todos los usuarios
export async function getAllUsers() {
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
  return data;
}

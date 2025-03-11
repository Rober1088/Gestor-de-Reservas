export interface Employee {
  id: number;         // ID autoincremental (int4 SERIAL en SQL)
  nombre: string;     // Nombre completo del trabajador
  rol: string;        // Rol del trabajador
  is_admin: boolean;  // Indica si es administrador o no
  contrasena: string; // Contraseña del trabajador
}

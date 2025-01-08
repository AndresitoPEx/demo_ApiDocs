import mysql from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} from "./config.js";

const pool = mysql.createPool({
  host: DB_HOST, // Cambia según tu configuración
  user: DB_USER,      // Usuario de tu base de datos
  password: DB_PASSWORD, // Contraseña de tu base de datos
  database: DB_NAME, // Nombre de tu base de datos
  port: DB_PORT, // Puerto de tu base de datos
});

export default pool;

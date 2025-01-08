import express from "express";
import cors from "cors";
import { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./config.js";
import db from "./db.js";



const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener PDFs por DNI
app.get("/api/pdf/:dni", async (req, res) => {
    const { dni } = req.params;
    console.log("DNI recibido:", dni);
    try {
        const [results] = await db.execute(
            "SELECT * FROM customer_documents WHERE dni = ?",
            [dni]
        );
        console.log("Resultados de la consulta:", results);
        if (results.length > 0) {
            res.json({ success: true, data: results });
        } else {
            res.json({ success: false, message: "No se encontraron PDFs para este DNI." });
        }
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        res.status(500).json({ success: false, error: "Error interno del servidor." });
    }
});


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

console.log("Variables de entorno cargadas:");
console.log("Todas las variables de entorno:", process.env);
console.log("DB_HOST:", DB_HOST);
console.log("DB_USER:", DB_USER);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_NAME:", DB_NAME);
console.log("DB_PORT:", DB_PORT);

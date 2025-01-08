import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import db from "./db.js";



const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener PDFs por DNI
app.get("/api/pdf/:dni", async (req, res) => {
    const { dni } = req.params;
    try {
        const [results] = await db.execute(
            "SELECT * FROM customer_documents WHERE dni = ?",
            [dni]
        );
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


app.listen(PORT, () => console.log(`Servidor corriendo en puerto http://localhost:${PORT}`));

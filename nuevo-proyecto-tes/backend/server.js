import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",   
  database: "login_db", 
  port: 5432
});

//   REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { correo, nombre, password, esVendedor } = req.body;

    if (!correo || !nombre || !password) {
      return res.status(400).json({ ok: false, error: "Faltan datos" });
    }

    // Verificar si ya existe el correo
    const existe = await db.query(
      "SELECT id FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.json({ ok: false, error: "El correo ya existe" });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios (correo, nombre, password, es_vendedor)
      VALUES ($1, $2, $3, $4)
      RETURNING id, correo, nombre, es_vendedor, creado_en
    `;

    const result = await db.query(query, [
      correo,
      nombre,
      hashed,
      esVendedor ?? false
    ]);

    res.json({ ok: true, usuario: result.rows[0] });

  } catch (e) {
    console.error("❌ Error REGISTER:", e);
    res.status(500).json({ ok: false, error: "Error al registrar usuario" });
  }
});

//   LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ ok: false, error: "Faltan datos" });
    }

    // Buscar usuario
    const result = await db.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return res.json({ ok: false, error: "El usuario no existe" });
    }

    const user = result.rows[0];

    // Comparar contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.json({ ok: false, error: "Contraseña incorrecta" });
    }

    res.json({
      ok: true,
      usuario: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        es_vendedor: user.es_vendedor,
        creado_en: user.creado_en
      }
    });

  } catch (e) {
    console.error("❌ Error LOGIN:", e);
    res
      .status(500)
      .json({ ok: false, error: "Error en el inicio de sesión" });
  }
});


app.listen(4000, () =>
  console.log("🚀 Servidor listo en http://localhost:4000")
);

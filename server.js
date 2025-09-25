const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let usuarios = [
    { id: 1, name: "Julito", email: "julito@ejemplo.com" },
    { id: 2, name: "Ana", email: "ana@ejemplo.com" }
];

// Endpoint raíz para probar
app.get("/", (req, res) => {
    res.send("API CRUD Usuarios funcionando correctamente");
});

// Obtener todos los usuarios
app.get("/api/users", (req, res) => {
    res.json(usuarios);
});

// Crear nuevo usuario
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    const newUser = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        name,
        email
    };
    usuarios.push(newUser);
    res.status(201).json(newUser);
});

// Actualizar usuario
app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = usuarios.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
});

// Eliminar usuario
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    usuarios.splice(index, 1);
    res.json({ message: "Usuario eliminado" });
});

// Puerto que Render asigna
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

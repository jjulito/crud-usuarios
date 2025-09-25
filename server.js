const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // para leer JSON
app.use("/api/users", userRoutes); // ruta principal

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("API CRUD Usuarios funcionando correctamente");
});

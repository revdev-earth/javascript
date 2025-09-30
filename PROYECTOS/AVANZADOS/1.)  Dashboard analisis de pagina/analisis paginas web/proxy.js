import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Falta la URL");

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la página");
  }
});

app.listen(4000, () =>
  console.log("✅ Proxy corriendo en http://localhost:4000")
);

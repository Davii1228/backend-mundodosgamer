const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   🔐 CONFIGURAÇÕES DA NUVEMSHOP
================================= */

// 👉 coloque aqui os dados da sua loja
const STORE_ID = "SEU_STORE_ID";
const ACCESS_TOKEN = "SEU_ACCESS_TOKEN";

/* ===============================
   🚀 ROTA PRINCIPAL (TESTE)
================================= */

app.get("/", (req, res) => {
  res.send("🔥 API da loja rodando com sucesso!");
});

/* ===============================
   📦 LISTAR PRODUTOS
================================= */

app.get("/produtos", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nuvemshop.com.br/v1/${STORE_ID}/products`,
      {
        headers: {
          Authentication: `bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "MinhaApp (meuemail@email.com)"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

/* ===============================
   🌎 PORTA DO SERVIDOR
================================= */

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

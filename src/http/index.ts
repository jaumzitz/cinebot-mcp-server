import dotenv from "dotenv";
import express from "express";
import { callLLM } from "../llm/index.js";

dotenv.config();

const PORT = process.env.PORT ?? "3000";

export async function startHttpServer() {
  const app = express();

  app.use(express.json())

  app.get("/", (_req, res) => {
    res.send("Servidor HTTP rodando");
  });

  app.post('/message', async (req, res) => {
        console.log(req.body)

        const message: string = req.body.message

        const response = await callLLM(message)

        res.send(response)

    })

  app.listen(PORT, () => {
    console.log(`Servidor HTTP iniciado na porta ${PORT}`);
  });
}

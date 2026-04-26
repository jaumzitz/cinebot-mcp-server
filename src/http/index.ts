import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import express from "express"
import { callModel } from "../llm/callModel.js";
import { searchMovie } from "../tools/searchMovie.js";
import type { LLMResponse } from "../types/index.js";
import { executeTool } from "../llm/executeTool.js";

dotenv.config();

const PORT = process.env.PORT ?? "3000";


function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["authorization"] as string | undefined;

  if (!apiKey || apiKey !== process.env.HTTP_API_KEY) {
    res.status(401).json({ error: "Não autorizado" });
    return;
  }

  next();
}

export async function startHttpServer() {
  const app = express();

  app.use(express.json())
  app.use(apiKeyAuth)

  app.get("/", (_req, res) => {
    res.send("Servidor HTTP rodando");
  });

  app.post('/message', async (req, res) => {
    console.log(req.body)

    const message: string = req.body.content

    // if (!message || message.trim() == '') {
    //   const noContent = 
    //   res.send()
    // }
    let response: LLMResponse = await callModel(message)


    while (response.functionCalls && response.functionCalls.length > 0) {

      const results = await Promise.all(
        response.functionCalls.map(call => executeTool(call))
      )
      const resultsData =   results.map(r => JSON.stringify(r)).join('\n')
      console.log('ResultsData', resultsData.toString())

      //response = await callModel(`Mensagem do Usuário: ${message}. \nResultado da execução da tool: ${resultsData}. \nDê uma resposta para a pergunta usando linguagem natural`)
      response = await callModel(`FunctionResponseCallID: ${response.functionCalls[0]?.id}\nMensagem do Usuário: ${message}. \nResultado da execução da tool: ${resultsData}. \nDê uma resposta para a pergunta usando linguagem natural`)

     
    }

    res.send(response.text)


  })


  app.get('/movie', async (req, res) => {
    const movieData = await searchMovie(req.body.title, req.body.year)
    res.send(movieData)
  })

  app.listen(PORT, () => {
    console.log(`Servidor HTTP iniciado na porta ${PORT}`);
  });
}

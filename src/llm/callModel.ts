import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import type { LLMResponse, Message } from "../types/index.js";
import { searchMovieFunctionDeclaration } from "../tools/searchMovie.js";

dotenv.config();


export async function callModel(message: string): Promise<LLMResponse> {
  const apiKey = process.env.GEMINI_API_KEY ?? "";
  const ai = new GoogleGenAI({ apiKey });

  const systemMessage: Message[] = [
    {
      role: "system",
      parts: [{ text: "Você é um Agente de IA especializado em filmes e séries e deve falar somente sobre esses assuntos. Se o usuário pedir informações sobre qualquer outro assunto, diga que você só pode ajudar se o assunto for filmes. Voce deve responder sempre em Português do Brasil." }],
    },
    {
      role: "system",
      parts: [{ text: "Acione a tool search_movie quando o usuário solicitar alguma das informações sobre filmes/séries: ano de lançamento, duração, diretor, atores, idiomas, país de origem. Outras informações sobre filmes e séries podem ser respondidas sem acionar a tool." }],
    },
    // {
    //   role: "system",
    //   parts: [{ text: "Se o input do usuário contiver o objeto JSON (resultado da execução da tool search_movie" n" }],
    // }
  ]

  const userMessage: Message[] = [
    {
      role: "user",
      parts: [
        { text: message }
      ]
    }
  ]

  const response = (await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...systemMessage,
      ...userMessage,
    ],
    config: {
      tools: [
        {
          functionDeclarations: [searchMovieFunctionDeclaration],
        },
      ],
    },
  })) as LLMResponse;

  console.log('Response FunctionCall', response.functionCalls)
  console.log('Response Text', response.text)

  return response

}

// Função wrapper com tratamento de erro
// export async function callLLM(message: string): Promise<string> {
//   try {
//     return await callLLMSafe(message);
//   } catch (error: unknown) {
//     console.error('❌ ERRO na função callLLM:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na LLM';
//     return `Ocorreu um erro na LLM: ${errorMessage}`;
//   }
// }


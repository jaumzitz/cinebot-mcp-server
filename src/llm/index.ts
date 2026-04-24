import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

type FunctionCallArgs = Record<string, unknown>;

type LLMFunctionCall = {
  name: string;
  id?: string;
  args?: FunctionCallArgs;
};

type LLMResponse = {
  functionCalls?: LLMFunctionCall[];
  text?: string;
};

export async function callLLM(message: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY ?? "";
  const ai = new GoogleGenAI({ apiKey });

  const searchMovieFunctionDeclaration = {
    name: "search_movie",
    description:
      "When a user asks for information about a movie like director, release year, actors, duration and other stuff this tool calls oMDB API to search for results.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "Title of the movie",
        },
        year: {
          type: Type.STRING,
          description:
            "The year when the movie was released. Usefull for remakes and movies with the same title.",
        },
      },
      required: ["title"],
    },
  };

  const response = (await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "system",
        parts: [
          {
            text: "Você é um Agente de IA especializado em filmes e séries e deve falar somente sobre esses assuntos. Se o usuário pedir informações sobre qualquer outro assunto, diga que você só pode ajudar se o assunto for filmes. Voce deve responder sempre em Português do Brasil.",
          },
        ],
      },
      {
        role: "system",
        parts: [
          {
            text: "Acione a tool search_movie quando o usuário solicitar alguma das informações sobre filmes/séries: ano de lançamento, duração, diretor, atores, idiomas, país de origem. Outras informações sobre filmes e séries podem ser respondidas sem acionar a tool.",
          },
        ],
      },
      { role: "user", parts: [{ text: message }] },
    ],
    config: {
      tools: [
        {
          functionDeclarations: [searchMovieFunctionDeclaration],
        },
      ],
    },
  })) as LLMResponse;

  if (response.functionCalls && response.functionCalls.length > 0) {
    const functionCall = response.functionCalls[0];

    console.log(`Function to call: ${functionCall?.name}`);
    console.log(`ID: ${functionCall?.id}`);
    console.log(`Arguments: ${JSON.stringify(functionCall?.args)}`);

    return `Executando tool: ${functionCall?.name}`;
  }

  console.log("No function call found in the response.");
  console.log(response.text);

  return `Nenhuma tool acionada... \n Resposta da LLM: ${response.text ?? "sem texto"}`;
}

import { Type } from '@google/genai';
import dotenv from 'dotenv'

dotenv.config()

const searchMovieFunctionDeclaration = {
    name: "search_movie",
    description:
      "Quando um usuário pedir alguma das informações a seguir sobre um filme: ano de lançamento, diretor, atores, classificação indicativa, autores, prêmios, notas, país de origem, gênero e poster.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "Título do filme. Você deve obter esse valor do input do usuário.",
        },
        year: {
          type: Type.STRING,
          description:
            "Ano em que o filme foi lançado. Útil para remakes e obras com o mesmo título. Você deve obter esse valor do input do usuário.",
        },
      },
      required: ["title"],
    },
  };

async function searchMovie(title: string, year?: string) {

    const apiKey: string | undefined = process.env.OMDB_API_KEY
    const omdbURL: string | undefined = process.env.OMDB_BASE_URL
    const params = new URLSearchParams()


    if (!omdbURL) return 'URL da API do OMDB não foi encontrada.'
    if (!apiKey) return 'Chave de API do OMDB não encontrada.'
    if (!title) return 'O parâmetro title é obrigatório'

    params.append('apiKey', apiKey)
    params.append('t', title)

    if (year) {
        params.append('y', year)
    }

    try {
        const searchData = await fetch(`${omdbURL}?${params.toString()}`)

        const response = searchData.json()

        return response

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return `Erro ao consultar API do OMDB: ${message}`
    }
}




export { searchMovie, searchMovieFunctionDeclaration }
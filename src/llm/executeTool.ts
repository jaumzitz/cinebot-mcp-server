import { searchMovie } from "../tools/searchMovie.js";
import type { LLMFunctionCall } from "../types/index.js";

export async function executeTool(tool: LLMFunctionCall): Promise<any> {

    if (tool.name === 'search_movie') {
        const searchMovieResult = await searchMovie(tool.args?.title as string, tool.args?.year as string)
        //console.log(searchMovieResult)
        return searchMovieResult
    }


}
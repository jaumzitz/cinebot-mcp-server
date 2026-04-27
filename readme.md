# CineBot MCP Server

O **CineBot MCP Server** é uma implementação do Model Context Protocol (MCP) que integra o poder do Google Gemini com a base de dados cinematográfica do OMDb. Ele permite que LLMs interajam com informações em tempo real sobre filmes e séries para fornecer respostas precisas e estruturadas.

## 🚀 Como Funciona

A aplicação expõe um endpoint HTTP projetado para receber mensagens. O fluxo de inteligência funciona da seguinte forma:

1.  **Entrada:** O usuário envia uma mensagem via HTTP.
2.  **Processamento:** A mensagem é encaminhada ao modelo **Gemini**.
3.  **Decisão Autônoma:** O modelo decide se possui conhecimento suficiente para uma resposta natural ou se deve executar uma tool.
4.  **Tool Execution:** Caso necessário, a ferramenta `search_movie` é acionada, realizando uma requisição à API do **OMDb** para obter detalhes sobre títulos, lançamento, diretores e gêneros.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** & **TypeScript**
* **Google Gemini SDK** (Orquestração e LLM)
* **OMDb API** (Fonte de dados de filmes)
* **Model Context Protocol (MCP)**

---

## 📦 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter o Node.js instalado e as chaves de API necessárias (`GEMINI_API_KEY` e `OMDB_API_KEY`).

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/jaumzitz/cinebot-mcp-server.git
    cd cinebot-mcp-server
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais:
    ```env
    GEMINI_API_KEY=sua_chave_aqui
    OMDB_API_KEY=sua_chave_aqui
    OMDB_BASE_URL=http://omdbapi.com/
    HTTP_API_KEY=chave_da_api_messages
    PORT=porta

    ```

---

## 🏃 Execução

Para rodar o servidor, siga os comandos abaixo:

### 1. Build do projeto
Compile o TypeScript para JavaScript:
```bash
npm run build
```

### 2. Iniciar o servidor
Inicie a aplicação:
```bash
npm run start
```

---

## 🔍 Ferramentas (Tools)

### `search_movie`
Esta ferramenta é o coração do CineBot para consultas externas.
* **Ação:** Realiza uma busca detalhada no OMDb.
* **Uso:** Invocada automaticamente pelo Gemini quando o contexto da conversa exige fatos verificados sobre produções cinematográficas.


---
*Desenvolvido por [jaumzitz](https://github.com/jaumzitz)*

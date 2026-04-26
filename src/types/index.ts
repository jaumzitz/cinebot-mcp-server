export type FunctionCallArgs = Record<string, unknown>;

export type LLMFunctionCall = {
  name: string;
  id?: string;
  args?: FunctionCallArgs;
};

export type LLMResponse = {
  functionCalls?: LLMFunctionCall[];
  text?: string;
};

export interface Message {
  role: "system" | "user",
  parts: MessagePart[]
}

export interface MessagePart {
  text: string
}

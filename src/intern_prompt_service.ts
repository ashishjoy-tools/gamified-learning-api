import { type LLMClient } from "./llm_client.ts";

export class InternPromptService {
    private readonly llmClient: LLMClient;

    constructor(llmClient: LLMClient) {
        this.llmClient = llmClient;
    }

    async processPrompt(prompt: string) {
        const intent = await this.llmClient.determineIntent(prompt);
        return intent;
    }
}
import { type ContextStore } from "./context_store.ts";
import { type LLMClient } from "./llm_client.ts";

export class InternPromptService {
    private readonly llmClient: LLMClient;
    private readonly contextStore: ContextStore;

    constructor(llmClient: LLMClient, contextStore: ContextStore) {
        this.llmClient = llmClient;
        this.contextStore = contextStore;
    }

    async processPrompt(prompt: string) {
        const intent = await this.llmClient.determineIntent(prompt);
        await this.contextStore.save({
          internId: "1",
          topicId: "10",
          prompt,
          intent,
        });
        return intent;
    }
}
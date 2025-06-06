import { PromptGenerator } from "./prompts.ts";

export interface LLMClient {
    determineIntent: (prompt: string) => Promise<string>;
}

export class LlamaClient implements LLMClient {
    private readonly baseUrl: string;
    private readonly promptGenerator: PromptGenerator;
    
    constructor(baseUrl: string, promptGenerator: PromptGenerator) {
        this.baseUrl = baseUrl;
        this.promptGenerator = promptGenerator;
    }

    async determineIntent(prompt: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: "POST",
            body: JSON.stringify({
                model: "llama3.2",
                prompt: this.promptGenerator.generateforIntentDetection(prompt),
                stream: false,
            })
        });
        const body = await response.json();
        console.log(body);
        return JSON.parse(body.response).intent;
    }
}
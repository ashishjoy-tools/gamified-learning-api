export interface LLMClient {
    determineIntent: (prompt: string) => Promise<string>;
}

export class LlamaClient implements LLMClient {
    private readonly baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async determineIntent(prompt: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: "POST",
            body: JSON.stringify({
                model: "llama3.2",
                prompt: this.createContextDeterminationPrompt(prompt),
                stream: false
            })
        });
        const body = await response.json();

        return JSON.parse(body.response).intent;
    }

    createContextDeterminationPrompt(originalPrompt: string): string {
        return `Given the below prompt, determine the intent of the intern as one of the askClarification,requestExercise,submitExercise,goOffTopic,reviewPriorMaterial,expressConfusion. Respond in json, format should be intent: determined intent\r\n\n${originalPrompt}`
    }
}
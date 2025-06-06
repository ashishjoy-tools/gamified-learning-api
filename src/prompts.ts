export type PromptGenerator = {
    generateforIntentDetection: (originalPrompt: string) => string;
}

export const createPromptsGenerator = (): PromptGenerator => {
    const intentPrompt = Deno.readTextFileSync("./prompts/intent_detection.txt");

    return {
        generateforIntentDetection: (originalPrompt) => `${intentPrompt}
        
        ${originalPrompt}`
    }
}
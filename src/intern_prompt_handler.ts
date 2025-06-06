import { Context } from "hono";
import { AppType } from "./types.ts";

export const handleInternPrompt = async (c: Context<AppType>) => {
    const { prompt } = await c.req.json();
    const message = await c.get("internPromptService").processPrompt(prompt);
    
    return c.json({ message });
}
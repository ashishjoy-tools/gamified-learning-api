import {Hono} from "hono";
import { serveStatic } from 'hono/deno'
import { handleInternPrompt } from "./src/intern_prompt_handler.ts";
import { type AppType } from "./src/types.ts";
import { LlamaClient } from "./src/llm_client.ts";
import { InternPromptService } from "./src/intern_prompt_service.ts";

const createApp = () => {
  const llmClient = new LlamaClient("http://localhost:11434");
  const internPromptService = new InternPromptService(llmClient);

  const app = new Hono<AppType>();
  
  app.use("*", serveStatic({root: "public/html"}));
  app.use("*", serveStatic({root: "public"}));
  app.use("*", (c, n) => {
    c.set("internPromptService", internPromptService);
    return n();
  })
  app.post("/api/intern/prompt", handleInternPrompt);

  return app;
}


export default createApp();
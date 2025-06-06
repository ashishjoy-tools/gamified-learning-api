import { serveStatic } from "hono/deno";
import { Hono } from "hono";
import { MongoClient } from "mongodb";
import type { Context } from "./context.ts";
import { ContextStoreImpl } from "./context_store.ts";
import { handleInternPrompt } from "./intern_prompt_handler.ts";
import { InternPromptService } from "./intern_prompt_service.ts";
import { LlamaClient } from "./llm_client.ts";
import type { AppType } from "./types.ts";

const getDb = async () => {
  console.log("creating mongo client...");
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  console.log("created mongo client...");
  return client.db("mydb");
};

export const createApp = async () => {
  const db = await getDb();
  const contextStore = new ContextStoreImpl(db.collection<Context>("context"));

  const llmClient = new LlamaClient("http://localhost:11434");
  const internPromptService = new InternPromptService(llmClient, contextStore);

  const app = new Hono<AppType>();

  app.use("*", serveStatic({ root: "public/html" }));
  app.use("*", serveStatic({ root: "public" }));
  app.use("*", (c, n) => {
    c.set("internPromptService", internPromptService);
    return n();
  });
  app.post("/api/intern/prompt", handleInternPrompt);

  return app;
};

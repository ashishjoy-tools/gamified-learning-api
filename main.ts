import { createApp } from "./src/createApp.ts";

const main = async () => {
  const app = await createApp();
  Deno.serve(app.fetch);
}

main();
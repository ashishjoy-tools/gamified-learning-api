import {Hono} from "hono";
import { serveStatic } from 'hono/deno'


const app = new Hono();

app.use("*", serveStatic({root: "public/html"}));
app.use("*", serveStatic({root: "public"}));
app.post("/api/intern/prompt", async c => {
  console.log(await c.req.json());
  return c.json({message: "A dummy response from the server."})
});

export default app;
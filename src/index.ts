import { Hono } from "hono";
import Replicate from "replicate";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/api/*", cors());

const replicate = new Replicate({
  auth: Bun.env.API_KEY,
});

app.get("/api", (c) => c.text("Welcome to Summarize.ai API"));

app.post("/api/summarize", async (c) => {
  const body = await c.req.json();
  const output = await replicate.run(
    "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
    {
      input: {
        prompt: `Please summarize the following article: ${body.url}`,
      },
    }
  );
  return c.json(output);
});

export default app;

import "dotenv/config";
import path from "node:path";
import express from "express";
import { getStore } from "./server/centralStore";
import { createApplication } from "./server/app";
async function start() {
  const store = getStore();
  await store.repository.read();
  const app = createApplication(store);
  if (process.env.NODE_ENV !== "production") {
    const {createServer:createViteServer}=await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const dist = path.resolve("dist");
    app.use(express.static(dist));
    app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
  }
  const port = Number(process.env.PORT || 3000);
  app.listen(port, "0.0.0.0", () =>
    console.log(`FluiLer disponível na porta ${port}`),
  );
}
start().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

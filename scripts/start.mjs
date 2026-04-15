import { spawn } from "node:child_process";
import { resolve } from "node:path";

const port = process.env.PORT || "3000";
const host = process.env.HOST || "0.0.0.0";
const nextBin = resolve(process.cwd(), "node_modules/next/dist/bin/next");

const child = spawn(process.execPath, [nextBin, "start", "-H", host, "-p", String(port)], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

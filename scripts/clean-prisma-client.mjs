import { rmSync } from "node:fs";
import { resolve, sep } from "node:path";

const target = resolve(process.cwd(), "src/generated/prisma");
const workspace = resolve(process.cwd());

if (!target.startsWith(`${workspace}${sep}`)) {
  throw new Error(`Refusing to clean path outside workspace: ${target}`);
}

rmSync(target, { recursive: true, force: true });

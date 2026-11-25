import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const source = join(import.meta.dirname, "entry.png");
const output = join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.png");
const image = readFileSync(source);

if (image.length > 1_048_576 || image[0] !== 0xff || image[1] !== 0xd8) {
  throw new Error("Submission image must be a JPEG no larger than 1 MiB");
}

mkdirSync(dirname(output), { recursive: true });
copyFileSync(source, output);

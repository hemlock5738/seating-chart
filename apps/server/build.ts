import { gasPlugin } from "@hemlock5738/esbuild-plugin-gas";
import esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    entryPoints: ["src/index.ts"],
    format: "iife",
    globalName: "_",
    minify: true,
    outfile: "dist/index.js",
    plugins: [gasPlugin()],
    write: false,
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

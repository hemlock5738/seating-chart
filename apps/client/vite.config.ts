import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const serverConfig = () =>
  defineConfig({
    plugins: [react()],
  });

const buildDevlopmentConfig = () =>
  defineConfig({
    plugins: [react(), viteSingleFile()],
    root: "root",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
  });

const buildProductionConfig = () =>
  defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
      outDir: "dist",
    },
  });

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return serverConfig();
  }
  if (command === "build") {
    if (mode === "development") {
      return buildDevlopmentConfig();
    }
    if (mode === "production") {
      return buildProductionConfig();
    }
  }
  return {};
});

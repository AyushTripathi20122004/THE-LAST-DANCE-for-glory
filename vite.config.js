import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base:'/THE-LAST-DANCE-for-glory/',
  assetsInclude: ["**/*.glb","**/*.hdr"]
});
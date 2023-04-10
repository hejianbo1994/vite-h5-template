import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/plugins/svgBuilder";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === "production" ? "/spacezhu-utils/" : "/",
    plugins: [vue(), svgBuilder("./src/assets/icons/svg/")],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3002",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    base: "/utils/",
  };
});

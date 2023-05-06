// https://vitejs.dev/config/
// https://cn.vitejs.dev/config/build-options.html

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: "./type.js",
      formats: ["es", "cjs"],
    },
  },
});

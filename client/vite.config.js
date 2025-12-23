
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/",          // 🔥 THIS FIXES CSS ISSUE ON RENDER
//   build: {
//     outDir: "dist",
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 🔥 REQUIRED FOR TAILWIND v4
  ],
  base: "/",
});

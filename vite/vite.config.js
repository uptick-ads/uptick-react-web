import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Until the first npm release the SDK is installed from a react-web-sdk checkout next to this repository (file:../../react-web-sdk), whose own node_modules holds a dev copy of React; dedupe keeps a single React in the app.
  // Not needed when the package is installed from npm.
  resolve: { dedupe: ["react", "react-dom"] },
});

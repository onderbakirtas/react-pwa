import { defineConfig } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.svg", "masked-icon.svg", "apple-touch-icon.png"],
  manifest: {
    name: "PX PWA",
    short_name: "PX PWA",
    theme_color: "#FF6000",
    background_color: "#FFECE1",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple-touch-icon",
      },
      {
        src: "/maskable-icon.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "maskable",
      }
    ],
  },
  devOptions: {
    enabled: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(pwaConfig)],
});

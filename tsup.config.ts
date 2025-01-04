import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry point utama
  outDir: 'dist',          // Direktori output
  format: ['esm', 'cjs'],  // Format output
  dts: true,               // Hasilkan deklarasi TypeScript
  clean: true,             // Bersihkan direktori output sebelum build
  sourcemap: true,         // Tambahkan sourcemap
  minify: true             // Aktifkan minifikasi
});

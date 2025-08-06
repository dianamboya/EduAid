// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/postcss';
// import autoprefixer from 'autoprefixer';

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(),
//         autoprefixer()
//       ]
//     }
//   }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwind(), react()],
});

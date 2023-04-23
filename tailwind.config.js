/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      colors: {
        blue: {"50":"#FFEFC8","100":"#F6D488","200":"#F1BF61","300":"#EBB146","400":"#E3A12F","500":"#D79117","600":"#A76803","700":"#845000","800":"#854d0e","900":"#6C3F00"}
      }
    },
  },

  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};

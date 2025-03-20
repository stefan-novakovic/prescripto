/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#5F6FFF'
         },
         screens: {
            c375: '375px',
            c450: '450px',
            hoverable: { raw: '(hover: hover) and (pointer: fine)' }
         }
      }
   },
   plugins: []
};

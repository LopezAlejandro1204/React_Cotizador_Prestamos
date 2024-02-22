/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", /** */
    "./src/**/*.{js,ts,jsx,tsx}" /**Aqui indicamos que todos los archivos con esa
                                    extension responden al contenido ademas que
                                    lo que vamos a tener en src no sabemos q tipo
                                    de archivo es */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


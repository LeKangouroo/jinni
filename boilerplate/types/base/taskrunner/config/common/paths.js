export default {
  sources: {
    html: {
      default: [
        "src/html/**/*.html",
        "!src/html/_includes/**"
      ],
      directory: "src/html",
      watch: "src/**/*.html"
    },
    images: "src/**/*.{jpg,png,gif}",
    js: {
      default: "src/js/*.js",
      watch: "src/**/*.js"
    },
    sass: {
      default: "src/sass/*.scss",
      watch: "src/**/*.scss"
    },
    svg: "src/assets/images/icons/svg/*.svg",
    todos: [
      "src/**/*.{js,jsx,html,scss,sass}",
      "!src/vendors/**",
    ]
  },
  builds: {
    css: {
      development: "tmp/css",
      distributable: "dist/css"
    },
    html: {
      development: "tmp",
      distributable: "dist"
    },
    images: {
      development: "tmp",
      distributable: "dist"
    },
    js: {
      development: "tmp/js",
      distributable: "dist/js"
    },
    svg: {
      development: "tmp/assets/images/sprites",
      distributable: "dist/assets/images/sprites"
    },
    todos: {
      development: "tmp",
      distributable: "dist"
    }
  },
  staticFiles: {
    base: "src",
    source: [
      "src/assets/**",
      "src/vendors/**",
      "!src/**/*.{jpg,png,gif}"
    ],
    destination: "dist"
  }
}

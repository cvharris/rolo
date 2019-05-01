const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' &&
      purgecss({
        content: ['./src/**/*.js', './public/**/*.html'],
        css: ['./src/styles/tailwind.css'],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['js', 'html']
          }
        ]
      })
  ]
}

import fs from 'fs'
import path from 'path'
import CleanCSS from 'clean-css'

import { editorCss } from '../src/styles/editor'
import { defaultCssTheme } from '../src/styles/theme-default'

const minifier = new CleanCSS()

const styles = [
  {
    filename: 'editor.min.css',
    module: editorCss
  },
  {
    filename: 'theme-default.min.css',
    module: defaultCssTheme
  }
]

styles.forEach(style => {
  const minified = minifier.minify(style.module)
  try {
    fs.writeFileSync(
      path.join(__dirname, '..', 'build/css', style.filename),
      minified.styles,
      'utf8'
    )
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

console.log('Static styles exported successfully.')

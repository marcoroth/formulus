import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

const revision = require('child_process').execSync('git rev-parse HEAD').toString().trim()

import { version } from './package.json'
const year = new Date().getFullYear()
const banner = `/*\n * Formulus ${version} \n * Build ${revision}\n * https://github.com/marcoroth/formulus\n */`

const comments = function (node, comment) {
  const { value, type } = comment
  if (type === "comment2") {
    return /@preserve|@license|@cc_on|Formulus/i.test(value);
  }
}

const pretty = () => {
  return terser({
    mangle: false,
    compress: false,
    format: {
      beautify: true,
      indent_level: 2,
      comments
    }
  })
}

const minify = () => {
  return terser({
    mangle: true,
    compress: true,
    format: { comments}
  })
}

const umd = {
  name: 'Formulus',
  format: 'umd',
  banner,
  globals: {
    '@hotwired/stimulus': 'Stimulus'
  }
}

const es = {
  format: 'es',
  banner
}

export default [
  {
    input: 'src/index.ts',
    external: [
      '@hotwired/stimulus'
    ],
    output: [
      {...umd, file: 'dist/index.umd.js',     plugins: [pretty()] },
      {...umd, file: 'dist/index.umd.min.js', plugins: [minify()]},
      {...es,  file: 'dist/index.js',         plugins: [pretty()]},
      {...es,  file: 'dist/index.min.js',     plugins: [minify()]},
    ],
    plugins: [
      resolve(),
      typescript(),
      filesize()
    ],
    watch: {
      include: 'src/**'
    }
  }
]

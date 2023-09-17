import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { readFileSync } from "fs"

const json = JSON.parse(readFileSync("./package.json"))
const banner = `/*\n * Formulus ${json.version}\n */`

const pretty = () => {
  return terser({
    mangle: false,
    compress: false,
    format: {
      comments: "all",
      beautify: true,
      indent_level: 2,
    }
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
      {...es,  file: 'dist/index.js',         plugins: [pretty()]},
    ],
    plugins: [
      resolve(),
      typescript()
    ],
    watch: {
      include: 'src/**'
    }
  }
]

import * as esbuild from 'esbuild'
import { copySync } from 'fs-extra/esm'
import svgr from 'esbuild-plugin-svgr'

const FIREFOXOUTPUT = './firefox-extension'

const files = [
  { out: 'popup/popup', in: './src/popup/popup.css' },
  { out: 'popup/popup', in: './src/popup/popup.html' },
  { out: 'popup/popup', in: './src/popup/index.jsx' },
  { out: 'popup/jscolor.min', in: './src/popup/jscolor.min.js' },
  { out: 'contentScript', in: './src/contentScript.js' },
  { out: 'background', in: './src/background.js' },
  { out: 'script', in: './src/script.js' }
]

esbuild.build({
  entryPoints: files,
  minify: true,
  bundle: true,
  outdir: FIREFOXOUTPUT,
  loader: { '.html': 'copy' },
  plugins: [svgr()]
}).then(() => {
  copySync('./src/assets', `${FIREFOXOUTPUT}/assets`)
  copySync('./src/_locales', `${FIREFOXOUTPUT}/_locales`)
  copySync('./manifestV2.json', `${FIREFOXOUTPUT}/manifest.json`)
  copySync('./src/legacyVerifiedUsers1.js', `${FIREFOXOUTPUT}/legacyVerifiedUsers1.js`)
  copySync('./src/legacyVerifiedUsers2.js', `${FIREFOXOUTPUT}/legacyVerifiedUsers2.js`)
}).catch(error => {
  console.log('Build failed in buildFirefox:' + error)
})

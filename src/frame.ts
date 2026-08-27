// SVG em data URI mantém a moldura versionável como texto (sem arquivos binários).
// O navegador a trata como uma imagem, da mesma forma que uma moldura PNG.
const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <circle cx="400" cy="400" r="394" fill="none" stroke="#121212" stroke-width="28"/>
  <circle cx="400" cy="400" r="347" fill="none" stroke="#ccff00" stroke-width="34"/>
  <circle cx="400" cy="400" r="316" fill="none" stroke="#121212" stroke-width="14"/>
  <path d="M122 197h106M572 603h106" stroke="#ff3b30" stroke-width="12" stroke-linecap="round"/>
</svg>`

export const frameUrl = `data:image/svg+xml,${encodeURIComponent(frameSvg)}`

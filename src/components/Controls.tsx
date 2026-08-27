type Props = { hasImage: boolean; scale: number; rotation: number; onScale: (value: number) => void; onRotate: () => void; onCenter: () => void; onDownload: () => void }

export function Controls({ hasImage, scale, rotation, onScale, onRotate, onCenter, onDownload }: Props) {
  if (!hasImage) return null
  return <section className="controls" aria-label="Ajustes da imagem">
    <div className="control-label"><label htmlFor="zoom">Zoom</label><output htmlFor="zoom">{scale}%</output></div>
    <input id="zoom" type="range" min="1" max="100" value={scale} onChange={(event) => onScale(Number(event.target.value))} />
    <div className="quick-actions"><button type="button" onClick={onRotate}>↻ Girar {rotation}°</button><button type="button" onClick={onCenter}>◎ Centralizar</button></div>
    <button type="button" className="download" onClick={onDownload}>Baixar Imagem <span aria-hidden="true">↓</span></button>
  </section>
}

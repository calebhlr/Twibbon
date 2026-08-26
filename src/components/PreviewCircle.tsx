import { type PointerEvent } from 'react'
import { frameUrl } from '../frame'

export type Transform = { x: number; y: number; scale: number; rotation: number }
type Props = { imageUrl: string | null; transform: Transform; onTransform: (updater: (previous: Transform) => Transform) => void }

export function PreviewCircle({ imageUrl, transform, onTransform }: Props) {
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!imageUrl) return
    const preview = event.currentTarget
    preview.setPointerCapture(event.pointerId)
    const start = { x: event.clientX, y: event.clientY, imageX: transform.x, imageY: transform.y }
    const move = (moveEvent: globalThis.PointerEvent) => onTransform(previous => ({ ...previous, x: start.imageX + moveEvent.clientX - start.x, y: start.imageY + moveEvent.clientY - start.y }))
    const up = () => { preview.removeEventListener('pointermove', move); preview.removeEventListener('pointerup', up) }
    preview.addEventListener('pointermove', move)
    preview.addEventListener('pointerup', up)
  }
  return <section className={'preview-shell' + (imageUrl ? ' has-image' : '')} aria-label="Prévia da sua imagem">
    <div className="preview" onPointerDown={pointerDown} title={imageUrl ? 'Arraste para reposicionar a foto' : undefined}>
      {imageUrl ? <img className="user-photo" src={imageUrl} alt="Sua foto para personalização" draggable="false" style={{ transform: `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${transform.scale / 50}) rotate(${transform.rotation}deg)` }} /> : <div className="empty-preview"><span>◎</span><b>Sua foto aqui</b><small>Escolha uma imagem para começar</small></div>}
      <img className="frame" src={frameUrl} alt="Moldura Deputado Gandini 20.000" />
    </div>
    {imageUrl && <p className="drag-tip">↔ Arraste a foto para reposicionar</p>}
  </section>
}

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { PreviewCircle, type Transform } from './components/PreviewCircle'
import { Controls } from './components/Controls'
import { Footer } from './components/Footer'
import { frameUrl } from './frame'

const initialTransform: Transform = { x: 0, y: 0, scale: 50, rotation: 0 }

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [transform, setTransform] = useState(initialTransform)
  const galleryRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl) }, [imageUrl])
  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Selecione um arquivo de imagem válido (JPG, PNG ou WEBP).'); return }
    setError(''); setTransform(initialTransform)
    setImageUrl(previous => { if (previous) URL.revokeObjectURL(previous); return URL.createObjectURL(file) })
  }
  const openCamera = async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      stream.getTracks().forEach(track => track.stop())
      cameraRef.current?.click()
    } catch {
      setError('Não foi possível acessar a câmera. Verifique a permissão do navegador ou escolha uma imagem pela galeria.')
    }
  }
  const exportImage = async () => {
    if (!imageUrl) return
    const [photo, frame] = await Promise.all([loadImage(imageUrl), loadImage(frameUrl)])
    const size = 1600; const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size
    const context = canvas.getContext('2d'); if (!context) return
    context.save(); context.beginPath(); context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); context.clip()
    context.translate(size / 2 + transform.x * 4, size / 2 + transform.y * 4); context.rotate(transform.rotation * Math.PI / 180)
    const base = Math.max(size / photo.width, size / photo.height) * (transform.scale / 50)
    context.drawImage(photo, -photo.width * base / 2, -photo.height * base / 2, photo.width * base, photo.height * base); context.restore()
    context.drawImage(frame, 0, 0, size, size)
    const link = document.createElement('a'); link.download = 'camply-90000.png'; link.href = canvas.toDataURL('image/png'); link.click()
  }
  return <main><Header /><PreviewCircle imageUrl={imageUrl} transform={transform} onTransform={setTransform} />
    <section className="upload-actions" aria-label="Escolha sua foto">
      <input ref={cameraRef} className="sr-only" id="camera" type="file" accept="image/*" capture="user" onChange={selectImage} />
      <input ref={galleryRef} className="sr-only" id="gallery" type="file" accept="image/*" onChange={selectImage} />
      <button type="button" className="primary" onClick={openCamera}>⌁ Tirar Selfie</button>
      <button type="button" className="secondary" onClick={() => galleryRef.current?.click()}>▧ Galeria</button>
    </section>
    <p className="permission-note" role="note">Ao abrir a câmera, permita o acesso quando seu navegador solicitar.</p>
    {error && <p className="error" role="alert">{error}</p>}
    <Controls hasImage={!!imageUrl} scale={transform.scale} rotation={transform.rotation} onScale={scale => setTransform(previous => ({ ...previous, scale }))} onRotate={() => setTransform(previous => ({ ...previous, rotation: (previous.rotation + 90) % 360 }))} onCenter={() => setTransform(previous => ({ ...previous, x: 0, y: 0 }))} onDownload={exportImage} />
    <Footer />
  </main>
}

function loadImage(source: string) { return new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = source }) }

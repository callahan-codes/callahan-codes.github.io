import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

export default function SceneBloom() {
  return (
    <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} levels={6} intensity={2} />
        <ToneMapping />
    </EffectComposer>
  )
}
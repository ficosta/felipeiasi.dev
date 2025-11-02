import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stage, useGLTF } from "@react-three/drei"
import { Suspense } from "react"

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} />
}

export default function Hero3D({ glb }: { glb?: string }) {
  if (!glb) return null
  return (
    <div className="h-[52vh] w-full">
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} adjustCamera>
            <Model url={glb} />
          </Stage>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2} />
      </Canvas>
    </div>
  )
}

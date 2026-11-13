
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Sphere,
  Torus,
} from "@react-three/drei";

function Sculpture() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y +=
      (state.pointer.x * 0.25 - group.current.rotation.y) * 0.025;

    group.current.rotation.x +=
      (-state.pointer.y * 0.2 - group.current.rotation.x) * 0.025;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <Sphere args={[1.15, 64, 64]} scale={[1, 1.12, 0.82]}>
          <MeshDistortMaterial
            color="#d99dbb"
            roughness={0.22}
            metalness={0.12}
            distort={0.35}
            speed={2}
          />
        </Sphere>

        <Torus args={[1.45, 0.035, 16, 100]} rotation={[1, 0.4, 0.5]}>
          <meshStandardMaterial
            color="#f6dfc9"
            metalness={0.85}
            roughness={0.2}
          />
        </Torus>

        <mesh position={[1.35, 0.65, 0.1]} scale={0.24}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#b8c8a8"
            metalness={0.45}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[-1.35, -0.7, 0.3]} scale={0.16}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#f5d7b8"
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function DreamScene() {
  return (
    <div className="dream-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} color="#f0a8c9" intensity={2} />

        <Sculpture />

        <Sparkles
          count={35}
          scale={5}
          size={2}
          speed={0.25}
          color="#fff4e8"
        />
      </Canvas>
    </div>
  );
}

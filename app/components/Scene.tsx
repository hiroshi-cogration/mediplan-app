'use client';

import { useRef } from 'react'; // 'React' のインポートを削除
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 回転する立方体のコンポーネント
function Box(props: JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'royalblue'} />
    </mesh>
  );
}

// 3Dシーン全体を定義するコンポーネント
export default function Scene() {
  return (
    <Canvas style={{ background: '#202020' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}
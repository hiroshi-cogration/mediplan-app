'use client';

import React, { useRef } from 'react'; // FIX: 'React' を明示的にインポート
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 回転する立方体のコンポーネント
function Box(props: JSX.IntrinsicElements['mesh']) {
  // useRefフックでメッシュへの参照を保持
  const meshRef = useRef<THREE.Mesh>(null!);

  // useFrameフックで毎フレームのアニメーションを定義
  useFrame((state, delta) => {
    // Y軸周りに少しずつ回転させる
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
      {/* 環境光: シーン全体を均一に照らす */}
      <ambientLight intensity={0.5} />
      {/* 点光源: 特定の位置から光を放つ */}
      <pointLight position={[10, 10, 10]} />
      
      {/* 回転する立方体を表示、初期位置を調整 */}
      <Box position={[0, 0, 0]} />

      {/* カメラコントロール: マウスで視点を操作できるようにする */}
      <OrbitControls />
    </Canvas>
  );
}
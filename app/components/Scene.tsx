'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

// GLBモデルを読み込んで表示するコンポーネント
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  // GPTの推奨する、より安全な方法でシーンを処理
  const processedScene = useMemo(() => {
    const newScene = scene.clone();
    newScene.traverse(child => {
      // FIX: 'instanceof' を使って、childがMeshであることをTypeScriptに正しく伝える
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        // マテリアルが配列の場合と単一の場合の両方に対応
        if (Array.isArray(material)) {
          child.material = material.map(mat => {
            const clonedMat = mat.clone();
            clonedMat.side = THREE.DoubleSide;
            return clonedMat;
          });
        } else {
          const clonedMat = material.clone();
          clonedMat.side = THREE.DoubleSide;
          child.material = clonedMat;
        }
      }
    });
    return newScene;
  }, [scene]);

  return <primitive object={processedScene} />;
}

// 3Dシーン全体を定義するコンポーネント
export default function Scene() {
  const modelUrl = '/models/step01.glb';

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-full">Loading 3D Model...</div>}>
      <Canvas style={{ background: '#384047' }} camera={{ position: [-1.5, 1, 8], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight intensity={1.8} position={[5, 10, 7.5]} />
        
        <Center>
          <Model url={modelUrl} />
        </Center>

        <OrbitControls makeDefault enableDamping />
      </Canvas>
    </Suspense>
  );
}
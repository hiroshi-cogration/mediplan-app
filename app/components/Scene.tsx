'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

// GLBモデルを読み込んで表示するコンポーネント
function Model({ url }: { url: string }) {
  // useGLTFフックでモデルを非同期に読み込む
  // publicフォルダからのパスを指定
  const { scene } = useGLTF(url);

  // プロトタイプのロジックと同様に、読み込んだモデルの全メッシュに設定を適用
  const processedScene = useMemo(() => {
    const newScene = scene.clone(); // 元のシーンをクローンして変更
    newScene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        // ダブルサイドレンダリングを有効化
        child.material = (child as THREE.Mesh).material.clone();
        (child as THREE.Mesh).material.side = THREE.DoubleSide;
      }
    });
    return newScene;
  }, [scene]);

  // primitive objectとしてシーンを描画
  return <primitive object={processedScene} />;
}

// 3Dシーン全体を定義するコンポーネント
export default function Scene() {
  // まずはステップ1のモデルをハードコーディングで表示
  const modelUrl = '/models/step01.glb';

  return (
    // Suspenseは、3Dモデルのような重いデータの読み込みが終わるまで待機するためのReactの機能
    <Suspense fallback={<div className="loading">Loading 3D Model...</div>}>
      <Canvas style={{ background: '#384047' }} camera={{ position: [-1.5, 1, 8], fov: 50 }}>
        {/* 環境光と指向性光をプロトタイプに合わせて設定 */}
        <ambientLight intensity={1.2} />
        <directionalLight intensity={1.8} position={[5, 10, 7.5]} />
        
        {/* Centerコンポーネントがモデルを自動で中央に配置し、サイズを調整してくれる */}
        <Center>
          <Model url={modelUrl} />
        </Center>

        {/* カメラコントロール */}
        <OrbitControls makeDefault enableDamping />
      </Canvas>
    </Suspense>
  );
}
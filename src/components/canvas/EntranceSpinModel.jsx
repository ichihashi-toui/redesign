// src/components/canvas/EntranceSpinModel.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const EntranceSpinModel = ({ modelPath, baseScale = 1 }) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef();
  
  // 登場アニメーションが終わったかどうかの判定
  const [isEntered, setIsEntered] = useState(false);

  // 初期状態：大きさは0、角度はマイナス1周（-360度）からスタート
  const currentScale = useRef(0);
  const currentRotation = useRef(-Math.PI * 2);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isEntered) {
      // イージング（滑らかな減速）をかけながら、指定の大きさと角度（正面）に戻す
      currentScale.current = THREE.MathUtils.damp(currentScale.current, baseScale, 3, delta);
      currentRotation.current = THREE.MathUtils.damp(currentRotation.current, 0, 3, delta);

      groupRef.current.scale.setScalar(currentScale.current);
      groupRef.current.rotation.y = currentRotation.current;

      // 目標の大きさにほぼ到達したらアニメーション完了
      if (baseScale - currentScale.current < 0.01) {
        groupRef.current.scale.setScalar(baseScale);
        groupRef.current.rotation.y = 0;
        setIsEntered(true);
      }
    } else {
      // 🌟 登場後もほんの少しだけ自転させ続けると、さらに「触れる感」が出ます
      // 完全に止めたい場合はこの行を消してください
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        // マウスオーバーで指マークにしてクリックできることをアピール
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      />
    </group>
  );
};

export default EntranceSpinModel;
/*
 * :file description:
 * :name: /react-three-fiber/src/App.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-07 19:36:38
 * :last editor: 张德志
 * :date last edited: 2024-03-13 23:21:19
 */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, } from '@react-three/drei';
import './App.css';

function App() {
  return (
    <div className="app">
      <Canvas>
        <OrbitControls/>
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;

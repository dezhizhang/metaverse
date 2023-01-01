/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:33:33
 * :last editor: 张德志
 * :date last edited: 2023-01-01 21:42:11
 */
import React,{ useRef,useEffect } from "react";
import { WebGLRenderer } from 'three';
import styles from './index.less';


const Scene:React.FC = () => {
    const ref = useRef(null);

    useEffect(() => {
        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        (ref.current as any).appendChild(renderer.domElement);
    },[])

    return <div ref={ref} className={styles.container}/>
}

export default Scene;

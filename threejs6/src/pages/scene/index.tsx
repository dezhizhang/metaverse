/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:33:33
 * :last editor: 张德志
 * :date last edited: 2023-01-01 21:49:34
 */
import React,{ useRef,useEffect } from "react";
import styles from './index.less';
import TEngine from './TEngine';


const Scene:React.FC = () => {
    const ref = useRef(null);

    useEffect(() => {
        new TEngine(ref.current as any);
    },[])

    return <div ref={ref} className={styles.container}/>
}

export default Scene;

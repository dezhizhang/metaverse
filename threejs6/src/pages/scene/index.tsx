/*
 * :file description:
 * :name: /threejs6/src/pages/scene/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:33:33
 * :last editor: 张德志
 * :date last edited: 2023-04-03 06:54:20
 */
import React, { useRef, useEffect } from 'react';
import styles from './index.less';
import TEngine from './TEngine';
import { lightsList } from './TLights';
import {helperList} from './THelper';
import { basicObjectList } from './TBasicObject';
import { codeModelList } from './TCodeModel';

const Scene: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    const TE = new TEngine(ref.current as any);
    // TE.addObject(...basicObjectList);
    TE.addObject(...lightsList);
    TE.addObject(...helperList);
    TE.addObject(...codeModelList)

  }, []);

  return <div ref={ref} className={styles.container} />;
};

export default Scene;

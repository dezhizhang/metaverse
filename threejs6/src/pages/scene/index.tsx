/*
 * :file description:
 * :name: /threejs6/src/pages/scene/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:33:33
 * :last editor: 张德志
 * :date last edited: 2023-04-06 04:30:29
 */
import React, { useRef, useEffect } from 'react';
import styles from './index.less';
import TEngine from './TEngine';
import { lightsList } from './TLights';
import {helperList} from './THelper';
import { basicObjectList } from './TBasicObject';
import { codeModelList } from './TCodeModel';
import { framePromise } from './TLoadModel';

const Scene: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    const TE = new TEngine(ref.current as any);
    // TE.addObject(...basicObjectList);
    TE.addObject(...lightsList);
    TE.addObject(...helperList);
    TE.addObject(...codeModelList);

    framePromise.then(group => {
      group.position.y = 45;
      group.position.z = -1;
      group.rotation.y = Math.PI / 180 * -90;
      group.scale.set(2,2,2)
      TE.addObject(group);
    })

  }, []);

  return <div ref={ref} className={styles.container} />;
};

export default Scene;

/*
 * :file description:
 * :name: /threejs6/src/pages/scene/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:33:33
 * :last editor: 张德志
 * :date last edited: 2023-04-02 20:00:07
 */
import React, { useRef, useEffect } from 'react';
import styles from './index.less';
import TEngine from './TEngine';
import TCanvasTextureEditor from './TCanvasTextureEditor';
import { basicObjectList } from './TBasicObject';

const Scene: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    const TE = new TEngine(ref.current as any);
    TE.addObject(...basicObjectList);

    const testCanvas = new TCanvasTextureEditor();
    testCanvas.draw((ctx) => {
      ctx.beginPath();
      ctx.rect(10, 10, 200, 200);

      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.closePath();
    }).preview();
  }, []);

  return <div ref={ref} className={styles.container} />;
};

export default Scene;

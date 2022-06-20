import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { globalImageWidthAtom, settingsAtom } from '../recoil';

export default function useZoom(): [
  React.RefObject<HTMLImageElement>,
  React.CSSProperties['width'],
  React.Dispatch<React.SetStateAction<number>>,
] {
  const settings = useRecoilValue(settingsAtom);
  const [widthMultiplier, setWidthMultiplier] = useState<number>(0);
  const globalImageWidth = useRecoilValue(globalImageWidthAtom);
  const [width, setWidth] = useState<React.CSSProperties['width']>(undefined);
  const [originalWidth, setOriginalWidth] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);

  const discoverWidth = () => {
    let multi = widthMultiplier;
    if (multi > settings.widthScale) multi = settings.widthScale;
    if (multi < -settings.widthScale + 1) multi = -settings.widthScale + 1;
    return 1 + multi * 0.2;
  };
  useEffect(() => {
    setWidthMultiplier(globalImageWidth);
  }, [globalImageWidth]);

  useEffect(() => {
    if (widthMultiplier === 0) {
      setWidth(undefined);
      setOriginalWidth(undefined);
    } else if (imgRef?.current?.naturalWidth) {
      if (originalWidth === undefined) {
        setOriginalWidth(imgRef.current.naturalWidth);
        setWidth(imgRef.current.naturalWidth * discoverWidth());
      } else {
        setWidth(originalWidth * discoverWidth());
      }
    }
  }, [widthMultiplier]);
  return [imgRef, width, setWidthMultiplier];
}

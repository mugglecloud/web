import React, { useRef, useMemo, useLayoutEffect } from "react";

const loadImage = src => {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = function() {
      resolve(img);
    };
    img.onerror = reject;
  });
};

const Canvas = ({ src, ...props }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const ctx = ref.current.getContext("2d");
    let aborted = false;

    loadImage(src).then(img => {
      if (aborted) return;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    });

    return () => {
      aborted = true;
    };
  }, [src]);

  return <canvas width="1280" height="720" {...props} ref={ref}></canvas>;
};

export default React.memo(Canvas);

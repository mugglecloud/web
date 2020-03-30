import React from "react";
import anime from "animejs";

export const updateFrame = (animation, duration) => {
  const endTimestamp = performance.now() + duration;
  const loop = t => {
    if (t > endTimestamp || animation.stopped) return;
    animation.tick(t);
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};

const AnimationFrame = ({ params = {}, deps = [] }, ref) => {
  let [prev, setPrev] = React.useState(null);
  const current = ref && ref.current;
  React.useEffect(() => {
    if (!current) return;

    if (!params.targets) {
      params.targets = current.children;
    }

    if (prev) prev.stopped = true;
    params.autoplay = false;
    const ani = anime(params);

    updateFrame(ani, params.duration || 1000);
    setPrev(ani);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, params, ...deps]);

  return null;
};

export default React.forwardRef(AnimationFrame);

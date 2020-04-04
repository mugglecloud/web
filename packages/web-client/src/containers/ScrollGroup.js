import React, { useState } from "react";
import { useOvermind } from "@mugglecloud/web-runtime";
import ScrollGroup, { ScrollProvider } from "components/ScrollGroup";

export { useScroll } from "components/ScrollGroup";

export default React.forwardRef(
  ({ children, size, onScroll, onThreshold, ...rest }, ref) => {
    const { actions, state } = useOvermind();
    const step = 100 / size;

    let value = state.header.current ? state.header.current.value : 0;
    const [count, setCount] = useState(Math.round(value / step));

    const handleScroll = e => {
      setCount(e);
      actions.header.setValue(e * step);

      onScroll && onScroll(e);
    };

    const handleThreshold = direction => {
      actions.header.next(direction);
      onThreshold && onThreshold(direction);
    };
    return (
      <ScrollGroup
        {...rest}
        size={size}
        value={count}
        onScroll={handleScroll}
        onThreshold={handleThreshold}
        ref={ref}
      >
        <ScrollProvider value={count}>{children}</ScrollProvider>
      </ScrollGroup>
    );
  }
);

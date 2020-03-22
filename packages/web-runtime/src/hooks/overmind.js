/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createHook } from "overmind-react";
import store from "runtime/store";
import { useContext } from "react";
import { getScopeId } from "runtime/base/utils";

export { Provider as OvermindProvider } from "overmind-react";

export const StoreScope = React.createContext("");
export const ScopeContext = new Map();

export const useOvermind = createHook();

const useForceRerender = () => {
  const [flushId, setState] = React.useState(() => -1);
  // We use memo here, instead of ref, to support fast-refresh
  const mountedRef = React.useMemo(() => ({ current: true }), []);

  React.useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  const forceRerender = (_, __, flushId) => {
    if (mountedRef.current) {
      setState(flushId);
    }
  };
  return {
    forceRerender,
    flushId
  };
};

export const useStore = () => {
  const name = useContext(StoreScope);
  const tree = React.useMemo(
    () => store.proxyStateTree.getTrackStateTree(),
    []
  );

  const { forceRerender } = useForceRerender();

  React.useEffect(
    () => () => {
      store.proxyStateTree.disposeTree(tree);
    },
    []
  );

  React.useLayoutEffect(() => tree.stopTracking());

  tree.track(forceRerender);

  return {
    state: tree.state[name],
    actions: store.actions[name]
  };
};

export const bindScope = context => {
  const name = ScopeContext.get(getScopeId(context));
  return {
    state: context.state[name],
    actions: context.actions[name],
    effects: context.effects[name]
  };
};

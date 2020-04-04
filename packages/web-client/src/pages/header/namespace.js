import { bindScope } from "@mugglecloud/web-runtime";

const getScope = instance => {
  const {
    state: { scope }
  } = bindScope(instance);
  return { state: instance.state[scope], actions: instance.actions[scope] };
};

export const state = {
  active: (state, root) => (state.scope ? root[state.scope].active : 0),
  navs: (state, root) => (state.scope ? root[state.scope].navs : []),
  show: (state, root) => (state.scope ? root[state.scope].show : false),

  scope: "",
  current(state) {
    return state.navs[state.active];
  },
  direction: "up",
  isNavigating: false
};

export const actions = {
  setActive(ctx, active) {
    const { state } = bindScope(ctx);
    const prev = ctx.state[state.scope].active;
    ctx.state[state.scope].active = active;
    state.direction = prev < active ? "up" : "down";
  },
  setShow(ctx, isShow) {
    const { state } = getScope(ctx);
    state.show = isShow;
  },
  setValue(ctx, value) {
    const { state } = bindScope(ctx);
    state.current.value = value;
  },
  setScope(ctx, s) {
    const { state } = bindScope(ctx);
    state.scope = s;
  },
  next(ctx, dir) {
    const { actions, state } = bindScope(ctx);
    let active = ctx.state[state.scope].active + (dir > 0 ? 1 : -1);
    if (active > state.navs.length) return;

    if (active >= 0) {
      actions.setNavigating();
      actions.setActive(active);
    }
  },
  setNavigating(ctx) {
    const { state } = bindScope(ctx);
    state.isNavigating = true;
  },
  clearNavigating(ctx) {
    const { state } = bindScope(ctx);
    state.isNavigating = false;
  }
};

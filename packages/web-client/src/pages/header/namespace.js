import { bindScope } from "@mugglecloud/web-runtime/lib/hooks/overmind";

export const state = {
  active: 0,
  navs: [
    { text: "introduction", name: "intro", value: 0 },
    { text: "the technology", name: "tech", value: 100 },
    { text: "tech spotlight", name: "spotlight", value: 0 },
    { text: "why music?", name: "music", value: 100 }
  ]
};

export const actions = {
  setActive(ctx, active) {
    const { state } = bindScope(ctx);
    state.active = active;
  }
};
